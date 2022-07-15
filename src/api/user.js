/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const sendCode = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
