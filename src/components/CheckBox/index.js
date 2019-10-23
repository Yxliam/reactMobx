/**
 * 多选框联动组件
 */
import React, { Component } from 'react'
import { Checkbox, Row, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './style.scss'

class InkageCheckbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 当前的所有数据
      dataSource: [],
      // 点击选中的类型
      checkList: [],
      // 当前展示的列表
      list: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSource != this.props.dataSource) {
      this.init(nextProps.dataSource)
    }
  }

  componentDidMount () {
    this.init()
  }

  /**
   * 初始化
   */
  init = (data) => {
    let dataSource = data || this.props.dataSource
    let { list } = this.state
    list = [dataSource]

    this.setState({
      list
    })
  }

  /**
   * 选择
   */
  handleCheck = (e, index, index1) => {
    const { list, checkList } = this.state
    const { checked } = e.target

    list[index][index1].checked = checked
    list[index][index1].indeterminate = false

    // 操作父级
    for (let i = index; i > 0; i--) {
      let parentIndex = checkList[i - 1]
      this.handleCheckedParent(list[i], list[i - 1][parentIndex])
    }
    // 操作子集状态
    this.handleCheckedChildren(list[index][index1].children, checked)
    this.setState({
      list
    }, () => {
      this.props.onUpDataList(this.props.dataSource)
    })
  }

  /**
   * 修改父级状态
   */
  handleCheckedParent = (children, parent) => {
    let indeterminate = false,
      checked = false
    const checkedArr = children.filter(item => item.checked)
    const indeterminateArr = children.filter(item => item.checked || item.indeterminate)
    // 说明子集全部被选中
    if (checkedArr.length == children.length) {
      checked = true
    } else if (indeterminateArr.length > 0) {
      indeterminate = true
    }
    parent.checked = checked
    parent.indeterminate = indeterminate
  }

  /**
   * 修改子集的状态
   */
  handleCheckedChildren = (children, checked) => {
    if (!Array.isArray(children)) {
      return false
    }
    children.forEach(item => {
      item.checked = checked
      item.indeterminate = false
      if (Array.isArray(item.children)) {
        this.handleCheckedChildren(item.children, checked)
      }
    })
  }

  /**
   * 点击打开子类
   */
  handleOnClick = async (index, index1) => {
    const { onGetChildren, onUpDataList } = this.props
    let { list, checkList } = this.state
    const children = list[index][index1].children
    if (!children) {
      const res = await onGetChildren(index, list[index][index1])
      if (!res) {
        return false
      }
    }
    const children1 = list[index][index1].children
    const { checked } = list[index][index1]
    if (checked) {
      this.handleCheckedChildren(children1, checked)
    }

    list = list.slice(0, index + 1)
    checkList[index] = index1
    checkList = checkList.slice(0, index + 1)
    list.push(children1)
    this.setState({
      list,
      checkList
    }, () => {
      this.props.onUpDataList(this.props.dataSource)
    })
  }

  render () {
    const { list, checkList } = this.state
    return (
      <div className='inkage-checkbox'>
        {
          list.map((item, index) => {
            return <div className='checkbox-p' key={index}>
              {
                item.map((item1, index1) => {
                  return <div className={`children-checkbox ${checkList[index] == index1 ? 'checkbox-active' : ''}`} key={index1}>
                    <Checkbox key={index1} checked={item1.checked} indeterminate={item1.indeterminate} onChange={(e) => this.handleCheck(e, index, index1)}></Checkbox>
                    <span onClick={() => {
                      this.handleOnClick(index, index1)
                    }}>
                      {item1.label}
                    </span>
                  </div>
                })
              }
            </div>
          })
        }
      </div>
    )
  }
}

export default InkageCheckbox