/**
 *  @Title   地区选择器
 *  @Auther  wugengsong
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { debounce } from 'throttle-debounce'
import { AutoComplete, Checkbox, Icon, Input, Button, Card, Tag, Typography } from 'antd';
import { getProvince, getCity, getArea } from './apiRegion';
import './index.scss'

const { Text } = Typography;

const propsItem = {
  provinceId: 0,
  cityId: 0,
  areaId: 0,
  province: '',
  city: '',
  area: ''
}

@observer
class RegionPicker extends Component {
  static defaultProps = {
    region: []
  }

  constructor() {
    super(...arguments)
    this.state = {
      cityExpand: false,
      areaExpand: false,
      flattenOptions: [],  // 二维数组 [[{}], [], []]
      active: [],
      dataSource: [],
      isAll: false,
      isIndeterminate: false
    }
    this.provinceList = []
    this.cityList = []
    this.areaList = []
  }

  componentDidMount() {

    Promise.all([getProvince(), getCity(), getArea()]).then(res => {
      this.provinceList = res[0]
      this.cityList = res[1]
      this.areaList = res[2]
      
      this.areaList.forEach(item => {
        const father = this.cityList.find(f => f.value === Number(item.father))
        if (father) {
          father.children.push(item)
        }
      })

      this.cityList.forEach(item => {
        const father = this.provinceList.find(f => f.value === Number(item.father))
        if (father) {
          father.children.push(item)
        }
      })
    
      this.initCheckedItem(this.provinceList)
      this.setAllChecked()

      this.setState({
        flattenOptions: [this.provinceList]
      })
    })
  }

  initCheckedItem = (provinceList = []) => {
    const { region = [] } = this.props
    /**
     * 设置初始值
     * 分支1: 选择到区
     * 分支2: 选择到市
     * 分支3: 选择到省
     */
    region.forEach(item => {
      const province = provinceList.find(provinceItem => provinceItem.value === item.provinceId)
      if (!province) {
        return
      }

      if (item.areaId !== undefined && item.areaId !== 0) {
        province.indeterminate = true
        const city = province.children.find(c => c.value === item.cityId)
        city.indeterminate = true
        city.checkedChildren.push(item.areaId)

        const area = city.children.find(c => c.value === item.areaId)
        area.checked = true
        this.setChildChecked(area, true)
      } else if (item.cityId !== undefined && item.cityId !== 0) {
        province.indeterminate = true
        if (province.checkedChildren.indexOf(item.cityId) === -1) {
          province.checkedChildren.push(item.cityId)
          let existed = province.children.find(o => o.value === item.cityId)
          existed.checked = true

          this.setChildChecked(existed, true)
        }
      } else {
        province.checked = true
        this.setChildChecked(province, true)
      }
    })
  }

  handleItemClick = async (colIndex, rowIndex) => {
    // 当前选择行高亮
    this.setState(state => ({
      active: state.active.slice(0, colIndex).concat(rowIndex)
    }))

    const currentRow = this.state.flattenOptions[colIndex][rowIndex]
    
    if (!currentRow.children.length) {
      return false
    }

    this.handleExpand(currentRow.children, colIndex)
  }

  /**
   * 展开当前行
   */
  handleExpand = (list, i) => {
    if (list.length === 0) {
      return false
    }
    this.setState(state => ({
      flattenOptions: state.flattenOptions.slice(0, i + 1).concat([list])
    }))
  }

  checkboxChange = (currentRow, checked) => {
    // 当前项选中状态
    currentRow.checked = checked
    currentRow.indeterminate = false

    // 往上冒泡， 修改 father.checkedChildren
    if (currentRow.father) {
      this.setFatherChecked(currentRow)
    }

    // 向下传递 checked 状态
    if (currentRow.children && currentRow.children.length > 0) {
      this.setChildChecked(currentRow, checked)
    }

    // 设置全选 checed 状态
    this.setAllChecked()

    this.onChange()

    this.setState(state => ({
      flattenOptions: state.flattenOptions
    }))
  }

  /**
   * 提交数据
   * [{ province: '', provinceId: 0, city: '', cityId: 0, area: '', areaId: 0 }]
   */
  onChange = () => {
    // 遍历每个省份,往下查找已选项,若全选则不再继续
    let result = []
    const { flattenOptions } = this.state
    const region = flattenOptions[0]

    region.forEach(province => {
      const provinceItem = {
        provinceId: province.value,
        province: province.label
      }
      if (province.checked) {
        result.push({
          ...propsItem,
          ...provinceItem
        })
      } else if (province.indeterminate) {
        province.children && province.children.forEach(city => {
          const cityItem = {
            cityId: city.value,
            city: city.label
          }
          if (city.checked) {
            result.push({
              ...propsItem,
              ...provinceItem,
              ...cityItem
            })
          } else if (city.indeterminate) {
            city.children && city.children.forEach(area => {
              if (area.checked) {
                result.push({
                  ...provinceItem,
                  ...cityItem,
                  area: area.label,
                  areaId: area.value
                })
              }
            })
          }
        })
      }
    })

    this.props.onChange && this.props.onChange(result)
  }

  /**
   * 设置全选状态
   */
  setAllChecked = () => {
    const hasChecked = this.provinceList.find(item => item.indeterminate || item.checked)
    if (hasChecked) {
      this.setState({
        isIndeterminate: true,
        isAll: false
      })

      const provinceUnChecked = this.provinceList.find(item => !item.checked)      
      if (!provinceUnChecked) {
        this.setState({
          isIndeterminate: false,
          isAll: true
        })
      }
    } else {
      this.setState({
        isIndeterminate: false,
        isAll: false
      })
    }
  }

  /**
   * 设置父级选中状态
   */
  setFatherChecked = (current) => {
    let level = current.level
    let fatherId = current.father
    while (level - 1 >= 0 ) {
      let father = {}
      if (level === 2) {
        father = this.cityList.find(item => item.value === Number(fatherId))
      } else if (level === 1) {
        father = this.provinceList.find(item => item.value === Number(fatherId))
      }
      const hasChildrenInteder = father.children.filter(item => item.indeterminate).length !== 0
      father.checkedChildren = father.children.filter(item => item.checked).map(item => item.value)
      father.indeterminate = hasChildrenInteder || (father.checkedChildren.length !== 0 && father.checkedChildren.length !== father.children.length)
      father.checked = father.checkedChildren.length === father.children.length

      fatherId = father.father
      level--
    }
  }

  /**
   * 设置后代选中状态
   */ 
  setChildChecked = (current, checked) => {
    const children = current.children

    current.checkedChildren = children.filter(item => item.checked).map(item => item.value)

    children.forEach(item => {
      item.checked = checked
      item.indeterminate = false

      if (item.children && item.children.length > 0) {
        this.setChildChecked(item, checked)
      }
    })
  }

  /**
   * 清空已选
   */
  handleClear = () => {
    this.provinceList.forEach(item => {
      this.checkboxChange(item, false)
    })
    this.props.onChange && this.props.onChange([])
  }

  /**
   * 根据 level 从相应省/市/区中查找
   */
  handleSelect = (value, option) => {
    const [level, id] = value.split('-')

    let resource = []
    if (Number(level) === 0) {
      resource = this.provinceList
    } else if (Number(level) === 1) {
      resource = this.cityList
    } else {
      resource = this.areaList
    }

    const find = resource.find(item => item.value === Number(id))
    find && this.checkboxChange(find, true)
  }

  handleSearch = debounce(500, val => {
    if (val.trim() === '') {
      return this.setState({
        dataSource: []
      })
    }

    const findProvince = this.returnSearch(this.provinceList, val)
    const findCity = this.returnSearch(this.cityList, val)
    const findArea = this.returnSearch(this.areaList, val)
    
    this.setState({
      dataSource: findProvince.concat(findCity, findArea)
    })
  })

  /**
   * 生成下拉选项, 传入当前的level, 便于后续查找
   */
  returnSearch = (list, value) => {
    return list
        .filter(item => item.label.indexOf(value) >= 0)
        .map(item => ({
            ...item,
            text: item.label,
            value: item.level + '-' + item.value
        }))
  }

  /**
   * 省份全选
   */
  handleSelectAll = (e) => {
    this.provinceList.forEach(item => {
      this.checkboxChange(item, e.target.checked)
    })
  }

  render() {
    const {
      flattenOptions,
      active,
      dataSource,
      isAll,
      isIndeterminate
    } = this.state
    const { region } = this.props

    return (
      <div className='region-picker'>
        <Text className="title-1">
          选择区域 ( 已选择: {region.length} )
          <Button
            ghost
            type="danger"
            size='small'
            onClick={this.handleClear}
            disabled={!region.length}
            style={{marginLeft: 14}}
          >
            清空
          </Button>
          <Checkbox
            checked={isAll}
            indeterminate={isIndeterminate}
            onChange={this.handleSelectAll}
            style={{marginLeft: 14}}
          >
            全选
          </Checkbox>
        </Text>        
        {
          !!region.length && <Card className='region-scroll'>
            {
              region.map(item => (
                <Tag 
                  color='#409eff' 
                  key={item.provinceId + '-' + item.cityId + '-' + item.areaId}
                >
                {item.area || item.city || item.province}
              </Tag>
              ))
            }
          </Card>
        }

        <AutoComplete
          dataSource={dataSource}
          style={{ width: 320 }}
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
        >
          <Input
            placeholder='搜索省，市，区'
            prefix={<Icon type='search' />}
          />
        </AutoComplete>

        <div className='cascader-menus' style={{marginTop: 10}}>
          {
            flattenOptions.map((col, colIndex) => (
              <ul
                key={colIndex}
                style={{width: 100 / flattenOptions.length + '%'}}
                className={`cascader-menu ${colIndex > 0 && col.length > 0 ? 'cascader-menu-extend' : ''}`}
              >
                {
                  col.map((row, rowIndex) => (
                    <li
                      key={colIndex + '' + row.value}
                      onClick={() => this.handleItemClick(colIndex, rowIndex)}
                      className={`cascader-menu-item cascader-menu-item-expand ${active[colIndex] === rowIndex ? 'cascader-menu-item-active' : ''}`}
                    >
                      <Checkbox 
                        checked={row.checked}
                        indeterminate={row.indeterminate}
                        onChange={e => this.checkboxChange(row, e.target.checked)}
                        onClick={e => e.stopPropagation()}
                      >
                      </Checkbox>
                      <span>{row.label}</span>
                      {
                        !!row.children.length && <span className='cascader-menu-item-expand-icon'>
                          <Icon type="right" />
                        </span>
                      }
                    </li>
                  ))
                }
              </ul>
            ))
          }
        </div>
      </div>
    )
  }
};

export default RegionPicker;
