import request from '@/utils/request'
export function getMenuList(token) {
  return request({
    url: 'sys/menu/nav',
    method: 'get',
    params: { token }
  })
}
