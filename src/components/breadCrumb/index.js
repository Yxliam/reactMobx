/**
 *  @Title   面包屑组件
 *  @Auther  yxl
 *  @Des     传入 breadList数组，数组形式[{name:'xx',path:'xx'}] name：显示的title path：跳转的链接
 *  @Time    2019
 */

import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";


@withRouter
class BreadCrumb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            breadList: Array.isArray(props.breadList)?props.breadList:[]
        }
        
    }
    handlePath = (path)=>{
        this.props.history.push(`${path}`);
    }
      render(){
          const { breadList } = this.state;
          return(
              <div>
                   <Breadcrumb>
                        {
                          breadList.map((item,key)=>{
                              let breaItem = <Breadcrumb.Item style={{'cursor':'pointer' }} key={key}>{item.name}</Breadcrumb.Item>;
                              if(item.path){
                                breaItem = <Breadcrumb.Item style={{'cursor':'pointer' }} onClick={this.handlePath.bind(this,item.path)}  key={key}>{item.name}</Breadcrumb.Item>;
                              }
                              return breaItem;
                          }) 
                        }
                    </Breadcrumb>
              </div>
          );
      }
}
BreadCrumb.defaultProps = {
    breadList:[],
}
BreadCrumb.propTypes={
    breadList:PropTypes.array,
}

export default BreadCrumb;