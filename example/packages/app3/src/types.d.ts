/// <reference types="react" />
/// <reference types="react-dom" />

declare module '@example/utils' {
    export function formatDate(date: Date | string): string;
    export function capitalize(str: string): string;
    export function pluralize(count: number, singular: string, plural: string): string;
    export function truncate(str: string, maxLength: number): string;
    export function randomId(): string;
}
