import Home from './containers/Home/Home';
import NavBar from './components/NavBar/NavBar';
import FloatingPostContainer from './components/FloatingPostContainer/FloatingPostContainer';
import SignUp from './containers/SignUp/SignUp';
import UserProfile from './containers/UserProfile/UserProfile';
import Inbox from './containers/Inbox/Inbox';
import Account from './containers/Account/Account';
import Explore from './containers/Explore/Explore';
import Login from './containers/Login/Login';
import NotFound from './containers/NotFound/NotFound';
import loadData from '../server/loadData.js';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: () => loadData()
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user/:id',
    component: UserProfile
  },
  {
    path: '/inbox',
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
    path: '*',
    restricted: false,
    component: NotFound
  }
]

export default routes;
