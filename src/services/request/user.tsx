import { message, notification } from 'antd'
import axiosInstance from './base'
// import { ErrorMessage } from '../../types/user'

export const userApi = async (
  // method:string,
  filter: any,
  {
    setUsers,
    setTotalUser,
    setIsLoading,
  }: { setUsers: any; setTotalUser: any; setIsLoading: any },
) => {
  const parramURL = new URLSearchParams(filter)
  try {
    setIsLoading(true)
    const userData = await axiosInstance
      .get(`/user?${parramURL}`)
      .then((response) => {
        return response.data.data
      })
    setUsers(userData.records)
    setTotalUser(userData.total)
    setIsLoading(false)
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Delete role failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Delete role failed',
        description: err.response.data.message,
      })
    }
  }
}
export const deletedUserApi = async (
  // method:string,
  filter: any,
  {
    setUsers,
    setTotalUser,
    setIsLoading,
  }: { setUsers: any; setTotalUser: any; setIsLoading: any },
) => {
  const parramURL = new URLSearchParams(filter)
  try {
    setIsLoading(true)
    const userData = await axiosInstance
      .get(`/user/deleted?${parramURL}`)
      .then((response) => {
        return response.data.data
      })
    setUsers(userData.records)
    setTotalUser(userData.total)
    setIsLoading(false)
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Delete role failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Delete role failed',
        description: err.response.data.message,
      })
    }
  }
}

export const userApiDelete = async (
  { setIdUser, setIsLoading }: { setIdUser: any; setIsLoading: any },
  id: string,
) => {
  try {
    const userData = await axiosInstance
      .delete(`/user/delete/${id}`)
      .then((response) => {
        setIsLoading(false)
        setTimeout(() => {
          setIdUser(id)

          notification['success']({
            message: 'Delete success',
            description: 'Xóa thành công!',
          })
        }, 0)
        return true
      })
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Delete user failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Delete user failed',
        description: err.response.data.message,
      })
    }
  }
}

export const userApiRestore = async (
  { setIdUser, setIsLoading }: { setIdUser: any; setIsLoading: any },
  id: string,
) => {
  try {
    const userData = await axiosInstance
      .post(`/user/restore/${id}`)
      .then((response) => {
        setIsLoading(false)
        setTimeout(() => {
          setIdUser(id)

          notification['success']({
            message: 'Restore success',
            description: 'Hoàn tác thành công!',
          })
        }, 0)
        return true
      })
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Restore failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Restore failed',
        description: err.response.data.message,
      })
    }
  }
}
export const userApiForceDelete = async (
  { setIdUser, setIsLoading }: { setIdUser: any; setIsLoading: any },
  id: string,
) => {
  try {
    const userData = await axiosInstance
      .delete(`/user/forceDelete/${id}`)
      .then((response) => {
        setIsLoading(false)
        setTimeout(() => {
          setIdUser(id)
          notification['success']({
            message: 'Delete success',
            description: 'Xóa thành công!',
          })
        }, 0)
        return true
      })
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Delete failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Delete failed',
        description: err.response.data.message,
      })
    }
  }
}

export const userApiGetUser = async (
  {
    setUserData,
    setStartDate,
    setIsLoading,
  }: { setUserData: any; setStartDate: any; setIsLoading: any },
  id: string,
) => {
  try {
    const userData = await axiosInstance
      .get(`/user/show/${id}`)
      .then((response) => {
        setUserData(response.data.data)
        if (response.data.data?.dob) {
          setStartDate(new Date(response.data.data?.dob))
        }
        setIsLoading(false)
        return response.data.data
      })
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Delete role failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Delete role failed',
        description: err.response.data.message,
      })
    }
  }
}

export const userApiCreate = async (
  { setError }: { setError: any },
  createValue: any,
) => {
  try {
    const userData = await axiosInstance
      .post(`/user/store`, createValue)
      .then((response) => {
        setTimeout(() => {
          notification['success']({
            message: 'Create success',
            description: 'Thêm thành công!',
          })
        }, 0)
        return response
      })

    return [userData, undefined]
  } catch (errors: any) {
    setError(errors.response.data.errors)
    return [undefined, errors.response.data.errors]
  }
}

export const userApiUpdate = async (
  { setError }: { setError: any },
  error: any,
  createValue: any,
  id: string,
) => {
  try {
    const userData = await axiosInstance
      .post(`/user/update/${id}`, createValue)
      .then((response) => {
        setTimeout(() => {
          notification['success']({
            message: 'Update success',
            description: 'Sửa thành công!',
          })
        }, 0)
        return response
      })
    return [userData, undefined]
  } catch (errors: any) {
    setError(errors.response.data.errors)
    return [undefined, errors.response.data.errors]
  }
}

export const getRole = async () => {
  try {
    const roleData = await axiosInstance.get(`/role`).then((response) => {
      if (response.data) {
        const dataset = response.data.data.records
        return dataset
      }
    })
    return roleData
  } catch (err: any) {
    if (err.response.data.errors) {
      const errorMessages = Object.values(err.response.data.errors)
        .map((message) => `- ${message}<br>`)
        .join('')
      const key = 'message'
      notification['error']({
        key,
        duration: 5,
        message: 'Delete role failed',
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: errorMessages }}
            className="text-red-500"
          />
        ),
      })
    } else {
      notification['error']({
        duration: 5,
        message: 'Delete role failed',
        description: err.response.data.message,
      })
    }
  }
}

export const GetImportInfor = async (
  {
    setDataImport,
    setLoopTime,
    setLoadings,
    setFile,
    setFileList,
  }: {
    setDataImport: any
    setLoopTime: any
    setLoadings: any
    setFile: any
    setFileList: any
  },
  id: string,
) => {
  try {
    const importData = await axiosInstance
      .get(`/user/importInfor/${id}`)
      .then((response) => {
        return response.data.data
      })
    const importStatus = (await importData[0].status) === 1
    if (importStatus) {
      setLoopTime(false)
      setLoadings(false)
      setFile('')
      setFileList([])
    } else {
      setLoopTime(true)
    }

    setDataImport(importData)
  } catch (errors: any) {
    // setLoopTime(1000)
  }
}
