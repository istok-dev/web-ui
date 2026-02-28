"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

import { SkeletonProps } from "../skeleton.types";

export const Skeleton: React.FC<SkeletonProps> = ({ className, width, height, variant = "rectangular", lines = 1 }) => {
  const baseClasses = "animate-pulse bg-[#E5E0D8]";

  const variantClasses = {
    rectangular: "rounded",
    circular: "rounded-full",
    text: "rounded",
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={twMerge("flex flex-col gap-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={twMerge(baseClasses, variantClasses[variant], index === lines - 1 && "w-3/4")}
            style={{
              height: height || "1rem",
              width: index === lines - 1 ? undefined : width || "100%",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={twMerge(baseClasses, variantClasses[variant], className)}
      style={{
        width: width || "100%",
        height: height || "1rem",
      }}
    />
  );
};
