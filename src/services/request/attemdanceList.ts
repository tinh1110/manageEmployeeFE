import { TypeEvent } from '../../types/event'
import axiosInstance from './base'

export const attendanceList = (params: any) => {
  return axiosInstance.get(`/attendance/all?`, { params: params })
}

export const allUser = () => {
  return axiosInstance.get('/get-all')
}

export const attendanceType = () => {
  return axiosInstance.get('/attendance/type')
}
