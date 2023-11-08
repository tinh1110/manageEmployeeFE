import AtendanceListPage from '../../../pages/attendance'
import { AttendanceList } from '../../../pages/attendance/AttendanceList'
import ImportAttendance from '../../../pages/attendance/ImportAttendance'
import { ATTENDANCE_LIST, ATTENDANCE_EXPORT_VIEW } from '../Permissions'

const attendanceRouter = [
  {
    path: '/attendance',
    element: <AtendanceListPage />,
    permissions: ATTENDANCE_LIST,
  },
  {
    path: '/attendance/import',
    element: <ImportAttendance />,
    permissions: ATTENDANCE_EXPORT_VIEW,
  },
  {
    path: '/attendance/list',
    element: <AttendanceList />,
    permissions: ATTENDANCE_EXPORT_VIEW,
  },
]
export default attendanceRouter
