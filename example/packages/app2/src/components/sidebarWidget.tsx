import { useState } from 'react';

import * as styles from './sidebarWidget.module.css';

interface Task {
    id  : number;
    text: string;
    done: boolean;
}

const INITIAL: Task[] = [
    { id: 1, text: 'Review PR #42', done: false, },
    { id: 2, text: 'Update MF config', done: true, },
    { id: 3, text: 'Write tests', done: false, }
];

export default function SidebarWidget() {
    const [tasks, setTasks] = useState(INITIAL);

    const toggle = (id: number) => {
        setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done, } : t));
    };

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Sidebar Widget (from App2)</h1>
            <ul className={styles.list}>
                {tasks.map((t) => (
                    <li key={t.id} className={styles.item}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={t.done}
                            onChange={() => { toggle(t.id); }}
                        />
                        <span className={t.done ? styles.done : styles.pending}>
                            {t.text}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
