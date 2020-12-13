import { FetchRequest } from "../../types/common";

export interface IFeedList {
  timeline: number[];
  nextCursor: string | null;
  fetchState: FetchRequest;
  dispatch: AppThunkDispatch;
}

