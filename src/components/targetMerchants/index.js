import React, { Component } from 'react'
import {
  Modal,
  Transfer,
  Table
} from 'antd'
import AdvanceSearch from '@/components/advanceSearch'
import difference from 'lodash/difference'
import './index.scss'
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        onSelectAll (selected, selectedRows) {
          const treeSelectedKeys = selectedRows.map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect ({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          onRow={({ key }) => ({
            onClick: () => {
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    tag: mockTags[i % 3],
  });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
]
export default class TargetMerchants extends Component {
  state = {
    targetKeys: originTargetKeys
  }

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys })
  }

  openEdit = () => {
    const { openEdit } = this.props
    openEdit && openEdit()
  }

  render () {
    const { targetKeys } = this.state
    const { visible } = this.props
    const columns = [{
      component: 'select',
      options: [{
        value: '四川',
        text: '四川'
      }],
      dataIndex:'dd',
      title: '地区'
    }]
    return (
      <Modal
        visible={visible}
        width={1100}
        title='目标商户'
        onCancel={this.openEdit}
      >
        <AdvanceSearch columns={columns}/>
        <TableTransfer
          dataSource={mockData}
          titles={['目标商户', '已选目标商户']}
          targetKeys={targetKeys}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </Modal>
    )
  }
}
