import React, { Component } from 'react';
import { Button, Form, Row, Col, Input, Icon, Select, DatePicker } from 'antd';
const InputGroup = Input.Group

class Group extends Component {

  constructor() {
    super(...arguments)

    let value = this.props.value || []
    this.state = {
      value: value
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if(!value) {
      this.setState({
        value: []
      })
    }
  }

  onChange = (e, index) => {
    const { value } = this.state
    let text = e.target.value
    value[index] = text
    this.setState({
      value
    }, () => {
      this.props.onChange(value)
    })
  }

  render () {
    const { onPressEnter , onBlur } = this.props
    const { value } = this.state
    return (
      <InputGroup>
        <Input value={value[0]} style={{ width: '40%', textAlign: 'center' }} onPressEnter={(e) => {
          this.onChange(e, 0)
          onPressEnter(value)
        }} placeholder="最小值" onChange={(e) => {
          this.onChange(e, 0)
        }} onBlur={(e) => {
          this.onChange(e, 0)
          onBlur(value)
        }}/>
        <Input
          style={{
            width: '10%',
            borderLeft: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
            textAlign: 'center'
          }}
          placeholder="~"
          disabled
        />
        <Input value={value[1]} style={{ width: '40%', textAlign: 'center', borderLeft: 0 }} placeholder="最大值" onPressEnter={(e) => {
          this.onChange(e, 1)
          onPressEnter(value)
        }} onChange={(e) => {
          this.onChange(e, 1)
        }} onBlur={(e) => {
          this.onChange(e, 1)
          onBlur(value)
        }}/>
      </InputGroup>
    )
  }
}

export default Group