
import React from 'react';
import { connect } from 'react-redux';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import { selectPendingFollowers } from '../../reducers/subscriptions';
import { Subscription } from '../../types/common';
import UserPreview from '../UserPreview/UserPreview';
import FollowRequestButtons from './FollowRequestButtons';

type StoreProps = {
    pendingFollowRequests: Subscription[],
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
    pendingFollowRequests: Object.values(selectPendingFollowers(state))
}))(MessagesList);