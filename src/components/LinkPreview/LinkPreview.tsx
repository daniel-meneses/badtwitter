import classNames from 'classnames';
import React from 'react';
import CloseXIcon from '../../common/components/SvgLib/CloseXIcon';
import LinkIcon from '../../common/components/SvgLib/LinkIcon';
import { LinkPreview } from '../../types/common';
import styles from './LinkPreview.mod.scss';

type Props = {
    linkPreview: LinkPreview;
    type: PreviewStyleTypes;
    className?: string;
    onDismissClick?: () => void;
}

export enum PreviewStyleTypes {
    inForm = 'inForm',
    inPost = 'inPost',
}

const LinkPreview: React.FC<Props> = (props) => {

    const { className, linkPreview, type, onDismissClick } = props;
    const { title, image, url } = linkPreview;
    const isEditing = type === PreviewStyleTypes.inForm;

    const containerStyle = classNames(
        className,
        styles.container,
        //@ts-expect-error
        [styles[`container-${type}`]]
    );

    const imageStyle = classNames(
        className,
        styles.linkImage,
        //@ts-expect-error
        [styles[`linkImage-${type}`]]
    );

    const getHostFromURL = (url: string) =>
        url.split('/').filter(str => str.includes('.'))[0];

    return (
        <a href={isEditing ? '#' : url}
            target={isEditing ? "_self" : "_blank"}
            className={containerStyle}>
            { (isEditing && onDismissClick) &&
                <CloseXIcon
                    className={styles.closeIcon}
                    onClick={onDismissClick}
                    />
            }
            {   image &&
                <img className={imageStyle} src={image} />
            }
            <div className={styles.linkTitle}>
                <span>{title}</span>
                <span className={styles.linkDomain}>
                    <LinkIcon className={styles.linkIcon} />
                    {getHostFromURL(url)}
                </span>
            </div>
        </a>
    )
}

export default LinkPreview;