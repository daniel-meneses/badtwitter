import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../reducers/main.js';
import throttle from 'lodash.throttle';
import { saveStateToLocal, loadState } from '../localStorage.js';


const persistedState = loadState();
// Redux store.
// Returns state from reducers
const store = createStore(
  mainReducer,
  persistedState,
  applyMiddleware(thunk)
);

// Persist some state to local.
// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
store.subscribe(throttle(() => {
  var state = store.getState();
  console.log(state)
  /* Issues caused when saveStateToLoad run after logging out.
     On logout, current user cleared and isAuthenticated = false.
     Check isAuthenticated = false to stop saveState after logout.
  */
  if (!state.session.isAuthenticated) {
    return
  }
  saveStateToLocal({
    feed: { global : { timeline : state.feed.global.timeline },
            profiles : state.feed.profiles,
            profile: state.feed.profile},
    subscriptions: { pending: {
                      subscriptionRequests: state.subscriptions.pending.subscriptionRequests,
                      userIds: state.subscriptions.pending.userIds
                      },
                    accepted: {
                      subscriptionRequests: state.subscriptions.accepted.subscriptionRequests,
                      userIds: state.subscriptions.accepted.userIds
                      },
                  },
    followers: state.followers,
    likes: { likedPostIds: state.likes.likedPostIds },
    session: { currentUser: state.session.currentUser,
               isAuthenticated: state.session.isAuthenticated},
    globalObject: { users: state.globalObject.users,
                    posts: state.globalObject.posts
                  }
  });
}, 1000));

export default store;
