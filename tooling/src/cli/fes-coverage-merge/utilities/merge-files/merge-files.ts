import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Glob } from 'glob';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

interface MergeFilesOptions {
  targetDir: string;
  fileName: string;
  outputDir: string;
}

export async function mergeFiles(options: MergeFilesOptions) {
  let mergeFilesHasError = false;
  let mergeFilesError = '';

  const { targetDir, fileName, outputDir } = options;

  // Normalize paths
  const normalizedTargetDir = path.normalize(targetDir);
  const normalizedOutputDir = path.normalize(outputDir);

  // Find all files matching the given fileName pattern
  const pattern = `${normalizedTargetDir}/**/${fileName}`;

  const files = [...new Glob(pattern, {})];

  if (files.length === 0) {
    mergeFilesHasError = true;
    mergeFilesError = `No files found with the name: ${fileName}`;
  }

  // Read all found files and concatenate their content
  let mergedContent = '';
  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    mergedContent += content + '\n'; // Adding newline between files
  }

  // Ensure output directory exists
  if (!fs.existsSync(normalizedOutputDir)) {
    fs.mkdirSync(normalizedOutputDir, { recursive: true });
  }

  // Write the merged content to the output file
  const outputFilePath = path.join(normalizedOutputDir, fileName);
  await writeFile(outputFilePath, mergedContent, 'utf-8');

  return { mergeFilesHasError, mergeFilesError };
}
