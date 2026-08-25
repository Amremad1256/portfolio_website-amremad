"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const word = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

type RevealTextProps = {
  text: string;
  className?: string;
};

export default function RevealText({ text, className }: RevealTextProps) {
  const words = text.split(" ");

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
