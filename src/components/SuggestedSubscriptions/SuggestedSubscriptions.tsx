import * as React from 'react';
import { connect } from 'react-redux';
import { getGlobalFeed } from '../../actions/feed';
import { selectUsers } from '../../reducers/globalObjects';
import { selectCurrenUserId } from '../../reducers/session';
import { selectAcceptedSubscriptionUserIds } from '../../reducers/subscriptions';
import { UserMap } from '../../types/common';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import UserPreview from '../UserPreview/UserPreview';
import styles from './SuggestedSubscriptions.mod.scss';

type Props = {
    users: UserMap;
    currentUserId: number | null;
    acceptedSubscriptions: number[];
    dispatch: AppThunkDispatch;
}

const mapProps = (state: RootState) => ({
    users: selectUsers(state),
    currentUserId: selectCurrenUserId(state),
    acceptedSubscriptions: selectAcceptedSubscriptionUserIds(state)
})

const Suggested: React.FC<Props> = ({ users, currentUserId, acceptedSubscriptions, dispatch }) => {

    React.useEffect( () => {
        dispatch(getGlobalFeed())
    }, [])
    
    return (
        <div>
            <h3 className={styles.header}>Who to follow</h3>
        {
            Object.values(users).slice(0, 5).map( u => {
                const isSubscribed = acceptedSubscriptions.includes(u.id)
                const isCurrentUser = u.id === currentUserId
                return !isSubscribed && !isCurrentUser && 
                <UserPreview 
                   key={u.id}
                    userId={u.id}
                    topButtons={<SubscribeButton userId={u.id} />}
                />
            })
        }
        </div>
    );
}

const connectedComponent = connect(mapProps)(Suggested);

export default React.memo(connectedComponent);
