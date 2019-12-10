import request from '@/utils/request'

export function getMenuList(token) {
  return request({
    url: '/menu/list',
    // url: 'sys/menu/nav', //真实路径请求地址
    method: 'get',
    params: { token }
  })
}
