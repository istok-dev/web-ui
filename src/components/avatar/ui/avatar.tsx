import React from "react";

import { cn } from "@/utils/cn";

import { AvatarProps, AvatarSize, AvatarShape } from "../avatar.types";

const getInitials = (name?: string): string => {
  if (!name) return "?";

  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

const sizeClassesMap: Record<AvatarSize, string> = {
  s: "istok-avatar--s",
  m: "istok-avatar--m",
  l: "istok-avatar--l",
};

const shapeClassesMap: Record<AvatarShape, string> = {
  circle: "istok-avatar--circle",
  square: "istok-avatar--square",
};

const baseClasses =
  "istok-avatar object-cover flex items-center justify-center font-medium " +
  "size-[var(--istok-avatar-size)] rounded-[var(--istok-avatar-radius)] " +
  "bg-brand-200 text-brand-800 " +
  "text-(length:--istok-avatar-font-size) leading-[var(--istok-avatar-line-height)]";

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  className,
  shape = "circle",
  defaultSize = "m",
}) => {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        className={cn(
          baseClasses,
          sizeClassesMap[defaultSize],
          shapeClassesMap[shape],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        sizeClassesMap[defaultSize],
        shapeClassesMap[shape],
        className
      )}
    >
      {initials}
    </div>
  );
};
