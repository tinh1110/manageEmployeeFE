import TeamPage from '../../../pages/team'
import CreateTeam from '../../../pages/team/CreateTeam'
import ListAllTeamSub from '../../../pages/team/ListAllTeamSub'
import ListMemberOfTeam from '../../../pages/team/ListMemberOfTeam'
import ListSub from '../../../pages/team/ListSub'
import UpdateTeam from '../../../pages/team/updateTeam'
import {
  TEAM_ADD,
  TEAM_LIST,
  TEAM_LIST_SUB,
  TEAM_LIST_MEMBER,
  EVENT_UPDATE,
  TEAM_UPDATE,
} from '../Permissions'

export const teamRouter = [
  {
    path: '/projects',
    element: <TeamPage />,
    permissions: TEAM_LIST,
  },
  {
    path: '/projects/sub-teams',
    element: <ListAllTeamSub />,
    permissions: TEAM_LIST_SUB,
  },
  {
    path: '/projects/create',
    element: <CreateTeam />,
    permissions: TEAM_ADD,
  },
  {
    path: '/projects/:id',
    element: <ListSub />,
    permissions: TEAM_LIST_MEMBER,
  },
  {
    path: '/projects/member-of-team/:id',
    element: <ListMemberOfTeam />,
    permissions: TEAM_LIST_MEMBER,
  },
  {
    path: '/projects/update/:id',
    element: <UpdateTeam />,
    permissions: TEAM_UPDATE,
  },
]
export default teamRouter
