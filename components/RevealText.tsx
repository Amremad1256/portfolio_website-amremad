"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealTextProps = {
  text: string;
  className?: string;
};

export default function RevealText({ text, className }: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  // With reduced motion the words still fade in, but nothing travels.
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
  };

  const word = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.p>
  );
}
