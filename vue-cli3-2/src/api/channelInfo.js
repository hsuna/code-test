import request from '@/utils/request'

// 获取所有的文件树
export function getChannelInfoTree() {
  return request({
    url: 'basic/channelInfo/tree',
    method: 'get'
  })
}

export function buildChannelInfos() {
  return request({
    url: 'basic/channelInfo/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'basic/channelInfo/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'basic/channelInfo/delete?id=' + id,
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'basic/channelInfo/update',
    method: 'post',
    data
  })
}
