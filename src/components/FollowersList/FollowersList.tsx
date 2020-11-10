import React from 'react';
import { connect } from 'react-redux';
import UserPreview from '../UserPreview/UserPreview';


type OwnProps = {
    isSubscriptions?: boolean;
}

type StoreProps = {
    acceptedSubscriptions: any;
}

type Props = OwnProps & StoreProps;

const mapState = (state: any, own: OwnProps) => {
    let { isSubscriptions = false } = own;
    if (isSubscriptions) {
        let { subscriptions } = state.subscriptions;
        let { byId, acceptedReqIds } = subscriptions;
        let acceptedSubscriptions = [...acceptedReqIds].map(id => byId[id]);
        return { acceptedSubscriptions };
    } else {
        let { followers } = state.followers;
        let { byId, accepted } = followers
        let acceptedSubscriptions = [...accepted].map(id => byId[id]);
        return { acceptedSubscriptions };
    }
}

const FollowersList = (props: Props) => {

    const { acceptedSubscriptions, isSubscriptions } = props;

    let userIdKey = isSubscriptions ? 'subject_id' : 'user_id'
            
    return (
        <div>
        {
            acceptedSubscriptions.length ? 
            Object.values(acceptedSubscriptions).map( (req: any, i: number) =>
            <UserPreview
                key={req.id}
                userId={req[userIdKey]}
                isFollowRequest={false}
            />
             )
            :
            <div>{'EmptyList'}</div>
        }
        </div>
    )
}

export default connect(mapState, {})(FollowersList);