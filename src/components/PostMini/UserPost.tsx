import React from "react"
import { connect } from 'react-redux'
import styles from './PostMini.mod.scss'
import UserInfo from '../UserInfo/UserInfo'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'
import { Post } from "../../types/common"
import { selectPostById } from '../../reducers/globalObjects';
import classNames from 'classnames';
import { random } from "lodash"

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
    const { id: postId, likes, createdAt, post: message, userId } = post

    const timeStamp = moment(createdAt).format("MMM Do LT");

    const tagHtml = (str: string) => (<span key={Math.random()}>
        <a className={styles.tag} href={`/explore/tags/${str.slice(1)}`} role='link' target="_self">
            {str + ' '}
        </a>
    </span>)

    const formantText = (message: string) => {
        let strArr: any = [''];
        let arr = message.split(' ')
        arr.forEach((str: string, i: number) => {
            const isLast = arr.length === i + 1
            if (!str.startsWith('#')) {
                let last = strArr.length - 1
                strArr[last] = `${strArr[last]}${str}${isLast ? '' : ' '}`
            } else {
                strArr.push(`${str}${isLast ? '' : ' '}`)
                strArr.push('')
            }
        })
        return strArr;
    }

    const formatJsx = (message: string) => {
        let arr = formantText(message)
        return arr.filter(Boolean).map((str: string, i: number) => {
            if (!str.startsWith('#')) {
                return <React.Fragment key={Math.random()}>{str}</React.Fragment>
            } else {
                return tagHtml(str)
            }
        })
    }
    

    return (
        <div className={classNames(styles.userPost, className)}>
            <UserInfo userId={userId}>
                <div>
                    {formatJsx(message)}
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
