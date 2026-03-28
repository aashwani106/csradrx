"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type FloatProps = HTMLMotionProps<"div"> & {
    amplitude?: number;
    duration?: number;
};

export default function Float({
    children,
    className,
    amplitude = 12,
    duration = 12,
    ...props
}: FloatProps) {
    return (
        <motion.div
            animate={{ y: [0, -amplitude, 0] }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
