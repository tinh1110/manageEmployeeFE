import EventPage from '../../../pages/event'
import AddEventPage from '../../../pages/event/addEvent'
import UpdateEventPage from '../../../pages/event/updateEvent'
import { EVENT_ADD, EVENT_LIST, EVENT_UPDATE } from '../Permissions'

const eventRouter = [
  {
    path: '/events',
    element: <EventPage />,
    permissions: EVENT_LIST,
  },
  {
    path: '/events/add',
    element: <AddEventPage />,
    permissions: EVENT_ADD,
  },
  {
    path: '/events/update/:id',
    element: <UpdateEventPage />,
    permissions: EVENT_UPDATE,
  },
]
export default eventRouter
