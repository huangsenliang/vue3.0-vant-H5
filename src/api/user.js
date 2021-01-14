import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/a/adminUser/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function adminUserPage(params) {
  return request({
    url: '/a/adminUser/page',
    method: 'get',
    params
  })
}

export function adminUserSave(data) {
  return request({
    url: '/a/adminUser/save',
    method: 'post',
    data
  })
}

export function adminUserUpdate(data) {
  return request({
    url: '/a/adminUser/update',
    method: 'post',
    data
  })
}
