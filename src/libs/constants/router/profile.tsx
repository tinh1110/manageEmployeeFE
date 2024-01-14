import ProfilePage from '../../../pages/profile'
import ChangePasswordPage from '../../../pages/profile/changePassword'
import UpdateProfilePage from '../../../pages/profile/editProfile'
import UserProfilePage from '../../../pages/profile/userProfile'
import { PROFILE, UPDATE_PROFILE } from '../Permissions'
const profileRouter = [
  {
    path: '/profile',
    element: <ProfilePage />,
    permissions: PROFILE,
  },
  {
    path: '/profile/:id',
    element: <UserProfilePage />,
    permissions: PROFILE,
  },
  {
    path: '/updateProfile',
    element: <UpdateProfilePage />,
    permissions: UPDATE_PROFILE,
  },
  {
    path: '/changePassword',
    element: <ChangePasswordPage />,
    permissions: UPDATE_PROFILE,
  },
]
export default profileRouter
