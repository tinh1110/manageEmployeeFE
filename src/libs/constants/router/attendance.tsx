import AtendanceListPage from '../../../pages/attendance'
import { AttendanceList } from '../../../pages/attendance/AttendanceList'
import ImportAttendance from '../../../pages/attendance/ImportAttendance'
import { ATTENDANCE_LIST, ATTENDANCE_EXPORT_VIEW } from '../Permissions'

const attendanceRouter = [
  {
    path: '/attendances',
    element: <AtendanceListPage />,
    permissions: ATTENDANCE_LIST,
  },
  {
    path: '/attendances/import',
    element: <ImportAttendance />,
    permissions: ATTENDANCE_EXPORT_VIEW,
  },
  {
    path: '/attendances/list',
    element: <AttendanceList />,
    permissions: ATTENDANCE_LIST,
  },
]
export default attendanceRouter
