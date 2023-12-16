import { ResponseDetailProject, ResponseListUserOfTeam } from '../types/team'
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

export const addMember = (data: any, id: string) => {
  return axiosInstance.post(`/team/add-member/${id}`, data)
}

export const removeMember = (data: any, id: string) => {
  return axiosInstance.delete(
    `/team/remove-member/${id}?user_id=${data.user_id}&position_id=${data.position_id}`,
  )
}

export const getListUserOfTeam = (id: string) => {
  return axiosInstance.get<ResponseListUserOfTeam>(
    `/team/get-list-user-of-team/${id}`,
  )
}

export const getDetailProject = (
  {
    type_issue,
    status,
    assignee_id,
    subject,
  }: {
    type_issue: number
    status: number
    assignee_id: number
    subject: string
  },
  id: string,
) => {
  return axiosInstance.get<ResponseDetailProject>(`/issue/${id}`, {
    params: {
      type_issue,
      status,
      assignee_id: assignee_id ? assignee_id : undefined,
      subject: subject ? subject : undefined,
    },
  })
}
