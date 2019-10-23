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
      list: [],
      checkedList: {}
    }
  }

  componentDidMount () {
    this.init()
  }

  /**
   * 初始化
   */
  init = () => {

  }

  /**
   * 打开子级
   */
  handleOpenChildren = async (data, children, index) => {
    if (!Array.isArray(children.children)) return false

    const { onOpen } = this.props
    const { checkedList } = this.state
    onOpen && await onOpen(children, index)
    checkedList[index] = checkedList[index] ? checkedList[index] : []
    const [current] = checkedList[index].filter(item => item.value == children.value && !item.indeterminate)
    if (current && current.children.length) {
      let list = current.children.map(item => item.value)
      this.handleOnChange(list, current, index + 1)
    }
  }

  /**
   * 父级存储选中的值
   */
  handleOnChange = (list, data, index) => {
    const { checkedList } = this.state
    checkedList[index] = checkedList[index] ? checkedList[index] : []
    // 筛选出indeterminate
    let indeterminateArr = checkedList[index].filter(item => item.indeterminate && item.parent == data.value)
    // 清空当前所在的数据
    checkedList[index] = this.handleClear(checkedList[index], data)
    let newList = data.children.filter(item => {
      return list.findIndex(item1 => item1 == item.value) > -1
    }).map(item => {
      item.indeterminate = false
      return item
    })

    indeterminateArr.forEach(item => {
      const indeterminateIndex = newList.findIndex(item1 => item1.value == item.value)
      if (indeterminateIndex == -1) {
        newList.push(item)
      }
    })
    checkedList[index] = checkedList[index].concat(newList)
    // 寻找对应的子集
    data.children.forEach(item => {
      const isIndex = newList.findIndex(item1 => item1.value == item.value)
      const isAdd = isIndex > -1 ? true : false
      this.handleChildren(checkedList, item.children, index + 1, isAdd)
    })
    // 寻找他对应的父级
    const { dataSource } = this.props
    this.handleParent(dataSource, data.value, index, checkedList)
    this.setState({
      checkedList
    }, () => {
      this.handleDistributeEvent(checkedList)
    })
  }

  /**
   * 派发出去的事件
   */
  handleDistributeEvent = (checkedList) => {
    const { onChecked } = this.props
    const data = Object.assign({}, checkedList)
    onChecked && onChecked(data)
  }

  /**
   * 删除对应的子集
   */
  handleRemove = (data, newData, index, isAdd) => {
    const { checkedList } = this.state
    checkedList[index] = checkedList[index] ? checkedList[index] : []
    let list = isAdd ? data.map(item => item.value) : checkedList[index].filter(item => {
      return data.findIndex(item1 => item1.value == item.value) == -1
    }).map(item => item.value)
    this.handleOnChange(list, newData, index)
  }

  /**
   * 寻找对应的子集
   */
  handleChildren = (checkedList, newList, index, isAdd) => {
    newList.forEach(item => {
      checkedList[index] = checkedList[index] ? checkedList[index] : []
      if (item.children.length) {
        this.handleChildren(checkedList, item.children, index + 1, isAdd)
      }
      const index1 = checkedList[index].findIndex(item1 => item1.value == item.value)
      if (isAdd) {
        index1 == -1 && checkedList[index].push(item)
      } else {
        index1 > -1 && checkedList[index].splice(index1, 1)
      }
    })
  }

  /**
   * 寻找对应的父级
   */
  handleParent = (dataSource, parentValue, index, checkedList) => {
    for (let i = index - 1; i >= 0; i--) {
      let [parent] = dataSource[i].children.filter(item => {
        return item.value == parentValue
      })
      checkedList[i + 1] = checkedList[i + 1] ? checkedList[i + 1] : []
      const children = checkedList[i + 1].filter(item => item.parent == parent.value && !item.indeterminate)
      const childrenOffIn = checkedList[i + 1].filter(item => item.parent == parent.value)
      checkedList[i] = checkedList[i] ? checkedList[i] : []
      checkedList[i] = checkedList[i].filter(item => item.value != parent.value)

      if (childrenOffIn && childrenOffIn.length > 0) {
        parent.indeterminate = childrenOffIn.length > 0 && children.length != parent.children.length ? true : false
        checkedList[i].push(parent)
      }
      parentValue = parent.parent
    }
  }

  /**
   * 清空当前所有值
   */
  handleClear = (checkedList, data) => {
    if (!Array.isArray(checkedList)) return []
    return checkedList.filter(item => {
      return item.parent != data.value
    })
  }

  /**
   * 寻找对应的indeterminate
   */
  handleFindIndeterminate = (checkedList, value, index) => {
    if (!Array.isArray(checkedList[index])) return false
    const [item] = checkedList[index].filter(item => item.value == value)
    return item ? item.indeterminate : false
  }

  render () {
    const { dataSource } = this.props
    const { checkedList } = this.state
    return (
      <div className='inkage-checkbox'>
        {
          dataSource.map((item, index) => {
            let list = checkedList[index] || []
            list = list.filter(item => !item.indeterminate).map(item => item.value)
            return item.children.length ? <Checkbox.Group className='checkbox-p' value={list} key={index} onChange={e => this.handleOnChange(e, item, index)}>
              <Row>
                {
                  item.children.map((item1, index1) => {
                    const indeterminate = this.handleFindIndeterminate(checkedList, item1.value, index)
                    return <div className='child' key={index1}>
                      <Checkbox className='checkbox' value={item1.value} indeterminate={indeterminate} onChange={() => { this.handleOpenChildren(item, item1, index) }}></Checkbox>
                      <span className='text' onClick={() => { this.handleOpenChildren(item, item1, index) }}>
                        {item1.label}
                        {item1.children.length ? <Icon type="right" style={{ color: '#666' }} /> : null}
                      </span>
                    </div>
                  })
                }
              </Row>
            </Checkbox.Group> : null
          })
        }
      </div>
    )
  }
}

export default InkageCheckbox