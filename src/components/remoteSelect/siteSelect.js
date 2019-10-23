/**
 *  @Title   门店选择框
 *  @Auther  wugengsong
 *  @Des     可分页/关键词搜索查询
 *  @Time    2019
 */
import React, { Component } from "react";
import withRemoteSelect from "./base"
import apis from "@/apis";

const PAGE_SIZE = 20;

const SiteSelect = withRemoteSelect({
  pageSize: PAGE_SIZE,

  getData: async function({pageIndex, pageSize, keyword}) {
    const res = await apis.getsiteinforPage({
      querykey: "",
      mctid: "",
      word: keyword,
      sort: {},
      pageindex: pageIndex,
      itemcount: pageSize
    });
    const { itemlist, recordcount } = res.data;

    return {
      options: itemlist.map(item => ({
        ...item,
        value: item.shopid,
        label: item.sitename
      })),
      total: recordcount
    };
  }
})

export default SiteSelect


