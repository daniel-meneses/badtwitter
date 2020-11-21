
import React from 'react';
import { connect } from 'react-redux';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import { selectPendingFollowRequests } from '../../reducers/followers';
import { Follower } from '../../types/common';
import UserPreview from '../UserPreview/UserPreview';
import FollowRequestButtons from './FollowRequestButtons';

type StoreProps = {
    pendingFollowRequests: Follower[],
}

const MessagesList: React.FC<StoreProps> = ({ pendingFollowRequests }) => {

    return (
        <div>
            {
            pendingFollowRequests.length ? 
            pendingFollowRequests.map( (req: any, i: number) =>
                <UserPreview
                    key={req.id}
                    userId={req.userId}
                    topButtons={ <FollowRequestButtons userId={req.userId} /> }
                />)
                :
                <ErrorMessage text={'No messages'} />
            }
        </div>
    )
}

export default connect((state: RootState): StoreProps => ({
    pendingFollowRequests: Object.values(selectPendingFollowRequests(state))
}))(MessagesList);