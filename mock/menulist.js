const menulist = require('./menulist.json')

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
export default [
// get menulist
  {
    url: '/menu/list',
    type: 'get',
    response: config => {
    //   const { token } = config.query
      return {
        code: 20000,
        data: menulist
      }
    }
  }
]
