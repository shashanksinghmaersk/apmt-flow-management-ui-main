import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export const readFileLines = async (
  sourcePath: string,
  lineByLineCallBack: (values: { lineNumber: number; lineText: string }) => void,
) => {
  const fileStream = createReadStream(sourcePath);
  let lineNumber = 1;

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const lineText of rl) {
    lineNumber++;

    lineByLineCallBack({ lineNumber, lineText });
  }
};
