export function getRandomTimestamps(count: number): number[] {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const fivMinutes = 300; // 5 minutes in seconds
  const timestamps = [];

  for (let i = 0; i < count; i++) {
    const randomSeconds = Math.floor(Math.random() * fivMinutes);
    timestamps.push(currentTime - randomSeconds);
  }

  return timestamps;
}
