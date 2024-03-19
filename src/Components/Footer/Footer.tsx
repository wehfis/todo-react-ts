import styles from './styles/Footer.module.css'

type FooterProps = {
    comments: string[]
} 

export default function Footer(props: FooterProps) {
    return (
        <div className={styles.footer}>
            {props.comments.map((comment) => (
                <p className={styles.footer_text}>{comment}</p>
            ))}
        </div>
    );
}
