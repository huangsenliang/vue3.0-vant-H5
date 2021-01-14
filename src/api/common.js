import request from '@/utils/request'

export function dictList(data) {
  return request({
    url: '/c/dict/list',
    method: 'post',
    data
  })
}
