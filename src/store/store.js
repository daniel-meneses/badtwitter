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
  saveStateToLocal({
    feed: { global : { timeline : state.feed.global.timeline },
            profiles : state.feed.profiles},
    subscriptions: { pending: {
                      subscriptionRequests: state.subscriptions.pending.subscriptionRequests,
                      userIds: state.subscriptions.pending.userIds
                      },
                    accepted: {
                      subscriptionRequests: state.subscriptions.accepted.subscriptionRequests,
                      userIds: state.subscriptions.accepted.userIds
                      },
                  },
    followers: { pending: {
                  followRequests: state.followers.pending.followRequests,
                  userIds: state.followers.pending.userIds
                },
                accepted: {
                  followRequests: state.followers.accepted.followRequests,
                  userIds: state.followers.accepted.userIds
                },
              },
    likes: { likedPostIds: state.likes.likedPostIds },
    session: { currentUser: state.session.currentUser },
    globalObject: { users: state.globalObject.users,
                    posts: state.globalObject.posts
                  }
  });
}, 1000));

export default store;
