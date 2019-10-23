import React, { Component } from 'react'
import constants from '@/constants'
import { Checkbox, TimePicker } from 'antd'
import moment from 'moment'
import './style.scss'

export default class Time extends Component {

  constructor(props) {
    super(props)

    let value = this.props.value || {
      week: [],
      time: []
    }
    this.state = {
      value
    }
  }

  onChange = () => {

  }

  /**
   * 选择周期
   */
  onChangeWeek = (week) => {
    const { value } = this.state
    value.week = week
    this.setState({
      value
    }, () => {
      const { onChange } = this.props
      const newValue = Object.assign({}, value)
      onChange && onChange(newValue)
    })
  }

  /**
   * 选择时间
   */
  onChangeTime = (time, type) => {
    const { value } = this.state
    value.time[type] = time
    this.setState({
      value
    }, () => {
      const { onChange } = this.props
      const newValue = Object.assign({}, value)
      onChange && onChange(newValue)
    })
  }

  render () {
    const { value } = this.state
    const { week = [] } = this.props
    return (
      <div>
        <Checkbox.Group style={{ width: '100%' }} value={value.week} onChange={this.onChangeWeek}>
          {
            week.map(item => <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>)
          }
        </Checkbox.Group>
        <div className='time-picker'>
          <TimePicker value={value.time[0]} format='HH:mm' onChange={(time) => this.onChangeTime(time, 0)} /> ~ <TimePicker value={value.time[1]} onChange={(time) => this.onChangeTime(time, 1)} format='HH:mm' />
        </div>
      </div>
    )
  }
}