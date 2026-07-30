import { randomId } from '@example/utils';
import { format, parseISO } from 'date-fns';

import * as styles from './chartView.module.css';

const DATA = [
    { label: 'Jan', value: 30, },
    { label: 'Feb', value: 45, },
    { label: 'Mar', value: 38, },
    { label: 'Apr', value: 55, },
    { label: 'May', value: 48, },
    { label: 'Jun', value: 62, }
];

export default function ChartView() {
    const id = randomId();
    const now = format(parseISO('2026-07-01'), 'MMMM yyyy');

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Chart View (from App3)</h1>
            <p className={styles.meta}>Generated: {now} | instance: {id}</p>
            <div className={styles.chart}>
                {DATA.map((d) => (
                    <div key={d.label} className={styles.bar}>
                        <div
                            className={styles.barFill}
                            style={{ height: d.value * 2, }}
                        />
                        <div className={styles.barLabel}>{d.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
