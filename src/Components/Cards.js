import React, { Component } from "react";
import { Card, Col, Row, Progress } from "antd";
import "antd/dist/antd.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export default class Cards extends Component {
  render() {
    const { title, items, color } = this.props;
    return (
      <Card
        type="inner"
        title={title}
        bodyStyle={{ height: "80%" }}
        className="card-res"
      >
        <Row gutter={[16, 24]} className="row">
          {items.map((names, index) => {
            return (
              <Col
                className="gutter-row"
                style={{ height: "30%", padding: "0px" }}
                span={8}
                key={`card-header-${index}`}
              >
                <div className="col-name">{names.name.toLowerCase()}</div>
              </Col>
            );
          })}

          {items.map((values, index) => {
            return (
              <Col className="gutter-row" span={8} key={`card-body-${index}`}>
                {values.margin ? (
                  <div className="progress-bar">
                    {color === "red" ? (
                      <Progress
                        width={60}
                        className="progress-green"
                        strokeColor={{ "100%": " #00a01d" }}
                        type="circle"
                        percent={values.margin}
                      ></Progress>
                    ) : (
                      <Progress
                        width={60}
                        className="progress-red"
                        strokeColor={{ "100%": "#e20000" }}
                        type="circle"
                        percent={values.margin}
                      ></Progress>
                    )}
                  </div>
                ) : (
                  <>
                    {index === 0 ? (
                      <div className="arrow">
                        <div className="lines">
                          {values.fluctuation}%
                          <ArrowUpOutlined style={{ marginLeft: "6px" }} />
                        </div>
                      </div>
                    ) : (
                      <div className="arrow" style={{ color: "#e20000" }}>
                        <div className="lines">
                          {values.fluctuation}%
                          <ArrowDownOutlined style={{ marginLeft: "6px" }} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Col>
            );
          })}
        </Row>
      </Card>
    );
  }
}
