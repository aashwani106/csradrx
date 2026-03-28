"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
    delay?: number;
    distance?: number;
    once?: boolean;
};

export default function Reveal({
    children,
    className,
    delay = 0,
    distance = 22,
    once = true,
    ...props
}: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.28, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
