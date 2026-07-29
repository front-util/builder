import { pluralize } from '@example/utils';
import chunk from 'lodash-es/chunk';

import * as styles from './kanbanBoard.module.css';

const ITEMS = ['Design', 'Dev', 'Review', 'Test', 'Deploy', 'Docs', 'Metrics', 'Logs'];

const COLUMNS = chunk(ITEMS, 3);

export default function KanbanBoard() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Kanban Board (from App3)</h1>
            <p className={styles.meta}>
                {ITEMS.length} {pluralize(ITEMS.length, 'item', 'items')} across {COLUMNS.length} columns
            </p>
            <div className={styles.columns}>
                {COLUMNS.map((col, i) => (
                    <div key={i} className={styles.column}>
                        <h3 className={styles.columnTitle}>Column {i + 1}</h3>
                        {col.map((item) => (
                            <div key={item} className={styles.card}>
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
