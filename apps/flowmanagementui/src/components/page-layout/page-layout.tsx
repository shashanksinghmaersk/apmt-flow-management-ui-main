import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

type PageLayoutProps = {
  children?: ReactNode;
};

const variants = {
  initial: { opacity: 0, x: -100 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.375 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.375 } },
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { asPath } = useRouter();
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setDisplayChildren(children);
  }, [asPath, children]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="page-layout"
        key={asPath}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
  );
};
