import { User } from './user'

// data get from attendance to display on add/edit form (follow the event type in fullcalendar)
export interface AttendanceFormData {
  id?: number
  title?: string
  start?: string
  end?: string
  startTime?: string
  endTime?: string
  extendedProps?: any
}

export interface AttendanceType {
  id?: number
  name?: string
}

export interface AttendanceFormRequest {
  id?: number
  start_date?: Date
  end_date?: Date
  start_time?: string
  end_time?: string
  img?: File
  ids?: Array<number>
  reason?: string
}

export interface Attendance {
  id?: number
  title?: string
  type_name?: string
  type_id?: number
  start?: string
  end?: string
  startTime?: string
  endTime?: string
  created_by_id?: string
  created_by?: string
  reason?: string
  img?: any
  result?: string
  managers?: Array<User>
  status?: any
  total_hours?: number
  approver?: string
}
