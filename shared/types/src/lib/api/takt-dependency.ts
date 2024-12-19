export type TaktDependency = {
  cheShortName: string;
  cheAction: 'IN_PROGRESS' | 'PLANNED' | 'DONE';
  taktDelayTime: number;
  cheState: 'success' | 'info' | 'warning' | 'error' | null; // Determines the color coding
  andon: boolean; // Determines if a warning triangle is to be shown
  cheKind: 'TT' | 'QC' | 'RTG' | 'EH'; // Determines the icon used
};
