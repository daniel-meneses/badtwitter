import React from 'react';
import { connect } from 'react-redux';
import ErrorMessage from '../../common/components/ErrorMessage/ErrorMessage';
import { selectAcceptedSubscriptionRequests } from '../../reducers/subscriptions';
import { Subscription } from '../../types/common';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import UserPreview from '../UserPreview/UserPreview';

type StoreProps = {
    acceptedSubscriptions: Subscription[];
}

const SubscriptionsList = ({ acceptedSubscriptions }: StoreProps) => (

    <div>
        { acceptedSubscriptions.length ?
            acceptedSubscriptions.map((req: Subscription, i: number) =>
                <UserPreview
                    key={req.id}
                    userId={req.subjectId}
                    topButtons={<SubscribeButton userId={req.subjectId} />}
                />
            )
            :
            <ErrorMessage text={'No subscriptions to display'} />
        }
    </div>
)


export default connect((state: RootState): StoreProps => ({
    acceptedSubscriptions: Object.values(selectAcceptedSubscriptionRequests(state))
}))(SubscriptionsList);