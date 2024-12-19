import * as fs from 'fs';
import * as path from 'path';

export type SetAccessTokenProps = {
  accessToken?: string;
  envFiles: string[];
  envVariable: string;
};

export async function setAccessToken({ accessToken, envFiles, envVariable }: SetAccessTokenProps) {
  let setAccessTokenError: string | undefined;
  const filesWrittenTo: string[] = [];

  if (accessToken) {
    const envFileContent = `${envVariable}=${accessToken}\n`;

    for (const envFile of envFiles) {
      // Resolve the env file path relative to the project root
      const envFilePath = path.resolve(process.cwd(), envFile);

      let fileContent = '';

      // Check if the file exists
      if (fs.existsSync(envFilePath)) {
        // Read the current content of the file
        fileContent = fs.readFileSync(envFilePath, 'utf8');

        // Split the content by lines
        const lines = fileContent.split('\n');

        // Check if the line with the access token exists and update it
        const updatedLines = lines.map((line) =>
          line.startsWith(`${envVariable}=`) ? envFileContent.trim() : line,
        );

        // If the access token line was not found, append it
        if (!updatedLines.includes(envFileContent.trim())) {
          updatedLines.push(envFileContent.trim());
        }

        // Join the lines back into a single string
        fileContent = updatedLines.join('\n');
      } else {
        // If the file does not exist, create it with the access token
        fileContent = envFileContent.trim();
      }

      // Write the updated content back to the file
      try {
        fs.writeFileSync(envFilePath, fileContent, 'utf8');
        filesWrittenTo.push(envFilePath);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setAccessTokenError = `Error writing to file ${envFilePath}: ${error.message}`;
        break;
      }
    }
  } else {
    setAccessTokenError = 'Access token not found in the response';
  }

  return { setAccessTokenError, filesWrittenTo };
}
