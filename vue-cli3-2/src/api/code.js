import request from '@/utils/request'

export function resetEmail(data) {
  return request({
    url: 'common/sms/emailCode',
    method: 'post',
    data
  })
}

export function updatePass(pass) {
  return request({
    url: 'api/users/updatePass/' + pass,
    method: 'get'
  })
}
