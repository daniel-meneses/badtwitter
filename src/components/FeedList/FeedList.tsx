import * as React from "react";
import ErrorMessage from "../../common/components/ErrorMessage/ErrorMessage";
import { FetchRequest } from "../../types/common";
import LoadingWrapper from "../LoadingWrapper/LoadingWrapper";
import UserPost from "../PostMini/UserPost";
import styles from './FeedList.mod.scss';

type Props = {
    timeline: number[],
    fetchState: FetchRequest;
}

const FeedList: React.FC<Props> = (props) => {

    const { fetchState, timeline = [] } = props;

    return (
        <LoadingWrapper {...fetchState}>
              {
                timeline.length
                  ? timeline.map((postId: number, i: number) => {
                    const isLastItem = timeline.length === i + 1
                    return (<UserPost
                      key={postId}
                      className={isLastItem ? styles.addMarginToLastListItem : ''}
                      postId={postId}
                    />)
                  })
                  : !fetchState.isFetching && <ErrorMessage text={'No posts to display'} />
              }
            </LoadingWrapper>
    )
}

export default React.memo(FeedList);