import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, Component } from "react";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { Skeleton } from "@mui/material";
import ParagraphContext from "../context/context";

export default class Input extends Component<{}> {
  static contextType = ParagraphContext;
  context!: React.ContextType<typeof ParagraphContext>;

  constructor(props: {}) {
    super(props);

    this.onParagraphCountChange = this.onParagraphCountChange.bind(this);
    this.onFormatSwitchChange = this.onFormatSwitchChange.bind(this);
  }

  async callTextGeneratorAPI(): Promise<AxiosResponse<any, any>> {
    return await axios.get(
      "https://baconipsum.com/api/?" +
        "type=all-meat&" +
        `paras=${this.context.paragraphCount}` +
        "&start-with-lorem=1" +
        `&format=${this.context.outputFormat ? "html" : "text"}`
    );
  }

  onParagraphCountChange(e: ChangeEvent<HTMLInputElement>): void {
    const paragraphCount = parseInt(e.target.value);
    this.context.setParagraphCount(paragraphCount);

    this.updateOuputArea();
  }

  showError(error: Error): void {
    this.context.setOutput(`Error: ${error.message}`);
  }

  updateOuputArea(): void {
    this.callTextGeneratorAPI()
      .then((response) => {
        this.context.setOutput(response.data);
      })
      .catch((error) => {
        this.showError(error as Error);
      });
  }

  async onFormatSwitchChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    await this.context.setOutputFormat(e.target.checked);
    this.updateOuputArea();
  }

  render(): JSX.Element {
    return (
      <div className="container text-white">
        <div className="row mb-5">
          <h1 className="mt-5">
            {" "}
            <AlignHorizontalLeftIcon
              className="text-white"
              style={{ fontSize: 50 }}
            />{" "}
            REACT SIMPLE TEXT GENERATOR
          </h1>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3 mb-3">
            <label htmlFor="paragraph">Enter paragraph count:</label>
            <input
              id="paragraph"
              type="number"
              min={0}
              className="form-control w-50"
              value={this.context.paragraphCount}
              onChange={this.onParagraphCountChange}
            />
          </div>{" "}
          <div className="col-sm-2 mt-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={this.context.outputFormat}
                onChange={this.onFormatSwitchChange}
              />
              <label
                className={
                  this.context.outputFormat
                    ? "text-success form-check-label"
                    : "text-danger form-check-label"
                }
                htmlFor="flexRadioDefault2"
              >
                HTML
              </label>
            </div>
          </div>
          <hr />
          <div className="row mt-5">
            <div
              className="col-sm-8 mx-auto bg-dark"
              style={{ borderRadius: "10px" }}
            >
              {this.context.output !== "" ? (
                <p>{this.context.output}</p>
              ) : (
                <div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                    (item) => (
                      <Skeleton key={item} animation="wave" variant="text" />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
