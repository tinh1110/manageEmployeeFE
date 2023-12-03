import axiosInstance from './base'

export const addTeam = (data: any) => {
  return axiosInstance.post('/team/create-new-team', data)
}
export const updateTeam = (data: any, id: string) => {
  return axiosInstance.put(`/team/update-team/${id}`, data)
}

export const editTeam = (id: string) => {
  return axiosInstance.get(`/team/get-detail-team/${id}`)
}
