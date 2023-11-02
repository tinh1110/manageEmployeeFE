import ListUsers from '../../../pages/users'
import FormUsers from '../../../pages/users/add'
import DeletedUsers from '../../../pages/users/deleted'
import UsersEdit from '../../../pages/users/edit'
import UsersImport from '../../../pages/users/import'
import {
  USER_ADD,
  USER_IMPORT_VIEW,
  USER_LIST,
  USER_LIST_DELETED,
  USER_UPDATE,
} from '../Permissions'

const user_routes = [
  {
    path: '/users/',
    element: <ListUsers />,
    permissions: USER_LIST,
  },
  {
    path: '/users/add',
    element: <FormUsers />,
    permissions: USER_ADD,
  },
  {
    path: '/users/edit/:id',
    element: <UsersEdit />,
    permissions: USER_UPDATE,
  },
  {
    path: '/users/deleted',
    element: <DeletedUsers />,
    permissions: USER_LIST_DELETED,
  },
  {
    path: '/users/import',
    element: <UsersImport />,
    permissions: USER_IMPORT_VIEW,
  },
]
export default user_routes
