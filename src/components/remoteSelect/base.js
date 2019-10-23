/**
 *  @Title   远程搜索选择框
 *  @Auther  wugengsong
 *  @Des     可分页/关键词搜索查询
 *  @Time    2019
 */
import React, { Component } from "react";
import { Button, Input, Icon } from "antd";

export class BaseSelct extends Component {
  state = {
    hasMore: true,
    visible: false,
    clearIconVisible: false
  };

  containerRef = null;

  componentDidMount() {
    document.addEventListener("click", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeMenu);
  }

  closeMenu = e => {
    const container = this.containerRef;
    if (!container.contains(e.target)) {
      this.setState({
        visible: false
      });
    }
  };

  /**
   * 搜索
   */
  handleSubmit = value => {
    this.props.onSearch && this.props.onSearch(value);
  };

  /**
   * 加载更多
   */
  getMore = () => {
    this.props.onGetMore && this.props.onGetMore();
  };

  toggleMenu = e => {
    e && e.stopPropagation();
    this.setState(
      state => ({
        visible: !state.visible
      }),
      () => {
        const { options, hasMore } = this.props;
        if (this.state.visible && !options.length && hasMore) {
          this.getMore();
        }
      }
    );
  };

  handleMouseEnter = () => {
    const { value } = this.props;
    if (value) {
      this.setState({
        clearIconVisible: true
      });
    }
  };

  handleMouseLeave = () => {
    const { clearIconVisible } = this.state;
    if (clearIconVisible) {
      this.setState({
        clearIconVisible: false
      });
    }
  };

  optionClick = data => {
    this.props.onChange && this.props.onChange(data.value, data);
    this.setState({
      visible: false
    });
  };

  clearSelected = e => {
    e.stopPropagation();
    this.props.onChange && this.props.onChange("", {});
  };

  render() {
    const { value, options = [], placeholder, loading, hasMore } = this.props;
    const { visible, clearIconVisible } = this.state;
    const selected = value
      ? options.find(item => item.value === value) || {}
      : {};

    return (
      <div
        style={{ width: "100%", position: "relative" }}
        ref={ref => (this.containerRef = ref)}
      >
        <div
          className={`ant-select ant-select-enabled ${
            visible ? "ant-select-open" : ""
          }`}
          style={{ width: "100%" }}
          onClick={this.toggleMenu}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div
            className="ant-select-selection ant-select-selection--single"
            tabIndex="0"
          >
            <div className="ant-select-selection__rendered">
              <div className="ant-select-selection-selected-value">
                {value ? (
                  selected.label || value
                ) : (
                  <span style={{ color: "#ccc" }}>{placeholder || "请选择"}</span>
                )}
              </div>
            </div>
            <span className="ant-select-arrow" unselectable="on">
              {!clearIconVisible ? (
                <Icon type="down" className="ant-select-arrow-icon" />
              ) : (
                <Icon
                  type="close-circle"
                  theme="filled"
                  onClick={this.clearSelected}
                />
              )}
            </span>
          </div>
        </div>

        {visible && (
          <div
            className="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft"
            style={{
              top: 40,
              left: 0,
              width: "100%"
            }}
          >
            <div style={{ padding: "4px 16px" }}>
              <Input.Search
                placeholder="请输入关键词搜索"
                onSearch={this.handleSubmit}
              />
            </div>
            <div style={{ overflow: "auto", transform: "translateZ(0px)" }}>
              <ul
                role="listbox"
                className="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical"
                tabIndex="0"
              >
                {options.map(item => (
                  <li
                    key={item.value}
                    className="ant-select-dropdown-menu-item"
                    style={{ userSelect: "none" }}
                    onClick={() => this.optionClick(item)}
                  >
                    {item.label}
                  </li>
                ))}
                {hasMore && (
                  <li
                    className="ant-select-dropdown-menu-item"
                    style={{ userSelect: "none" }}
                  >
                    <Button
                      block
                      type="dashed"
                      size="small"
                      loading={loading}
                      onClick={this.getMore}
                    >
                      加载更多
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default function withRemoteSelect({ getData, pageSize, ...rest }) {
  return class extends Component {
    state = {
      options: [],
      hasMore: true,
      loading: false,
      keyword: "",
      params: {
        pageIndex: 1,
        pageSize: pageSize
      }
    };

    getMore = async () => {
      this.setState({
        loading: true
      });
      const { keyword, params, options } = this.state;
      const { pageSize, pageIndex } = params;
      const res = await getData({
        keyword,
        pageSize,
        pageIndex: options.length === 0 ? 1 : pageIndex + 1
      });

      const { total } = res;

      this.setState({
        options: options.concat(res.options),
        loading: false,
        hasMore: total !== options.length + res.options.length,
        pageIndex: options.length === 0 ? 1 : pageIndex + 1
      });
    };

    search = keyword => {
      this.setState(
        {
          keyword,
          pageIndex: 1,
          options: []
        },
        () => {
          this.getMore();
        }
      );
    };

    render() {
      const { options, hasMore, loading } = this.state;

      return (
        <BaseSelct
          {...this.props}
          loading={loading}
          options={options}
          onSearch={this.search}
          hasMore={hasMore}
          onGetMore={this.getMore}
        />
      );
    }
  };
}
