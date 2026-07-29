import * as styles from './home.module.css';

export default function Home() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>App1 — Home</h1>
            <p className={styles.text}>
                This is the host application. It consumes a remote component from app2 via Module Federation Enhanced.
            </p>
            <p className={styles.text}>
                Click <span className={styles.highlight}>Remote Page</span> in the navigation to load content from the remote app.
            </p>
        </section>
    );
}
