import { BaseResponse } from '../../types/baseResponse'
interface ListUserOfTeam {
  id: number
  name: string
  email: string
  avatar: string
  address: string
  phone_number: string
  gender: number
  status: number
  details: string
  role: string
  position_id: number
}
interface DetailProject {
  id: number
  parent_id: number | null
  assignee: {
    id: number
    name: string
    avatar: string
  }
  status: number
  subject: string
  description: string
  priority: number
  children: DetailProject[]
  start_date: string
  end_date: string
}
export interface ResponseListUserOfTeam
  extends BaseResponse<{
    records: ListUserOfTeam[]
    page: number
    limit: number
    total: number
  }> {}

export interface ResponseDetailProject extends BaseResponse<DetailProject[]> {}
