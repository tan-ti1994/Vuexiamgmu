import axios from '@/utlis/myaxioe'
// 2. 获取指定栏目的所有新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 3.根据文章id获取文章的详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 文章的点赞和取消点赞
export const likeArticleById = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
