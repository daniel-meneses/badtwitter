import React from 'react';
import { connect } from 'react-redux';
import { acceptFollowerRequest, followRequestPayload, rejectFollowerRequest } from '../../actions/followers';
import Button, { BtnThemes } from '../../common/components/Button/Button';
import styles from '../UserPreview/UserPreview.mod.scss';

type FollowReqButtonProps = {
    userId: number,
    acceptFollowerRequest?: (payload: followRequestPayload) => void;
    rejectFollowerRequest?: (payload: followRequestPayload) => void;
}

const FollowRequestButtons: React.FC<FollowReqButtonProps> = 
    ({ userId, acceptFollowerRequest, rejectFollowerRequest }) => (

    <div className={styles.userPreviewButtons}>
      <Button
        className={styles.previewButton}
        theme={BtnThemes.PrimaryFill}
        onClick={() => acceptFollowerRequest && acceptFollowerRequest({accepted : true, id: userId})}
        >
        Accept
      </Button>
      <Button
        className={styles.previewButton}
        theme={BtnThemes.RedOutline}
        onClick={() => rejectFollowerRequest && rejectFollowerRequest({accepted : false, id: userId})}
        >
        Reject
      </Button>
    </div>
)

export default connect(null, { acceptFollowerRequest, rejectFollowerRequest })(FollowRequestButtons);