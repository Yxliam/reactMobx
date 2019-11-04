import { observable, action } from "mobx";

class GlobalStore {
  @observable loginFlag = true;
  @observable token = "000token000";
  @observable account = {
    userName: "none",
    age: 0,
    sex: ""
  };
  @observable hasCloseSider = true; // 展开/收缩 侧边栏

  @action login = obj => {
    this.account = obj || {};
    this.loginFlag = true;
  };
  @action loginOut = () => {
    this.loginFlag = false;
  };
  @action toggleSider = () => {
    this.hasCloseSider = !this.hasCloseSider;
  };
}

export default new GlobalStore();
