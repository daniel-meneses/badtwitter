import React from 'react';
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
import BadTwitterLogo from '../../common/components/SvgLib/BadTwitterLogo';

const About = () => {

    let frontEndTags = [TagTypes.javascript, TagTypes.typescript, TagTypes.html, TagTypes.scss]
    let backendTags = [TagTypes.elixir]

    return (
        <div className={styles.container}>
            <BadTwitterLogo className={styles.logoIcon} />
            <div className={styles.aboutDescription}>
                Welcome to Bad Twitter! It's like twitter, but <span style={{ color: 'green', fontSize: '24px', fontWeight: 'bolder', fontFamily: 'cursive' }}>green</span>.
            </div>
            <div className={styles.techStack}>
                <h3>Frontend</h3>
                <ul>
                    <li>
                        Built using React JS
                    </li>
                    <li>
                        Redux state management using react-redux, reselect, and redux-Thunk
                    </li>
                    <li>
                        Express http proxying
                    </li>
                    <li>
                        Webpack server and client builds
                    </li>
                    <li>
                        Integration tests using jest and testing library
                    </li>
                    <li>
                        UI tests using cypress
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
                        frontEndTags.map((tagName: string, i: number) => <Tag key={i} type={tagName} url={'https://github.com/daniel-meneses/badtwitter'} />)
                    }
                </div>
            </div>
            <div className={styles.techStack}>
                <h3>Backend</h3>
                <ul>
                    <li>
                        Phoenix framework API
                    </li>
                    <li>
                        Guardian session based authentication
                    </li>
                    <li>
                        PostgreSQL database
                    </li>
                    <li>
                        Model view controller design pattern
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
                        backendTags.map((tagName: string, i: number) => <Tag key={i} type={tagName} url={'https://github.com/daniel-meneses/guardian-auth'}/>)
                    }
                </div>
                <div className={styles.footer}>
                    <a target="_blank" href='https://www.linkedin.com/in/daniel-meneses-802a5a1a4'>
                        <GitHubIcon className={styles.gitHubIcon} />
                    </a>
                    <a target="_blank" href='https://github.com/daniel-meneses/'>
                        <LinkedInIcon className={styles.linkedInIcon} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About;