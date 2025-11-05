import { motion } from "motion/react";
import { pageTransition, getVariants, getTransition } from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={getVariants(pageTransition)}
      transition={getTransition(pageTransition.visible?.transition || {})}
    >
      {children}
    </motion.div>
  );
};
