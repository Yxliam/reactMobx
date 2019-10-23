/**
 *  @Title   高级表格
 *  @Auther  YuRonghui
 *  @Des     描述
 *  @Time    2019
 *  @Params
 *  columns:Array
 *  pageSize:Number
 *  parseParams: Function pagination, filters, sorter
 *  parseResult: Function res
 *  rowKey: Function record
 *  api: String
 *  scroll: Object
 */
import React, { Component } from 'react';
import { Table } from 'antd';
import Apis from '@/apis';
import PropTypes from 'prop-types';

class AdvanceTable extends Component {

  static propTypes = {
    columns: PropTypes.array,
    pageSize: PropTypes.number,
    parseParams: PropTypes.func,
    parseResult: PropTypes.func,
    rowKey: PropTypes.func,
    api: PropTypes.string,
    scroll: PropTypes.object
  };

  static defaultProps = {
    columns: [],
    pageSize: 20,
    parseParams: (pagination, filter, sort={}) => {
      return {
        limit: pagination.pageSize,
        page: pagination.current,
        filter,
        sort: {
          createTime: -1,
          ...sort
        }
      }
    },
    parseResult: res => {
      return {
        data: res.data.list,
        total: res.data.total
      }
    },
    rowKey: record => record.actid,
    api: '',
    scroll: {
      x: 1280
    }
  };

  state = {
    data: [],
    pagination: {
      pageSize: 20,
      current: 1,
      total: 0,
      size: 'small',
    },
    loading: false,
  };

  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(nextProps) {
    const { api, parseParams, parseResult } = nextProps;
    this.fetch({ api, parseParams, parseResult });
  }

  handleTableChange = (pagination, filter, sort) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    }, () => {
      this.fetch({filter, sort});
    });
  };

  fetch = (_params = {}) => {
    this.setState({ loading: true });
    const { pageSize } = this.props;
    let { filter, sort, api, ...opts } = _params;
    let apiName = opts.api || this.props.api;
    if(!apiName) return;
    const { pagination } = this.state;
    if(pageSize) pagination.pageSize = pageSize;
    let parseParams = opts.parseParams || this.props.parseParams;
    let parseResult = opts.parseResult || this.props.parseResult;
    if(JSON.stringify(filter) === '{}') filter = undefined;
    if(JSON.stringify(sort) === '{}') sort = undefined;
    let others = parseParams ? parseParams(pagination, filter, sort) : {};
    let data = {
      ...opts,
      ...others,
    }
    // console.log('params:', data);
    if(typeof Apis[apiName] === 'function'){
      Apis[apiName](data).then(res => {
        const pagination = { ...this.state.pagination };
        let results = parseResult ? parseResult(res) : {};
        pagination.total = results.total;
        this.setState({
          loading: false,
          data: results.data,
          pagination,
        });
      });
    }
  };

  render() {
    let { columns, rowKey, scroll, dataSource=[] } = this.props;
    return (
      <Table
        columns={columns}
        rowKey={rowKey}
        scroll={scroll}
        dataSource={dataSource.length ? dataSource : this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    )
  }
};

export default AdvanceTable;
