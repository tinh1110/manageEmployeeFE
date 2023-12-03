import { Avatar, Button, List, Modal } from 'antd'
import { EVENT_DELETE, EVENT_UPDATE } from '../../libs/constants/Permissions'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { TypeEvent } from '../../types/event'
import { CommentSection } from 'react-comments-section'
import { key } from 'localforage'
import { getUser } from '../../libs/helpers/getLocalStorage'
import EventComment from './eventComment'

interface IProps {
  item: TypeEvent
  permissionsInfo: any
  showModal: () => void
  setIdDelete: (id: number) => void
  handleDeleteEvent: any
  isModalOpen: boolean
  handleCancel: any
}
const EventItem: React.FC<IProps> = ({
  item,
  permissionsInfo,
  showModal,
  setIdDelete,
  handleDeleteEvent,
  isModalOpen,
  handleCancel,
}) => {
  return (
    <List.Item>
      <div className=" w-full h-full mt-10">
        <div className="flex">
          <div className="w-[20%] h-[10%] ">
            <div className="flex">
              {
                <Avatar
                  src={item?.created_by?.avatar || './user.png'}
                  className="w-[40px] h-[40px]"
                />
              }
              <div className="">
                <p className="text-[15px] font-bold m-1">
                  {item?.created_by?.name}
                </p>
                <span className="text-[10px] m-1">{item?.created_at}</span>
              </div>
            </div>
          </div>
          <div className="w-[60%] h-[10%] flex justify-center">
            <h3>
              <p>{item?.name}</p>
            </h3>
          </div>
          <div className="w-[15%] h-[10%] flex justify-center">
            {permissionsInfo &&
              EVENT_UPDATE.every((element: string) =>
                permissionsInfo.includes(element),
              ) && (
                <Link to={`/events/update/${item?.id}`}>
                  <Button
                    type="primary"
                    className=" text-white  bg-sky-500 m-1 rounded-full"
                    htmlType="submit"
                  >
                    <EditOutlined />
                  </Button>
                </Link>
              )}
            {permissionsInfo &&
              EVENT_DELETE.every((element: string) =>
                permissionsInfo.includes(element),
              ) && (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      showModal()
                      setIdDelete(item?.id)
                    }}
                    className=" text-white bg-red-500 m-1 rounded-full"
                  >
                    <DeleteOutlined />
                  </Button>
                  <Modal
                    title="Delete Event"
                    open={isModalOpen}
                    onOk={() => handleDeleteEvent()}
                    onCancel={handleCancel}
                  >
                    <p>"Are you sure to delete this event?"</p>
                  </Modal>
                </>
              )}
          </div>
        </div>
        <div className="w-[100%] h-[90%] ">
          <p>{item?.description}</p>
          <p>Địa điểm: {item?.location}</p>
          <p>
            Thời gian: {item?.start_time} - {item?.end_time}
          </p>
          {item?.link && <a href={item?.link}>link chi tiết</a>}
          <br />
          {item?.image &&
            item?.image.map((item1, index) => (
              <img
                key={index}
                src={item1}
                className="w-[20%] h-[200px] m-5"
                alt="a của tỉnh"
              />
            ))}
        </div>
      </div>
      <EventComment event_id={item.id} />
    </List.Item>
  )
}

export default EventItem
