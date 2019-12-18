// 这个文件用来处理与栏目相关的业务
import axios from '@/utlis/myaxioe'
// 获取栏目数据
export const lanMu = () => {
  return axios({
    url: '/category'
  })
}
