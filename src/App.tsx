import { useMemo, useState } from 'react';
import { Button } from './components/Button';
import { LogPage } from './pages/LogPage';
import { MainPage } from './pages/MainPage';
import { ModelPage } from './pages/ModelPage';
import type { PageKey } from './types/page';

export function App() {
  const [activePage, setActivePage] = useState<PageKey>('main');

  const pageTitle = useMemo(() => {
    if (activePage === 'model') return 'Model';
    if (activePage === 'log') return 'Log';
    return 'Main';
  }, [activePage]);

  return (
    <main className="app-shell">
      <aside className="left-sidebar">
        <header className="brand">HAN JOO LIGHT METAL</header>
        <nav className="left-nav">
          <Button
            className={`nav-item ${activePage === 'main' ? 'nav-item--active' : ''}`}
            variant={activePage === 'main' ? 'primary' : 'ghost'}
            fullWidth
            onClick={() => setActivePage('main')}
          >
            Main
          </Button>
          <Button
            className={`nav-item ${activePage === 'model' ? 'nav-item--active' : ''}`}
            variant={activePage === 'model' ? 'primary' : 'ghost'}
            fullWidth
            onClick={() => setActivePage('model')}
          >
            Model
          </Button>
          <Button
            className={`nav-item ${activePage === 'log' ? 'nav-item--active' : ''}`}
            variant={activePage === 'log' ? 'primary' : 'ghost'}
            fullWidth
            onClick={() => setActivePage('log')}
          >
            Log
          </Button>
        </nav>
      </aside>

      <section className="workspace">
        <header className="workspace-header">{pageTitle}</header>
        {activePage === 'main' && <MainPage />}
        {activePage === 'model' && <ModelPage />}
        {activePage === 'log' && <LogPage />}
      </section>
    </main>
  );
}
