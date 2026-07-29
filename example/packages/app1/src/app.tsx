import { lazy, Suspense, useState } from 'react';

import About from './pages/about';
import Home from './pages/home';

const RemotePage = lazy(() => import('app2/RemotePage'));
const UserProfile = lazy(() => import('app2/UserProfile'));
const SidebarWidget = lazy(() => import('app2/SidebarWidget'));

const ChartView = lazy(() => import('app3/ChartView'));
const TableView = lazy(() => import('app3/TableView'));
const KanbanBoard = lazy(() => import('app3/KanbanBoard'));
const NotificationBar = lazy(() => import('app3/NotificationBar'));

type Page = 'home' | 'about' | 'remotePage' | 'userProfile' | 'sidebarWidget' | 'chartView' | 'tableView' | 'kanbanBoard' | 'notificationBar';

const LABELS: Record<Page, string> = {
    home           : 'Home',
    about          : 'About',
    remotePage     : 'Remote Page (app2)',
    userProfile    : 'User Profile (app2)',
    sidebarWidget  : 'Sidebar Widget (app2)',
    chartView      : 'Chart View (app3)',
    tableView      : 'Table View (app3)',
    kanbanBoard    : 'Kanban Board (app3)',
    notificationBar: 'Notifications (app3)',
};

const navStyle: React.CSSProperties = {
    display     : 'flex',
    gap         : 16,
    padding     : 16,
    borderBottom: '1px solid #ccc',
    marginBottom: 24,
    flexWrap    : 'wrap',
};

const linkStyle = (isActive: boolean): React.CSSProperties => ({
    cursor        : 'pointer',
    fontWeight    : isActive ? 700 : 400,
    color         : isActive ? '#1677ff' : '#333',
    textDecoration: 'none',
    borderBottom  : isActive ? '2px solid #1677ff' : '2px solid transparent',
    paddingBottom : 4,
    fontSize      : 14,
});

const groupStyle: React.CSSProperties = {
    display: 'flex',
    gap    : 16,
};

function LazyPage({ children, }: { children: React.ReactNode; }) {
    return (
        <Suspense fallback={<div style={{ padding: 24, color: '#888', }}>Loading…</div>}>
            {children}
        </Suspense>
    );
}

const App = () => {
    const [page, setPage] = useState<Page>('home');

    const renderPage = () => {
        switch(page) {
            case 'home'            : { return <Home />;
            }
            case 'about'           : { return <About />;
            }
            case 'remotePage'      : { return <LazyPage><RemotePage /></LazyPage>;
            }
            case 'userProfile'     : { return <LazyPage><UserProfile /></LazyPage>;
            }
            case 'sidebarWidget'   : { return <LazyPage><SidebarWidget /></LazyPage>;
            }
            case 'chartView'       : { return <LazyPage><ChartView /></LazyPage>;
            }
            case 'tableView'       : { return <LazyPage><TableView /></LazyPage>;
            }
            case 'kanbanBoard'     : { return <LazyPage><KanbanBoard /></LazyPage>;
            }
            case 'notificationBar' : { return <LazyPage><NotificationBar /></LazyPage>;
            }
        }
    };

    return (
        <>
            <nav style={navStyle}>
                <span style={{ fontWeight: 700, color: '#666', fontSize: 13, alignSelf: 'center', }}>Static:</span>
                <div style={groupStyle}>
                    {(['home', 'about'] as Page[]).map((p) => (
                        <span
                            key={p}
                            style={linkStyle(page === p)}
                            onClick={() => { setPage(p); }}
                        >
                            {LABELS[p]}
                        </span>
                    ))}
                </div>
                <span style={{ fontWeight: 700, color: '#666', fontSize: 13, alignSelf: 'center', }}>app2:</span>
                <div style={groupStyle}>
                    {(['remotePage', 'userProfile', 'sidebarWidget'] as Page[]).map((p) => (
                        <span
                            key={p}
                            style={linkStyle(page === p)}
                            onClick={() => { setPage(p); }}
                        >
                            {LABELS[p]}
                        </span>
                    ))}
                </div>
                <span style={{ fontWeight: 700, color: '#666', fontSize: 13, alignSelf: 'center', }}>app3:</span>
                <div style={groupStyle}>
                    {(['chartView', 'tableView', 'kanbanBoard', 'notificationBar'] as Page[]).map((p) => (
                        <span
                            key={p}
                            style={linkStyle(page === p)}
                            onClick={() => { setPage(p); }}
                        >
                            {LABELS[p]}
                        </span>
                    ))}
                </div>
            </nav>
            <main style={{ padding: '0 16px', }}>
                {renderPage()}
            </main>
        </>
    );
};

export default App;
