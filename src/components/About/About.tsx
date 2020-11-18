import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './About.mod.scss';
import LinkedInIcon from '../../common/components/SvgLib/LinkedInIcon';
import GitHubIcon from '../../common/components/SvgLib/GitHubIcon';
import ReactLogo from '../../common/components/SvgLib/ReactLogo';
import PhoenixFrameworkLogo from '../../common/components/SvgLib/PhoenixFrameworkLogo';
import ReactReduxLogo from '../../common/components/SvgLib/ReactReduxLogo';
import PostgresqlLogo from '../../common/components/SvgLib/PostgresqlLogo';
import NodeLogo from '../../common/components/SvgLib/NodeLogo';
import WebpackLogo from '../../common/components/SvgLib/WebpackLogo';
import Tag, { TagTypes } from '../Tag/Tag';
import { application } from 'express';

const About = () => {

    let frontEndTags = [TagTypes.javascript, TagTypes.typescript, TagTypes.html, TagTypes.scss]
    let backendTags = [TagTypes.elixir]

    return (
        <div className={styles.container}>
            <Avatar
                className={styles.avatar}
                image={'https://s3.ap-southeast-2.amazonaws.com/images-03/5a17d6f0-5311-42da-aecf-d83580b3fc64'}
            />
            <div className={styles.aboutDescription}>
                Welcome to Bad Twitter! It's like twitter, but <span style={{ color: 'green', fontStyle: 'italic' }}>green</span>.
            </div>
            <div className={styles.techStack}>
                <h3>Frontend</h3>
                <ul>
                    <li>
                        React JS Framework using reusable / modular design pattern.
                    </li>
                    <li>
                        Redux single store data architecture
                    </li>
                    <li>
                        Express server rendering and http proxying
                    </li>
                    <li>
                        Webpack build and performance improvements
                    </li>
                    <li>
                        CSS modules
                    </li>
                    <li>
                        Unit tests using react testing library and jest-dom
                    </li>
                    <li>
                        UI tests using Cypress
                    </li>
                </ul>
                <h4>Tech Stack</h4>
                <div className={styles.tags}>
                    <a target="_blank" href='https://nodejs.org/en'>
                        <NodeLogo className={styles.linkedInIcon} />
                    </a>
                    <a target="_blank" href='https://reactjs.org'>
                        <ReactLogo className={styles.linkedInIcon} />
                    </a>
                    <a target="_blank" href='https://react-redux.js.org'>
                        <ReactReduxLogo className={styles.gitHubIcon} />
                    </a>
                    <a target="_blank" href='https://webpack.js.org'>
                        <WebpackLogo className={styles.gitHubIcon} />
                    </a>
                </div>
                <div className={styles.tags}>
                    {
                        frontEndTags.map((tagName: string, i: number) => <Tag key={i} type={tagName} />)
                    }
                </div>
            </div>
            <div className={styles.techStack}>
                <h3>Backend</h3>
                <ul>
                    <li>
                        Phoenix framework serving as backend API.
                    </li>
                    <li>
                        Guardian session based authentication.
                    </li>
                    <li>
                        PostgreSQL database
                    </li>
                    <li>
                        Model view controller design pattern.
                    </li>
                </ul>
                <div>
                    <h4>Tech Stack</h4>
                    <div className={styles.tags}>
                        <a target="_blank" href='https://www.phoenixframework.org'>
                            <PhoenixFrameworkLogo className={styles.linkedInIcon} />
                        </a>
                        <a target="_blank" href='https://www.postgresql.org'>
                            <PostgresqlLogo className={styles.gitHubIcon} />
                        </a>
                    </div>
                </div>
                <div className={styles.tags}>
                    {
                        backendTags.map((tagName: string, i: number) => <Tag key={i} type={tagName} />)
                    }
                </div>
                <div className={styles.nameAndSubheader}>
                    <a target="_blank" href='https://github.com/daniel-meneses/badtwitter'>
                        <GitHubIcon className={styles.linkedInIcon} />
                    </a>
                    <a target="_blank" href='https://www.linkedin.com/in/daniel-meneses-802a5a1a4/'>
                        <LinkedInIcon className={styles.linkedInIcon} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;