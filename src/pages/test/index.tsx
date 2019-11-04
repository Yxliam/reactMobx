import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button } from "antd";
import defalut from "@/assets/images/default-user.png";
import "./index.scss";

const initialState = { clickCount: 0 };
type State = Readonly<typeof initialState>;
type Props = {
  count: number;
  loginFlag: boolean;
};

@inject(({ globalStore }) => ({
  loginFlag: globalStore.loginFlag
}))
@observer
class Test extends Component<Props, State> {
  state: State = initialState;
  handleClick = () => {
    const { clickCount } = this.state;
    this.setState((preState: State) => ({
      clickCount: clickCount + 1
    }));
  };
  render() {
    const { loginFlag } = this.props;
    const { clickCount } = this.state;
    return (
      <div>
        <div>{clickCount}</div>
        <Button type="primary" onClick={this.handleClick}>
          按钮
        </Button>
        <img className="img" src={defalut} />
      </div>
    );
  }
}

export default Test;
