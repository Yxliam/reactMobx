/**
 * 与或非空 按钮
 */
import React, { Component } from 'react'
import { Button } from 'antd'
import { type, typeName, btnType } from './type'
import './index.scss'

class BaseBtn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.status || ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const { status } = this.props
    const { value } = this.props
    if (status === nextProps.status || status === value) {
      return false
    }

    this.setState({
      value: nextProps.status
    })
  }

  /**
   * 点击轮流切换
   */
  handleClick = () => {
    const { btnType } = this.props
    const { value } = this.state
    const index = type.findIndex(item => {
      return item == (value || '')
    })
    let nextIndex = index < type.length - 1 ? index + 1 : 0
    let newValue = type[nextIndex]
    // 有类型的话
    if (btnType) {
      newValue = value == '' ? 'not' : ''
    }
    this.setState({
      value: newValue
    }, () => {
      const { onChange } = this.props
      onChange && onChange(newValue)
    })
  }

  render () {
    const { value } = this.state
    const btnPrimary = btnType[value]

    return (
      <Button className='base-btn' type={btnPrimary} shape='circle' onClick={this.handleClick}>
        {typeName[value]}
      </Button>
    )
  }
}

export default BaseBtn