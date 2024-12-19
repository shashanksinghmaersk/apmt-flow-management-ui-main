import { copyFileSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { logger } from '../../../utilities/logger/logger';
import { pathExists } from '../../../utilities/path-exists/path-exists';
import { MAERSK_NPM_ICON_PATH } from '../constants';
import { Options } from '../config';

export const syncAssets = async (iconList: string[], options: Options) => {
  const { distPath, assetsPath, sizes } = options;
  const destPath = path.normalize(`${distPath}/${assetsPath}`);
  const sourcePath = path.normalize(MAERSK_NPM_ICON_PATH);

  let syncAssetsError = false;
  let numberOfSyncedAssets = 0;

  try {
    rmSync(destPath, { recursive: true, force: true });
    mkdirSync(destPath, { recursive: true });
  } catch (err) {
    syncAssetsError = true;
  }

  sizes.forEach((size) => {
    const destSizePath = `${destPath}/${size}px`;
    mkdirSync(destSizePath, { recursive: true });
  });

  for (const index in iconList) {
    const icon = iconList[index];

    for (const sizeIndex in sizes) {
      const size = sizes[sizeIndex];
      const iconPath = path.normalize(`${sourcePath}/${size}px/mi-${icon}.js`);
      const iconDestPath = path.normalize(`${destPath}/${size}px/mi-${icon}.js`);
      const iconExist = pathExists(iconPath);

      if (!iconExist) {
        logger.itemSubWarning(`Missing file ${iconPath}`);
        syncAssetsError = true;
      } else {
        try {
          copyFileSync(iconPath, iconDestPath);
        } catch (err) {
          syncAssetsError = true;
        }
      }
    }

    if (!syncAssetsError) {
      numberOfSyncedAssets = numberOfSyncedAssets + 1 * sizes.length;
    }
  }

  return { syncAssetsError, numberOfSyncedAssets };
};
