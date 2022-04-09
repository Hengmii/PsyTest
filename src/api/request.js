import axios from "axios";
const request =axios.create({})

export function addApi(data) {
  return request({
      url:'http://139.196.111.161:8080/consultant/add',
      method: 'post',
      data
  })
}

export function saveApi(data) {
  return request({
      url:'http://139.196.111.161:8080/consultant/save',
      method: 'post',
      data
  })
}

export function getListApi(params) {
  return request({
      url:'http://139.196.111.161:8080/consultant/list',
      method: 'get',
      params
  })
}

// 访客禁用
export function editUserApi(params) {
  return request({
      url:'http://139.196.111.161:8080/user/permission/edit',
      method:'get',
      params
  })
}
