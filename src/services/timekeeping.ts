import axiosInstance from './request/base'

export const getTimeList = () => {
  return axiosInstance.get('/timeList')
}
