export type StandbyPinning = {
  qcmId: string;
  quayCraneShortName: string;
  vesselName: string | null;
  standbyPosition: string | null;
  loadPinningPosition: string | null;
  dischargePinningPosition: string | null;
  lane: string | null;
  radioChannel: string | null;
  traffic: string | null;
  craneMode: 'FES' | 'TOS' | 'DPOS' | null;
  createdBy: string | null;
  createdTime: number | null;
};
