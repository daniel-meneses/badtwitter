import React from 'react';
import classNames from 'classnames';
import styles from './Tag.mod.scss';

type Props = {
    type: string;
    url?: string;
}

export enum TagTypes {
    javascript = 'javascript',
    typescript = 'typescript',
    elixir = 'elixir',
    scss = 'scss',
    html = 'html',
    swift = 'swift',
    java = 'java'
}

const Tag = (props: Props) => {

    const { type, url } = props;

    const tagStyle = classNames(
        styles.tag,
        styles[type]
    )

    return (
        <a href={url || '#'} className={tagStyle}>
            <span>
                {`#${type}`}
            </span>
        </a>
    )
}
export default Tag;