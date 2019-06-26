import request from '@/utils/request'

// 获取所有的文件树
export function getAttachmentTypeTree() {
  return request({
    url: 'system/attachmentType/tree',
    method: 'get'
  })
}

export function buildAttachmentTypes() {
  return request({
    url: 'system/attachmentType/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/attachmentType/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/attachmentType/delete?id=' + id,
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'system/attachmentType/update',
    method: 'post',
    data
  })
}
