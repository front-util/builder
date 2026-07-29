import { truncate } from '@example/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

import * as styles from './notificationBar.module.css';

const NOTIFICATIONS = [
    { id: 1, text: 'Deployment completed successfully for v2.5.1', ts: '2026-07-01T10:30:00Z', },
    { id: 2, text: 'New pull request #342: Update Module Federation config', ts: '2026-07-01T09:15:00Z', },
    { id: 3, text: 'Build failed on main — test suite error in ChartView component', ts: '2026-06-30T22:45:00Z', }
];

export default function NotificationBar() {
    dayjs.extend(relativeTime);
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Notifications (from App3)</h1>
            <ul className={styles.list}>
                {NOTIFICATIONS.map((n) => (
                    <li key={n.id} className={styles.item}>
                        <div className={styles.message}>{truncate(n.text, 60)}</div>
                        <div className={styles.time}>{dayjs(n.ts).fromNow()}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
