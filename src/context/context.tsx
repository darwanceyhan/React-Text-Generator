import React from "react";
import { createContext } from "react";

export type ParagraphContextType = {
  Value: number;
  setValue: (paragraph: number) => void;
  Format: boolean;
  setFormat: (format: boolean) => void;
  Paragraph: string;
  setParagraph: (paragraph: string) => void;
};

export const ParagraphContext = createContext({} as ParagraphContextType);

export const ParagraphProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Value, setValue] = React.useState<number>(0);
  const [Format, setFormat] = React.useState<boolean>(true);
  const [Paragraph, setParagraph] = React.useState<string>("");

  return (
    <ParagraphContext.Provider
      value={{ Value, setValue, Format, setFormat, Paragraph, setParagraph }}
    >
      {children}
    </ParagraphContext.Provider>
  );
};
