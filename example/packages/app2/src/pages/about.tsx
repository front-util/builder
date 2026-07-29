import * as styles from './about.module.css';

export default function About() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>App2 — About</h1>
            <p className={styles.text}>
                This app exposes the <strong>RemotePage</strong>, <strong>UserProfile</strong>, and <strong>SidebarWidget</strong> components via Module Federation Enhanced.
            </p>
        </section>
    );
}
