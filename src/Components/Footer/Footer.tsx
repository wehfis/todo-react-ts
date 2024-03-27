import React from 'react';
import styles from './styles/Footer.module.css';

type FooterProps = {
    comments: string[];
};

function Footer(props: FooterProps) {
    return (
        <div className={styles.footer}>
            {props.comments.map((comment) => (
                <p className={styles.footer_text}>{comment}</p>
            ))}
        </div>
    );
}

export default React.memo(Footer);
