import * as React from "react";
import styled from "styled-components";
import { IChart, ISelectedOrHovered } from "@mrblenny/react-flow-chart";
import { IAirflowNode, AirflowNodeForm } from "../";
import { SidebarTitle, Theme } from "../Theme";
import { FaBars, FaTimes } from "react-icons/fa";

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
  border-radius: 20px;
  border: 1px;
`;

const BurgerSplit = styled.div`
  min-width: 400px;
`;

const BurgerText = styled.div`
  float: left;
`;

const BurgerButton = styled.div`
  color: ${Theme.colors.brand};
  border-radius: 20px;
  float: right;
  transition: 0.3s ease all;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  &:active {
    background: #5682d2;
  }
`;

const Button = styled.div`
  margin: 30px;
  padding: 10px 15px;
  background: ${Theme.colors.brand};
  color: white;
  border-radius: 3px;
  text-align: center;
  transition: 0.3s ease all;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  &:active {
    background: #5682d2;
  }
`;

export class SelectedSidebar extends React.Component<{
  chart: IChart;
  onDeleteKey: Function;
  updateNodeProps: Function;
}> {
  public state = {
    isOpen: true
  };

  public toggleSidebar = () => {
    const open = !this.state.isOpen;
    this.setState({
      isOpen: open
    });
  };

  public renderTitle(title: string) {
    return (
      <SidebarTitle>
        <BurgerSplit>
          <BurgerText>{title}</BurgerText>
          <BurgerButton onClick={() => this.toggleSidebar()}>
            <FaTimes />
          </BurgerButton>
        </BurgerSplit>
      </SidebarTitle>
    );
  }

  public renderContent(selected: ISelectedOrHovered) {
    if (selected.type === "node" || false) {
      const node: IAirflowNode = this.props.chart.nodes[selected.id];
      return (
        <Sidebar>
          {this.renderTitle("Operator Properties")}
          <div>
            <AirflowNodeForm
              node={node}
              updateNodeProps={this.props.updateNodeProps}
            />
            <br />
            <Button onClick={() => this.props.onDeleteKey()}>Delete</Button>
          </div>
        </Sidebar>
      );
    }
    return (
      <div>
        {this.renderTitle("DAG Properties")}
        <div>Click on an Operator Node to modify parameters</div>
      </div>
    );
  }

  public render() {
    return this.state.isOpen ? (
      this.renderContent(this.props.chart.selected)
    ) : (
      <BurgerButton
        onClick={() => this.toggleSidebar()}
        style={{ padding: `7.5px 10px` }}
      >
        <FaBars />
      </BurgerButton>
    );
  }
}