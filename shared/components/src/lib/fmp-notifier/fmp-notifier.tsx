import { AnimatePresence } from 'framer-motion';

import type { ReactNode } from 'react';

import './fmp-notifier.scss';

type FmpNotifierProps = {
  Notifications?: ReactNode;
};

export const FmpNotifier = ({ Notifications }: FmpNotifierProps) => {
  return (
    <div className="fmp-notifier">
      <AnimatePresence>{Notifications}</AnimatePresence>
    </div>
  );
};
