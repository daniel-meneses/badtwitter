import React from "react"
import { connect } from 'react-redux'
import styles from './PostMini.mod.scss'
import UserInfo from '../UserInfo/UserInfo'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'
import { Post } from "../../types/common"
import { selectPostById } from '../../reducers/posts';

type OwnProps = {
    postId: number;
    className?: string;
}

type StoreProps = {
    post: Post;
}

type Props = OwnProps & StoreProps

const UserPost: React.FC<Props> = (props) => {

    const { post } = props;
    const { id: postId, likes, created, post: message, userId } = post

    const timeStamp = moment(created).format("MMM Do LT");

    return (
        <div className={styles.userPost}>
            <UserInfo userId={userId}>
                <div>
                {message}
                    </div>
            </UserInfo>
            <div className={styles.userPostFooter}>
                <div className={styles.footerIconWithCount}>
                    <LikeButton className={styles.footerIcon} postId={postId} />
                    {likes && <div>{likes}</div>}
                </div>
                <div className={styles.footerTimestamp}>
                    {timeStamp}
                </div>
            </div>
        </div>
    )
}

export default connect((state: RootState, { postId }: OwnProps) => ({ 
    post: selectPostById(state, postId) 
}))(UserPost)
