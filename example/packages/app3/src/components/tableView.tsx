import { capitalize } from '@example/utils';

import * as styles from './tableView.module.css';

const ROWS = [
    { id: 1, name: 'Alpha', status: 'active', role: 'admin', },
    { id: 2, name: 'Beta', status: 'inactive', role: 'user', },
    { id: 3, name: 'Gamma', status: 'active', role: 'editor', },
    { id: 4, name: 'Delta', status: 'pending', role: 'user', }
];

export default function TableView() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Table View (from App3)</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerCell}>ID</th>
                        <th className={styles.headerCell}>Name</th>
                        <th className={styles.headerCell}>Status</th>
                        <th className={styles.headerCell}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {ROWS.map((row) => (
                        <tr key={row.id} className={styles.row}>
                            <td className={styles.cell}>{row.id}</td>
                            <td className={styles.cell}>{capitalize(row.name)}</td>
                            <td className={styles.cell}>{capitalize(row.status)}</td>
                            <td className={styles.cell}>{capitalize(row.role)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
