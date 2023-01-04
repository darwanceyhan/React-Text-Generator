import React, { Component } from "react";
import Input from "./components/Input";
import { ParagraphProvider } from "./context/context";
export default class App extends Component<{}> {
  render() {
    return (
      <ParagraphProvider>
        <Input />
      </ParagraphProvider>
    );
  }
}
