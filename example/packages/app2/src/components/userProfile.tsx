import { capitalize } from '@example/utils';

import * as styles from './userProfile.module.css';

interface User {
    name : string;
    role : string;
    email: string;
}

const MOCK_USER: User = {
    name : 'ivan petrov',
    role : 'senior engineer',
    email: 'ivan.petrov@example.com',
};

export default function UserProfile() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>User Profile (from App2)</h1>
            <div className={styles.avatar}>
                {MOCK_USER.name.charAt(0).toUpperCase()}
            </div>
            <p className={styles.field}>
                <span className={styles.fieldLabel}>Name:</span> {capitalize(MOCK_USER.name)}
            </p>
            <p className={styles.field}>
                <span className={styles.fieldLabel}>Role:</span> {capitalize(MOCK_USER.role)}
            </p>
            <p className={styles.field}>
                <span className={styles.fieldLabel}>Email:</span> {MOCK_USER.email}
            </p>
        </section>
    );
}
