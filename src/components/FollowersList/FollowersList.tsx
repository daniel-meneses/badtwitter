import React from 'react';
import { connect } from 'react-redux';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import { selectAcceptedFollowers } from '../../reducers/subscriptions';
import { Subscription } from '../../types/common';
import UserPreview from '../UserPreview/UserPreview';

type StoreProps = {
    acceptedFollowers: Subscription[];
}

const FollowersList: React.FC<StoreProps> = ({ acceptedFollowers }) => {

    return (
        <div>
        {
            acceptedFollowers.length ? 
            acceptedFollowers.map( (req: Subscription, i: number) =>
            <UserPreview
                key={req.id}
                userId={req.userId}
            />
             )
            :
            <ErrorMessage text={'No followers to display'} />
        }
        </div>
    )
}

export default connect((state: RootState): StoreProps => ({ 
    acceptedFollowers: Object.values(selectAcceptedFollowers(state)) 
}))(FollowersList);