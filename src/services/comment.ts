import { TypeComment } from '../types/comment'
import axiosInstance from './request/base'

export const comment = () => {
  return axiosInstance.get(`/comment`)
}
export const commentEvent = (id: number) => {
  return axiosInstance.get(`/comment/${id}`)
}
export const commentChildren = (id: number, parent_id: number) => {
  return axiosInstance.get(`/comment/${id}/${parent_id}`)
}

export const addComment = (data: TypeComment) => {
  return axiosInstance.post('/comment/store', data)
}

export const updateComment = (data: any, id: number) => {
  return axiosInstance.put(`/comment/update/${id}`, data)
}

export const editComment = (id: number) => {
  return axiosInstance.get(`/comment/edit/${id}`)
}

export const deleteComment = (id: number) => {
  return axiosInstance.delete(`/comment/delete/${id}`)
}
