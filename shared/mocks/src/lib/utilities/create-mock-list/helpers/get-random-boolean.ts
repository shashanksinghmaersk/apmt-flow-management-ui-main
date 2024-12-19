export const getRandomBoolean = () => {
  const randomBoolean = Math.random() < 0.5;

  console.log(randomBoolean);

  return randomBoolean;
};
