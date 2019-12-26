import axios from '@/utlis/myaxioe'
// 2. 获取指定栏目的所有新闻数据
export const getArticleList = params => {
  return axios({
    url: '/post',
    params
  })
}
// 3.根据文章id获取文章的详情
export const getArticleDetail = id => {
  return axios({
    url: `/post/${id}`
  })
}
// 文章的点赞和取消点赞
export const likeArticleById = id => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 4. 文章收藏和取消收藏
export const collectArticleById = id => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 5.当前文章的评论数据
export const getCommentsById = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}
// 6. 发表文章评论--包括回复
export const sendComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
// 7.根据关键字进行搜素
export const searchArticle = params => {
  return axios({
    url: '/post_search',
    params
  })
}
