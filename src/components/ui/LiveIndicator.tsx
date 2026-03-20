"use client";

import { motion } from "framer-motion";

export default function LiveIndicator({ text = "AO VIVO" }: { text?: string }) {
    return (
        <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full w-fit">
            <motion.div
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-2.5 h-2.5 bg-red-500 rounded-full"
            />
            <span className="text-xs font-semibold tracking-widest text-white uppercase font-display">
                {text}
            </span>
        </div>
    );
}
