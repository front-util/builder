import * as styles from './remotePage.module.css';

export default function RemotePage() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Remote Page (from App2)</h1>
            <p className={styles.text}>
                This component is exposed via Module Federation and rendered inside the host application (app1).
            </p>
            <p className={styles.text}>
                It lives in <code className={styles.code}>app2/src/components/remotePage.tsx</code> and is bundled independently.
            </p>
        </section>
    );
}
