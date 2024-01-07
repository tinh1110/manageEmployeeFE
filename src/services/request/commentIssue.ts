import axiosInstance from './base'

export const commentIssue = (id: number) => {
  return axiosInstance.get(`/commentIssue/${id}`)
}
export const addCommentIssue = (data: any) => {
  return axiosInstance.post('/commentIssue/store', data)
}

export const updateCommentIssue = (data: any, id: number) => {
  return axiosInstance.put(`/commentIssue/update/${id}`, data)
}
export const editCommentIssue = (id: number) => {
  return axiosInstance.get(`/commentIssue/edit/${id}`)
}

export const deleteCommentIssue = (id: number) => {
  return axiosInstance.delete(`/commentIssue/delete/${id}`)
}
