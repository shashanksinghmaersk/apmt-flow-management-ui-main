export type CreateKeyFramesProps = {
  name: string;
  from: string;
  to: string;
};

export const createKeyframes = ({ name, from, to }: CreateKeyFramesProps) => `
  @keyframes ${name} {
    0% { transform: translateX(${from}); }
    100% { transform: translateX(${to}); }
  }
`;
