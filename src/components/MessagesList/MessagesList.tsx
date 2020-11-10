
import React from 'react';
import { connect } from 'react-redux';
import UserPreview from '../UserPreview/UserPreview';

type Props = {
    pendingFollowRequests: any,
}

const mapState = (state: any, ownProps: any) => {

    let { followers } = state.followers
    let { byId, pending } = followers
    let pendingFollowRequests = [...pending].map(id => byId[id])
    
    return {
        pendingFollowRequests,
    }
}


const MessagesList = (props: Props) => {

    const { pendingFollowRequests } = props;

    return (
        <div>
            {
            Object.values(pendingFollowRequests).map( (req: any, i: number) =>
            <UserPreview
                key={req.id}
                userId={req.user_id}
                isFollowRequest={true}
            />
             )}
        </div>
    )
}

export default connect(mapState, {})(MessagesList);