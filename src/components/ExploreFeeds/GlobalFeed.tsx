import React from "react";
import { connect } from "react-redux";
import { getGlobalFeed } from "../../actions/feed";
import { selectGlobalFeed } from "../../reducers/feeds";
import { useScrollCallback } from "../../utils/hooks/useScrollHooks";
import FeedList from "../FeedList/FeedList";
import { IFeedList } from "./types";


const GlobalFeed: React.FC<IFeedList> = ({ nextCursor, dispatch, ...restProps }) => {
  const { fetchState } = restProps;
  
  React.useEffect(() => {
    !fetchState.didSucceed && dispatch(getGlobalFeed())
  },[])
  useScrollCallback((scrollPercent: number) => {
    const shouldFetch = scrollPercent > 60 && nextCursor && !fetchState.isFetching
    shouldFetch && dispatch(getGlobalFeed(nextCursor!))
  });
  return (<FeedList {...restProps} />)
};

export default connect((state: RootState) => {
  let { timeline, nextCursor } = selectGlobalFeed(state);
  let fetchState = state.feeds.getGlobalFeedRequest;
  return {
    timeline,
    fetchState,
    nextCursor
  }
})(GlobalFeed);