// 这个文件用于处理users表相关的业务
import axios from '@/utlis/myaxioe'
// 实现登录验证
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data

  })
}

// 3获取用户详情
export const getUserInfo = (id) => {
  return axios({
    url: `/user/${id}`

  })
}

// 4.编辑用户信息
export const editUser = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
