import type { TaktVisualisationNode } from './takt-visualisation-node';

export type TaktVisualisationValue = {
  andon: boolean;
  cheState?: 'error' | 'warning' | 'success' | 'info';
  nodes: {
    [key in 'under' | 'pull' | 'standBy']?: TaktVisualisationNode;
  };
};
