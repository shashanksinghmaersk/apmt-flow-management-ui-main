import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

export type CreateCombinedHtmlProps = {
  reportDirectoryName: string;
  sourceDirectory: string;
};

export async function createCombinedHtml({
  reportDirectoryName,
  sourceDirectory,
}: CreateCombinedHtmlProps) {
  let masterCopyPath: string | null = null;

  // Normalize the source directory path
  const normalizedSourceDirectory = path.resolve(sourceDirectory);

  async function traverseDirectory(currentPath: string) {
    const files = await fs.promises.readdir(currentPath);
    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        if (file === reportDirectoryName) {
          if (!masterCopyPath) {
            masterCopyPath = path.join(normalizedSourceDirectory, reportDirectoryName);
            await copyDirectory(filePath, masterCopyPath);
          } else {
            await copySubFolders(filePath, masterCopyPath);
            await mergeIndexHtml(filePath, masterCopyPath);
          }
        } else {
          await traverseDirectory(filePath);
        }
      }
    }
  }

  async function copyDirectory(src: string, dest: string) {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      const stat = await fs.promises.stat(srcPath);
      if (stat.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  }

  async function copySubFolders(src: string, dest: string) {
    const entries = await fs.promises.readdir(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      const stat = await fs.promises.stat(srcPath);
      if (stat.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      }
    }
  }

  async function mergeIndexHtml(src: string, dest: string) {
    const srcIndexPath = path.join(src, 'index.html');
    const destIndexPath = path.join(dest, 'index.html');

    const srcContent = await fs.promises.readFile(srcIndexPath, 'utf-8');
    const destContent = await fs.promises.readFile(destIndexPath, 'utf-8');

    const $src = cheerio.load(srcContent);
    const $dest = cheerio.load(destContent);

    const srcRows = $src('table.coverage-summary > tbody > tr').toArray();

    srcRows.forEach((srcRow) => {
      const $srcRow = $src(srcRow);
      const srcRowHtml = $srcRow.html();
      const isDuplicate =
        $dest('table.coverage-summary > tbody > tr').filter((_, destRow) => {
          return $dest(destRow).html() === srcRowHtml;
        }).length > 0;

      if (!isDuplicate) {
        $dest('table.coverage-summary > tbody').append($srcRow);
      }
    });

    await fs.promises.writeFile(destIndexPath, $dest.html(), 'utf-8');
  }

  await traverseDirectory(normalizedSourceDirectory);
}
