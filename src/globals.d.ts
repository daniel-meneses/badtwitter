import "@testing-library/jest-dom/extend-expect";
import { Action, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import rootReducer from './reducers/main'
import { Dispatch } from 'redux';

declare global {
  interface Window { __INITIAL_STATE_: any; }
  type RootState = ReturnType<typeof rootReducer>
  type AppThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        RootState,
        unknown,
        AnyAction
        >
  type AppThunkDispatch<ReturnType = void> = ThunkDispatch<RootState, ReturnType, AnyAction>
  namespace Express {
    interface Request {
      dbStoryPreviews: Collection
    }
  }
}
