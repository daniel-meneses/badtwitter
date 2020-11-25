import React from "react"
import { connect } from 'react-redux'
import styles from './PostMini.mod.scss'
import UserInfo from '../UserInfo/UserInfo'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'
import { Post } from "../../types/common"
import { selectPostById } from '../../reducers/posts';
import classNames from 'classnames';

type OwnProps = {
    postId: number;
    className?: string;
}

type StoreProps = {
    post: Post;
}

type Props = OwnProps & StoreProps

const UserPost: React.FC<Props> = (props) => {

    const { post, className } = props;
    const { id: postId, likes, created, post: message, userId } = post

    const timeStamp = moment(created).format("MMM Do LT");

    const tagHtml = (str: string) => (<span>
        <a className={styles.tag} href={`/explore/tags/${str.slice(1)}`} role='link' target="_self">
            {str + ' '}
        </a>
    </span>)

    const formatTag = (str: string) => str.startsWith('#')
        ? tagHtml(str)
        : str + ' ';

    const formatPostMessage = (message: string = "") =>
        message.split(' ').map(word => formatTag(word));

    return (
        <div className={classNames(styles.userPost, className)}>
            <UserInfo userId={userId}>
                <div>
                    {formatPostMessage(message)}
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
