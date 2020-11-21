import Home from '../containers/Home/Home';
import SignUp from '../containers/SignUp/SignUp';
import UserProfile from '../containers/UserProfile/UserProfile';
import Inbox from '../containers/Inbox/Inbox';
import Account from '../containers/Account/Account';
import Explore from '../containers/Explore/Explore';
import Login from '../containers/Login/Login';
import NotFound from '../containers/NotFound/NotFound';
import { getGlobalFeed } from '../actions/feed'
import { getUserProfile } from '../actions/userProfile';


const routes = [
  {
    path: '/home',
    component: Home,
    fetchInitialData: (req) => getGlobalFeed(null, req.headers)
  },
  {
    path: '/user/:id',
    component: UserProfile,
    fetchInitialData: (req) =>  getUserProfile(req.user_id_param, req.headers)
  },
  {
    path: '/inbox',
    component: Inbox
  },
  {
    path: '/inbox/:tab',
    component: Inbox
  },
  {
    path: '/explore',
    component: Explore
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    fetchInitialData: (req) => getGlobalFeed(req.headers)
  },
  {
    path: '*',
    restricted: false,
    component: NotFound
  }
]

export default routes;
