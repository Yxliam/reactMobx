/**
 *  @Title   地区级联选择器
 *  @Auther  wugengsong
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component } from "react";
import { Cascader, Input } from "antd";
import { getProvince, getCity, getArea } from '@/components/regionPicker/apiRegion';

class RegionCascader extends Component {
  state = {
    region: []
  };

  componentDidMount() {
    Promise.all([getProvince(), getCity(), getArea()]).then(res => {
      const [provinceList, cityList, areaList] = res
      
      areaList.forEach(item => {
        const father = cityList.find(f => f.value === Number(item.father))
        if (father) {
          father.children.push(item)
        }

        // 无 children, 删除 children 属性
        delete item.children
      })

      cityList.forEach(item => {
        const father = provinceList.find(f => f.value === Number(item.father))
        if (father) {
          father.children.push(item)
        }

        // 无 children, 删除 children 属性
        if (!item.children.length) {
          delete item.children
        }
      })

      this.setState({
        region: provinceList
      })
    })
  }

  regionChange = (value, selectedOptions) => {
    this.props.onChange && this.props.onChange(value, selectedOptions);
  };

  render() {
    const { value } = this.props;
    const { region } = this.state;
    const hasValueProp = value !== undefined ? { value } : null
    
    return (
      <Cascader
        {...hasValueProp}
        options={region}
        onChange={this.regionChange}
        changeOnSelect
        placeholder="请选择地区"
        style={{ width: "100%" }}
      />
    );
  }
}

export default RegionCascader;
