/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'app2/RemotePage' {
    const RemotePage: () => JSX.Element;
    export default RemotePage;
}

declare module 'app2/UserProfile' {
    const UserProfile: () => JSX.Element;
    export default UserProfile;
}

declare module 'app2/SidebarWidget' {
    const SidebarWidget: () => JSX.Element;
    export default SidebarWidget;
}

declare module 'app3/ChartView' {
    const ChartView: () => JSX.Element;
    export default ChartView;
}

declare module 'app3/TableView' {
    const TableView: () => JSX.Element;
    export default TableView;
}

declare module 'app3/KanbanBoard' {
    const KanbanBoard: () => JSX.Element;
    export default KanbanBoard;
}

declare module 'app3/NotificationBar' {
    const NotificationBar: () => JSX.Element;
    export default NotificationBar;
}

declare module '@example/utils' {
    export function formatDate(date: Date | string): string;
    export function capitalize(str: string): string;
    export function pluralize(count: number, singular: string, plural: string): string;
    export function truncate(str: string, maxLength: number): string;
    export function randomId(): string;
}
