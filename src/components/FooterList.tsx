import React from "react";
import cn from "classnames";

interface FooterListProps {
  title: string;
  items: string[];
  className?: string;
}

export default function FooterList({
  title,
  items,
  className,
}: FooterListProps) {
  return (
    <div className={cn(className)}>
      <h4 className="font-mono tracking-wide text-md font-bold text-grey-600 mb-2">
        {title}
      </h4>
      <ul className="tracking-wide text-xs list-disc space-y-0 list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
