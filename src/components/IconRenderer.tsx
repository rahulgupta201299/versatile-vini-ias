import React from "react";
import * as Icons from "lucide-react";

export interface IconRendererProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export default function IconRenderer({
  name,
  size = 22,
  color = "currentColor",
}: IconRendererProps) {
  // @ts-expect-error dynamic lucide component access
  const Component = Icons[name] || Icons.BookOpen;
  return <Component size={size} color={color} />;
}
