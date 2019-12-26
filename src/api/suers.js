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
// 5. 实现用户注册
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
// 6.关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 7.取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 8.获取我的关注列表
export const getMyFollows = (id) => {
  return axios({
    url: `/user_follows`
  })
}

// 9.获取我的收藏
export const getMyCollections = (id) => {
  return axios({
    url: `/user_star`
  })
}
