import React, { createContext } from "react";

export interface ParagraphContextInterface {
  paragraphCount: number;
  outputFormat: boolean;
  output: string;

  setParagraphCount: (paragraphCount: number) => void;
  setOutputFormat: (outputFormat: boolean) => void;
  setOutput: (output: string) => void;
}

export const ParagraphContext = createContext<ParagraphContextInterface>({
  paragraphCount: 0,
  outputFormat: true,
  output: "",

  setParagraphCount: () => {},
  setOutputFormat: () => {},
  setOutput: () => {},
});

export class ParagraphProvider extends React.Component<{
  children: React.ReactNode;
}> {
  state = {
    paragraphCount: 0,
    outputFormat: true,
    output: "",
  };

  setParagraphCount = (paragraphCount: number): void => {
    this.setState({ paragraphCount });
  };

  setOutputFormat = (outputFormat: boolean): void => {
    this.setState({ outputFormat });
  };

  setOutput = (output: string): void => {
    this.setState({ output });
  };

  render(): JSX.Element {
    const { paragraphCount, outputFormat, output } = this.state;
    const { setParagraphCount, setOutputFormat, setOutput } = this;
    return (
      <ParagraphContext.Provider
        value={{
          paragraphCount,
          outputFormat,
          output,
          setParagraphCount,
          setOutputFormat,
          setOutput,
        }}
      >
        {this.props.children}
      </ParagraphContext.Provider>
    );
  }
}
export default ParagraphContext;
