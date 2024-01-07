import axiosInstance from './base'

export const detailIssue = (id: string) => {
  return axiosInstance.get(`/issue/edit/${id}`)
}

export const parentIssue = (id: string) => {
  return axiosInstance.get(`/issue/parent/${id}`)
}

export const addIssue = (data: any) => {
  return axiosInstance.post(`/issue/store`, data)
}

export const updateIssue = (data: any, id: any) => {
  return axiosInstance.post(`/issue/update/${id}`, data, {
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
export const userAll = (id: any) => {
  return axiosInstance.get(`/team/get-list-user-of-team/${id}`)
}
