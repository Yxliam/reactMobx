import { deepCopy } from '@/utils';
import apis from '@/apis';

const cache = (key, value) => localStorage.setItem(key, value)

const regionItem = {
  checked: false,
  indeterminate: false,
  children: [],
  checkedChildren: []
}

export const getProvince = async () => {
  if (localStorage.provinceList) {
    try {
      console.log("provinceList from cache");
      return JSON.parse(localStorage.provinceList);
    } catch (error) {
      console.error(error);
    }
  }
  const res = await apis.getProvince();
  const result = res.data.map(item => ({
    ...item,
    ...deepCopy(regionItem),
    value: Number(item.provinceID),
    label: item.province,
    level: 0
  }));

  cache("provinceList", JSON.stringify(result));

  return result;
};

export const getCity = async provinceCode => {
  if (localStorage.cityList) {
    try {
      console.log("cityList from cache");
      return JSON.parse(localStorage.cityList);
    } catch (error) {
      console.error(error);
    }
  }
  const res = await apis.getCity(provinceCode);
  const result = res.data.map(item => ({
    ...item,
    ...deepCopy(regionItem),
    value: Number(item.cityID),
    label: item.city,
    level: 1
  }));
  cache("cityList", JSON.stringify(result));
  return result;
};

export const getArea = async cityCode => {
  if (localStorage.areaList) {
    try {
      console.log("areaList from cache");
      return JSON.parse(localStorage.areaList);
    } catch (error) {
      console.error(error);
    }
  }
  const res = await apis.getArea(cityCode);
  const result = res.data.map(item => ({
    ...item,
    ...deepCopy(regionItem),
    value: Number(item.areaID),
    label: item.area,
    level: 2
  }));

  cache("areaList", JSON.stringify(result));
  return result;
};
