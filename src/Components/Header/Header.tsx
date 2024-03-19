import styles from './styles/Header.module.css'

type HeaderProps = {
    header: string,
    comment?: string
}

export default function Header(props: HeaderProps) {
    return (
        <>
            <div className={styles.header_container}>
                <h1 className={styles.header_text}>{props.header}</h1>
                { props?.comment &&
                    <p className={styles.sub_header_text}>{props?.comment}</p>
                }
            </div>
        </>
    )
}
