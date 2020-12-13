import React from "react";
import { connect } from "react-redux";
import { getExploreContentWithTag } from "../../actions/explore";
import { selectTagFeedByName } from "../../reducers/feeds";
import { useScrollCallback } from "../../utils/hooks/useScrollHooks";
import FeedList from "../FeedList/FeedList";
import { IFeedList } from "./types";

interface TagList extends IFeedList {
  tagId: string;
}

const TagFeed: React.FC<TagList> = ({ tagId, nextCursor, dispatch, ...restProps }) => {
  const { fetchState } = restProps;
  React.useEffect(() => {dispatch(getExploreContentWithTag(tagId))},[])
  useScrollCallback((scrollPercent: number) => {
    const shouldFetch = scrollPercent > 60 && nextCursor && !fetchState.isFetching
    shouldFetch && dispatch(getExploreContentWithTag(tagId, nextCursor!))
  });
  return (<FeedList {...restProps} />);
}

export default connect((state: RootState, ownProps: any) => {
  const tagId = ownProps.match.params.tagId;
  const { timeline, nextCursor } = selectTagFeedByName(state, tagId) || {};
  return {
    tagId,
    timeline,
    nextCursor,
    fetchState: state.feeds.getTagFeedRequest,
  }
})(TagFeed);