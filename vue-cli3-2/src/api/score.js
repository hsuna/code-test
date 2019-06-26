import request from '@/utils/request'

// 积分信息分页
export function pageScoreInfo() {
  return request({
    url: 'score/scoreInfo/page',
    method: 'get'
  })
}

export function saveScoreInfo(data) {
  return request({
    url: 'score/scoreInfo/save',
    method: 'post',
    data
  })
}

export function deleteScoreInfo(id) {
  return request({
    url: 'score/scoreInfo/delete/' + id,
    method: 'delete'
  })
}

export function updateScoreInfo(data) {
  return request({
    url: 'score/scoreInfo/update',
    method: 'put',
    data
  })
}

// ------------------------------------------------------
// 积分收支分页
export function pageScoreTrade() {
  return request({
    url: 'score/scoreTrade/page',
    method: 'get'
  })
}

export function saveScoreTrade(data) {
  return request({
    url: 'score/scoreTrade/save',
    method: 'post',
    data
  })
}

export function deleteScoreTrade(id) {
  return request({
    url: 'score/scoreTrade/delete/' + id,
    method: 'delete'
  })
}

export function updateScoreTrade(data) {
  return request({
    url: 'score/scoreTrade/update',
    method: 'put',
    data
  })
}

