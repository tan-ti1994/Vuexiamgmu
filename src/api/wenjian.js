// 这个文件用于处理文件相关的业务
import axios from '@/utlis/myaxioe'
// 实现文件上传
export const wenjian = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
