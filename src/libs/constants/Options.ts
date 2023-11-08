import { ATTENDANCE_STATUS, BO_CONFIRM } from './Attendance'
export const LIST_GENDER = [
  {
    label: 'Nam',
    value: 1,
  },
  {
    label: 'Nữ',
    value: 2,
  },
  {
    label: 'Khác',
    value: 3,
  },
]
export const LIST_STATUS = [
  {
    label: 'Đang Import',
    value: 1,
  },
  {
    label: 'Import Thành Công',
    value: 2,
  },
  {
    label: 'Import Thất Bại',
    value: 3,
  },
]
export const LIST_SORT = [
  {
    label: 'Mới nhất',
    value: 0,
  },
  {
    label: 'Cũ nhất',
    value: 1,
  },
]

export const LIST_BO_CONFIRM = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Chấp nhận',
    value: BO_CONFIRM.ACCEPT,
  },
  {
    label: 'Từ chối',
    value: BO_CONFIRM.REJECT,
  },
]
