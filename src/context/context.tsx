import React, { createContext } from 'react'

export interface ParagraphContextInterface {
  paragraphCount: number
  outputFormat: boolean
  output: string

  setParagraphCount: (paragraphCount: number) => void
  setOutputFormat: (format: boolean) => void
  setOutput: (output: string) => void
}

export const ParagraphContext = createContext<ParagraphContextInterface>({
  paragraphCount: 0,
  outputFormat: true,
  output: '',

  setParagraphCount: () => {},
  setOutputFormat: () => {},
  setOutput: () => {}
})

export const ParagraphProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [paragraphCount, setParagraphCount] = React.useState<number>(0)
  const [outputFormat, setOutputFormat] = React.useState<boolean>(true)
  const [Paragraph, setParagraph] = React.useState<string>('')

  return (
    <ParagraphContext.Provider
      value={{
        paragraphCount,
        outputFormat,
        output: Paragraph,

        setParagraphCount,
        setOutputFormat,
        setOutput: setParagraph
      }}
    >
      {children}
    </ParagraphContext.Provider>
  )
}
