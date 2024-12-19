export type TaktVisualisationNodeCheDetails = {
  cheId?: string;
  andon?: boolean;
  cheState?: 'error' | 'warning' | 'success' | 'info';
};

export type TaktVisualisationNode = {
  nodeName?: string;
  cheKind?: 'TT' | 'QC' | 'RTG' | 'EH';
  cheState?: 'error' | 'warning' | 'success' | 'info'; // color coding
  andon?: boolean; // Gives triangle and red color
  cheDetails?: TaktVisualisationNodeCheDetails[];
  cheCargoType?: 'LADEN' | 'UNLADEN';
  cheTaktDelay?: number; // Is che in this node delayed in relation to TAKT
};
