type MillisecondsToReadableProps = {
  milliseconds: number;
  separator?: string;
  digits?: 0 | 1 | 2 | 3;
};

export const millisecondsToReadable = (
  options: MillisecondsToReadableProps,
) => {
  const { milliseconds, separator = ':', digits = 0 } = options;

  if (milliseconds === 0) {
    return `00${separator}00` + (digits > 0 ? `.${'0'.repeat(digits)}` : '');
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const millisecondsRemainder = milliseconds % 1000;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += hours.toString().padStart(2, '0') + separator;
  }

  formattedTime += minutes.toString().padStart(2, '0') + separator;

  if (digits > 0) {
    const fractionalSeconds = millisecondsRemainder
      .toString()
      .padStart(3, '0')
      .substring(0, digits);
    formattedTime += `${seconds.toString().padStart(2, '0')}.${fractionalSeconds.padEnd(digits, '0')}`;
  } else {
    formattedTime += seconds.toString().padStart(2, '0');
  }

  return formattedTime;
};
