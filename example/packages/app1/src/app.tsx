import { lazy, Suspense, useState } from 'react';

import About from './pages/about';
import Home from './pages/home';

const RemotePage = lazy(() => import('app2/RemotePage'));

type Page = 'home' | 'about' | 'remote';

const LABELS: Record<Page, string> = {
    home  : 'Home',
    about : 'About',
    remote: 'Remote Page',
};

const PAGES: Page[] = ['home', 'about', 'remote'];

const navStyle: React.CSSProperties = {
    display     : 'flex',
    gap         : 16,
    padding     : 16,
    borderBottom: '1px solid #ccc',
    marginBottom: 24,
};

const linkStyle = (isActive: boolean): React.CSSProperties => ({
    cursor        : 'pointer',
    fontWeight    : isActive ? 700 : 400,
    color         : isActive ? '#1677ff' : '#333',
    textDecoration: 'none',
    borderBottom  : isActive ? '2px solid #1677ff' : '2px solid transparent',
    paddingBottom : 4,
});

const App = () => {
    const [page, setPage] = useState<Page>('home');

    const renderPage = () => {
        switch(page) {
            case 'home': { return <Home />; }
            case 'about': { return <About />; }
            case 'remote': {
                return (
                    <Suspense fallback={<div>Loading remote page...</div>}>
                        <RemotePage />
                    </Suspense>
                );
            }
        }
    };

    return (
        <>
            <nav style={navStyle}>
                {PAGES.map((p) => (
                    <span
                        key={p}
                        style={linkStyle(page === p)}
                        onClick={() => { setPage(p); }}
                    >
                        {LABELS[p]}
                    </span>
                ))}
            </nav>
            <main style={{ padding: '0 16px', }}>
                {renderPage()}
            </main>
        </>
    );
};

export default App;
