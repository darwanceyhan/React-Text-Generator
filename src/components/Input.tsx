import axios from "axios";
import { Component } from "react";
import { ParagraphContext, ParagraphContextType } from "../context/context";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { Skeleton } from "@mui/material";

export default class Input extends Component<{}> {
  static contextType = ParagraphContext;
  context!: ParagraphContextType;

  getText(): void {
    this.context.setParagraph("");
    axios
      .get(
        `https://baconipsum.com/api/?type=all-meat&paras=${
          this.context.Value
        }&start-with-lorem=1&format=${
          this.context.Format === true ? "html" : "text"
        }`
      )
      .then((res) => {
        this.context.setParagraph(res.data);
      });
  }
  changeText(e: number): void {
    this.context.setValue(e);

    this.getText();
  }
  async ChangeFormat(): Promise<void> {
    await this.context.setFormat(!this.context.Format);
    this.getText();
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
              value={this.context.Value}
              onChange={(e) => this.changeText(Number(e.target.value))}
            />
          </div>{" "}
          <div className="col-sm-2 mt-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={() => this.ChangeFormat()}
                checked={this.context.Format}
              />
              <label
                className={
                  this.context.Format === true
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
            <div className="col-sm-8 mx-auto" style={{ borderRadius: "10px" }}>
              {this.context.Paragraph !== "" ? (
                <p>{this.context.Paragraph}</p>
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
