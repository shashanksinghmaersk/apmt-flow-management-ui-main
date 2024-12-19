import chokidar from 'chokidar';

export const watchPaths = (paths: string[], callback: (event: string, stats?: string) => void) => {
  const watcher = chokidar.watch(paths);

  watcher.on('all', (event, stats) => {
    callback(event, stats);
  });

  // Return the watcher so it can be stopped if needed
  return watcher;
};
