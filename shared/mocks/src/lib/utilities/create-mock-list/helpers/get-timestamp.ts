export const getTimeStamp = () => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const fivMinutes = 300; // 5 minutes in seconds

  const randomSeconds = Math.floor(Math.random() * fivMinutes);
  const timestamp = currentTime - randomSeconds;

  return timestamp;
};
