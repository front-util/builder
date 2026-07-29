import * as styles from './about.module.css';

export default function About() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>App1 — About</h1>
            <p className={styles.text}>
                This is a Module Federation example using <code>@front-utils/builder</code> and <code>@module-federation/enhanced</code>.
            </p>
            <ul className={styles.list}>
                <li className={styles.listItem}><strong>app1</strong> — host (port 3000)</li>
                <li className={styles.listItem}><strong>app2</strong> — remote (port 3001)</li>
                <li className={styles.listItem}><strong>app3</strong> — remote (port 3002)</li>
                <li className={styles.listItem}><strong>configs</strong> — shared build configuration</li>
            </ul>
        </section>
    );
}
