import axiosInstance from './request/base'

export interface ImportUserType {
  id: number
  file_name: string
  link: string
  status: number
  success_amount: number
  fail_amount: number
  error: string
  result: string
  updated_at: string
  created_at: string
  created_by: {
    id: number
    address: string
    avatar: string
    details: string
    dob: string
    email: string
    gender: number
    name: string
    phone_number: string
    role: string
    status: number
  }
}
export interface TypeParamsImport {
  file_name?: string
  status?: string
  created_by_id?: number
  start_time?: string
  end_time?: string
  sort?: string
  sortType?: number
  page?: number
  limit?: number
}
export const getAdmin = () => {
  return axiosInstance.get('/user/admin')
}
export type ImportUser = {
  file: File
}
export const importUser = (data: ImportUser) => {
  return axiosInstance.post('/user/import', data)
}

export const importView = (params: TypeParamsImport) => {
  return axiosInstance.get(`/user/file-import`, { params: params })
}

export const dowloadTemplateUser = () => {
  return axiosInstance.get('/user/export-template', { responseType: 'blob' })
}
