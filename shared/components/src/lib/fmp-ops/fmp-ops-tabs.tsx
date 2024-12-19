import { McTabBar, McTab } from '@maersk-global/mds-react-wrapper';
import { FmpOpsPinning } from './fmp-ops-pinning/fmp-ops-pinning';

export function FmpOpsTabs() {
  return (
    <McTabBar>
      <McTab slot="tab" label="Yard CHE CT"></McTab>
      <div slot="panel">Yard CHE CT info page</div>
      <McTab slot="tab" label="Pinning/unpinning CT"></McTab>
      <div slot="panel">
        <FmpOpsPinning />
      </div>
      <McTab slot="tab" label="QC TAKT Buffer"></McTab>
      <div slot="panel"> QC TAKT Buffer info page</div>
      <McTab slot="tab" label="Other Configuration"></McTab>
      <div slot="panel"> Other Configuration page</div>
    </McTabBar>
  );
}
