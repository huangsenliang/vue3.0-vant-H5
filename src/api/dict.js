import request from '@/utils/request'

export function dictPage(data) {
  return request({
    url: '/a/dict/page',
    method: 'post',
    data
  })
}

export function dictAdd(data) {
  return request({
    url: '/a/dict/add',
    method: 'post',
    data
  })
}

export function dictUpdate(data) {
  return request({
    url: '/a/dict/update',
    method: 'post',
    data
  })
}

export function dictDelete(data) {
  return request({
    url: '/a/dict/delete',
    method: 'delete',
    data
  })
}

export function dictRefresh(data) {
  return request({
    url: '/a/dict/refresh',
    method: 'get',
    data
  })
}
