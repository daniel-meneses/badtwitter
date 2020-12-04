import React from "react"
import { connect } from 'react-redux'
import styles from './PostMini.mod.scss'
import UserInfo from '../UserInfo/UserInfo'
import moment from 'moment'
import LikeButton from '../LikeButton/LikeButton'
import { Post } from "../../types/common"
import { selectPostById } from '../../reducers/globalObjects';
import classNames from 'classnames';
import LinkPreview, { PreviewStyleTypes } from "../LinkPreview/LinkPreview"

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
    const { id: postId, likes, createdAt, post: message, userId, linkPreview } = post

    const timeStamp = moment(createdAt).format("MMM Do LT");

    const tagHtml = (str: string, url = '') => (
        <span key={Math.random()}>
            <a className={styles.tag} href={url ? url : `/explore/tags/${str.slice(1)}`} role='link' target={url ? "_blank" : "_self"}>
                {str + ' '}
            </a>
        </span>
    )

    const formantText = (message: string) => {
        let strArr: any = [''];
        let arr = message.split(/\s/g)
        arr.forEach((str: string, i: number) => {
            const isLast = arr.length === i + 1
            if (str.startsWith('#') || str.startsWith('http')) {
                strArr.push(`${str}${isLast ? '' : ' '}`)
                strArr.push('')
            } else {
                let last = strArr.length - 1
                strArr[last] = `${strArr[last]}${str}${isLast ? '' : ' '}`
            }
        })
        return strArr;
    }

    const formatJsx = (message: string) => {
        let arr = formantText(message)
        return arr.filter(Boolean).map((str: string, i: number) => {
            if (str.startsWith('#')) {
                return tagHtml(str)
            } else if (str.startsWith('http')) {
                let linkText = str.length > 40 ? str.slice(0, 40) + '...' : str
                return tagHtml(linkText, str)
            } else {
                return <React.Fragment key={Math.random()}>{str}</React.Fragment>
            }
        })
    }

    return (
        <div className={classNames(styles.userPost, className)}>
            <UserInfo userId={userId}>
                <div>
                    { formatJsx(message) }
                </div>
            </UserInfo>
            {
                linkPreview && 
                <LinkPreview 
                    type={PreviewStyleTypes.inPost}  
                    linkPreview={linkPreview} 
                    />
            }
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
