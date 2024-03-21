import styles from './styles/Aside.module.css';

type AsideProps = {};

export default function Aside(props: AsideProps) {
    return (
        <>
            <div className={styles.aside_container}>
                <h2>Dojo</h2>
                <p>Example</p>
                <a href="#">Source</a>
                <hr></hr>
                <div>
                    <p>
                        Dojo saves you time and scales with your development
                        process, using web standards as its platform. It’s the
                        toolkit experienced developers turn to for building high
                        quality desktop and mobile web applications.
                    </p>
                </div>
                <a href="#">Dojo</a>
                <hr></hr>
                <h3>Official Resources</h3>
                <ul>
                    <li>
                        <a href="#">Documentation</a>
                    </li>
                    <li>
                        <a href="#">Getting started guide</a>
                    </li>
                    <li>
                        <a href="#">API reference</a>
                    </li>
                    <li>
                        <a href="#">Blog</a>
                    </li>
                </ul>
                <h3>Articles and Guides</h3>
                <ul>
                    <li>
                        <a href="#">Getting StartED with Dojo</a>
                    </li>
                </ul>
                <h3>Community</h3>
                <ul>
                    <li>
                        <a href="#">Dojo/MVC on Stack Overflow</a>
                    </li>
                    <li>
                        <a href="#">Mailing list</a>
                    </li>
                    <li>
                        <a href="#">Dojo on Twitter</a>
                    </li>
                </ul>
                <hr></hr>
                <p>
                    If you have other helpful links to share, or find any of the
                    links above no longer work, please{' '}
                    <a href="#">let us know</a>.
                </p>
            </div>
        </>
    );
}
