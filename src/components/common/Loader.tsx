"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedLoaderProps {
  size?: number;
  color?: string;
  speed?: number;
}

export const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 40,
  color = "#3498db",
  speed = 0.7,
}) => {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const dotStyle: React.CSSProperties = {
    width: size / 5,
    height: size / 5,
    backgroundColor: color,
    borderRadius: "50%",
    margin: size / 15,
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: speed / 3,
      },
    },
    end: {
      transition: {
        staggerChildren: speed / 3,
      },
    },
  };

  const dotVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: speed,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  return (
    <motion.div
      style={containerStyle}
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[...Array(3)].map((_, index) => (
        <motion.span
          key={index}
          style={dotStyle}
          variants={dotVariants}
          transition={dotTransition}
        />
      ))}
    </motion.div>
  );
};
