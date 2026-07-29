import * as styles from './about.module.css';

export default function About() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>App3 — About</h1>
            <p className={styles.text}>
                This app showcases Module Federation 2.0 with diverse third-party dependencies to verify shared library resolution and chunk splitting.
            </p>
        </section>
    );
}
