import * as React from "react";
import styled from "styled-components";
import { INode, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";

const Outer = styled.div`
  padding: 20px 30px;
  font-size: 14px;
  background: white;
  cursor: move;
  &:hover {
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1) inset;
  }
`;

export interface IAirflowOperatorParameter {
  id: string;
  type: "str" | "bool" | "dict";
  default?: string;
}

export interface IAirflowOperatorProperties {
  name: string;
  parameters: Array<IAirflowOperatorParameter>;
}

export interface IAirflowOperator {
  type: string;
  ports: INode["ports"];
  properties: IAirflowOperatorProperties;
}

export const AirflowOperator = ({
  type,
  ports,
  properties
}: IAirflowOperator) => {
  return (
    <Outer
      draggable={true}
      onDragStart={event => {
        event.dataTransfer.setData(
          REACT_FLOW_CHART,
          JSON.stringify({ type, ports, properties })
        );
      }}
    >
      {properties.name}
    </Outer>
  );
};
