import axiosInstance from './request/base'

export const getTimeList = () => {
  return axiosInstance.get('/timeList')
}

export const exportTimeList = () => {
  return axiosInstance.get('/time/export', {
    responseType: 'arraybuffer',
  })
}

export const importTimeList = (file: FormData) => {
  return axiosInstance.post('/import/time', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
