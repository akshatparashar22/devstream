"use client";
import { useRef, useEffect, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
    date: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref, data]);

    return (
        <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10">
            <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
                <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
                    Professional Journey
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm mb-10">
                    A chronological overview of your career milestones and achievements.
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-10 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center timeline-dot">
                                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl lg:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                                {item.title}
                            </h3>
                            <div className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm lg:text-base">
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Animated timeline line */}
                <div
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-700 to-transparent"
                    style={{ height: height + "px" }}
                >
                    <div className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent h-full animate-timeline-fill" />
                </div>
            </div>
        </div>
    );
};