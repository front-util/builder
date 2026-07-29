import * as styles from './home.module.css';

export default function Home() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>App3 — Home</h1>
            <p className={styles.text}>
                App3 is a remote application that exposes 4 components via Module Federation:
            </p>
            <ul className={styles.list}>
                <li className={styles.listItem}><strong>ChartView</strong> — uses date-fns + @example/utils</li>
                <li className={styles.listItem}><strong>TableView</strong> — uses @example/utils</li>
                <li className={styles.listItem}><strong>KanbanBoard</strong> — uses lodash-es + @example/utils</li>
                <li className={styles.listItem}><strong>NotificationBar</strong> — uses dayjs + @example/utils</li>
            </ul>
        </section>
    );
}
