export function formatDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('ru-RU', {
        day  : 'numeric',
        month: 'long',
        year : 'numeric',
    });
}

export function capitalize(str) {
    if(!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
}

export function truncate(str, maxLength) {
    if(str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '…';
}

export function randomId() {
    return Math.random().toString(36).slice(2, 9);
}
