import React from "react";

export default function TextRenderer(text: React.ReactNode[]): JSX.Element {
  return (
    <>
      {text.map((textItem: any) => {
        if (textItem.href) {
          return (
            <a key={textItem.href} href={textItem.href}>
              {textItem.text.content}
            </a>
          );
        } else if (textItem.annotations.code) {
          return <code key={textItem.text.content}>{textItem.text.content} </code>;
        } else {
          return <>{textItem.text.content}</>;
        }
      })}
    </>
  );
}
