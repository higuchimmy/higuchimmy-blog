import { FC } from "react";
import Baby from "./svg/baby.svg";
import Computer from "./svg/computer.svg";
import Calendar from "./svg/calendar.svg";

const icons = {
  parenting: <Baby />,
  tech: <Computer />,
  calendar: <Calendar />,
} as const;

export type IconName = keyof typeof icons;

export const Icon: FC<{ name: IconName; size?: "sm" | "md" }> = ({
  name,
  size = "md",
}) => {
  const className = size === "sm" ? "w-4 h-4" : "w-6 h-6";
  return <div className={className}>{icons[name]}</div>;
};
