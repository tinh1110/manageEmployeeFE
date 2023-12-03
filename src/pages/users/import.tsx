import { Button, Form, notification } from 'antd'
import MainLayout from '../../components/layouts/main'
import {
  CloudUploadOutlined,
  UploadOutlined,
  StopOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import { useState, useRef, ChangeEvent } from 'react'
import { dowloadTemplateUser, importUser } from '../../services/importUser'
import ImportSearch from '../../components/importUser/ImportSearch'
import { USER_IMPORT } from '../../libs/constants/Permissions'
import { getPermissions } from '../../libs/helpers/getLocalStorage'
const UsersImport = () => {
  const [isDisplayForm, setIsDisplayForm] = useState<boolean>(false)
  const ref = useRef<HTMLInputElement>(null)
  const [fileSelected, setFileSelected] = useState<any>()
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false)
  const permissionsInfo = getPermissions()
  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setFileSelected(e.target.files[0])
    }
  }
  const handleToggleForm = () => {
    setIsDisplayForm(!isDisplayForm)
  }
  // const handleFocusInput = () => {
  //   ref?.current && ref?.current?.click()
  // }

  const handleSubmit = async () => {
    try {
      const formData: any = new FormData()
      if (fileSelected) {
        formData.append('file', fileSelected)
      }

      const res = await importUser(formData)
      notification['success']({
        message: 'Update successful',
        description: res.data.message,
      })
      setFileSelected(null)
      setIsDisplayForm(!isDisplayForm)
      setIsLoadPage(true)
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .map((message) => `- ${message}<br>`)
          .join('')
        const key = 'updatable'
        notification['error']({
          key,
          duration: 5,
          message: 'Request failed',
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
          message: 'Request failed',
          description: err?.response?.data?.message,
        })
      }
    }
  }
  const handleDownload = async () => {
    try {
      const res = await dowloadTemplateUser().then((response) => {
        const fileUrl = URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = fileUrl
        link.setAttribute('download', 'template_import_users.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    } catch (err: any) {}
  }
  return (
    <>
      {permissionsInfo &&
        USER_IMPORT.every((element: string) =>
          permissionsInfo.includes(element),
        ) && (
          <>
            <div className="w-full flex justify-end">
              <Button
                type="primary"
                className="mr-5"
                onClick={handleToggleForm}
              >
                <CloudUploadOutlined />
                Tải file
              </Button>
            </div>
            {isDisplayForm && (
              <Form className=" h-[250px] items-center flex  flex-col justify-center">
                <div
                  className="border mt-3 w-[40%] h-[160px]  border-dashed border-[#0000004d] flex justify-center"
                  // onClick={handleFocusInput}
                >
                  <div className="text-center ml-[30%]">
                    <UploadOutlined
                      className=" text-[25px]  m-1"
                      twoToneColor="green"
                    />
                    <p className="font-bold">Click vào đây để upload file </p>
                    <input
                      ref={ref}
                      type="file"
                      name="file"
                      className="mt-7"
                      onChange={(e) => handleChangeFile(e)}
                    />
                  </div>
                  <div className="mt-[130px]">
                    <a href="#" onClick={handleDownload}>
                      <DownloadOutlined />
                      Tải file mẫu
                    </a>
                  </div>
                </div>
                <div className="self-end flex ">
                  <Button
                    className="m-3 bg-slate-600 text-white font-bold"
                    onClick={handleToggleForm}
                  >
                    <StopOutlined />
                    Hủy
                  </Button>
                  <Button
                    className="m-3 bg-sky-600 text-white font-bold "
                    onClick={handleSubmit}
                  >
                    <CloudUploadOutlined />
                    Bắt đầu import
                  </Button>
                </div>
              </Form>
            )}
          </>
        )}
      <ImportSearch isLoadPage={isLoadPage} setIsLoadPage={setIsLoadPage} />
    </>
  )
}

export default UsersImport
