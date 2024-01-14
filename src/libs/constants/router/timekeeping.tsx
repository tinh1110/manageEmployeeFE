import ReportPage from '../../../pages/report'
import TimekeepingPage from '../../../pages/timekeeping'

const timekeepingRouter = [
  {
    path: '/timekeeping',
    element: <TimekeepingPage />,
    permissions: [],
  },
  {
    path: '/report',
    element: <ReportPage />,
    permissions: [],
  },
]

export default timekeepingRouter
