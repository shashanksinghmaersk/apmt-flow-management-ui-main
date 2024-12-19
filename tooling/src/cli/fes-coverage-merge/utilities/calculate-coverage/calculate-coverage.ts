import fs from 'fs';

export async function calculateCoverage(lcovFilePath: string) {
  const data = await fs.promises.readFile(lcovFilePath, 'utf-8');
  const lines = data.split('\n');

  let totalLines = 0;
  let coveredLines = 0;
  let totalBranches = 0;
  let coveredBranches = 0;
  let totalFunctions = 0;
  let coveredFunctions = 0;

  for (const line of lines) {
    if (line.startsWith('LF:')) {
      totalLines += parseInt(line.split(':')[1], 10);
    } else if (line.startsWith('LH:')) {
      coveredLines += parseInt(line.split(':')[1], 10);
    } else if (line.startsWith('BRF:')) {
      totalBranches += parseInt(line.split(':')[1], 10);
    } else if (line.startsWith('BRH:')) {
      coveredBranches += parseInt(line.split(':')[1], 10);
    } else if (line.startsWith('FNF:')) {
      totalFunctions += parseInt(line.split(':')[1], 10);
    } else if (line.startsWith('FNH:')) {
      coveredFunctions += parseInt(line.split(':')[1], 10);
    }
  }

  const totalLineCoverage = totalLines > 0 ? (coveredLines / totalLines) * 100 : 0;
  const totalBranchCoverage = totalBranches > 0 ? (coveredBranches / totalBranches) * 100 : 0;
  const totalFunctionsCoverage = totalFunctions > 0 ? (coveredFunctions / totalFunctions) * 100 : 0;

  return {
    totalLineCoverage,
    totalBranchCoverage,
    totalFunctionsCoverage,
  };
}
