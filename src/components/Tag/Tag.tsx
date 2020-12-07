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

const Tag: React.FC<Props> = ({ type, url }) => {

    const tagStyle = classNames(
        styles.tag,
        // @ts-ignore
        styles[type]
    )

    return (
        <a href={url || '#'} target="_blank" className={tagStyle}>
            <span>
                {`#${type}`}
            </span>
        </a>
    )
}
export default Tag;