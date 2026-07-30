import * as styles from './home.module.css';

export default function Home() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>App2 — Home</h1>
            <p className={styles.text}>
                This is the remote application (app2). It can run standalone or be consumed by a host via Module Federation.
            </p>
        </section>
    );
}
