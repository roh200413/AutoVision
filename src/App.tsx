import { useMemo, useState, type ReactNode } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';

type PageKey = 'main' | 'model' | 'log';

const dataset = [
  {
    name: 'Dataset 1',
    folders: [
      { name: 'p1', files: ['filename01.png', 'filename02.png', 'filename03.png'] },
    ],
  },
];

function TreeFolder({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <li>
      <div className="tree-row">
        <span className="tree-icon" aria-hidden>
          ▾
        </span>
        <span>{name}</span>
      </div>
      {children}
    </li>
  );
}

function MainPage() {
  return (
    <>
      <header className="topbar">
        <div className="top-actions">
          <Button variant="secondary">AI Model</Button>
          <Button variant="secondary">모델 이름</Button>
          <Button variant="secondary">데이터 업데이트</Button>
          <Button variant="secondary">경로 확인</Button>
        </div>

        <div className="top-actions">
          <Button variant="secondary" className="ok-btn">
            모델 추론
          </Button>
          <Button variant="secondary" className="ok-btn">
            전체 추론
          </Button>
        </div>
      </header>

      <div className="content-grid page-content">
        <Card>
          <div className="image-canvas" aria-label="inspection image">
            <div className="mock-part" />
          </div>
        </Card>

        <aside className="data-panel">
          <div className="data-header">Data</div>
          <div className="data-tree-wrap">
            <ul className="tree-root">
              {dataset.map((group) => (
                <TreeFolder key={group.name} name={group.name}>
                  <ul>
                    {group.folders.map((folder) => (
                      <TreeFolder key={folder.name} name={folder.name}>
                        <ul>
                          {folder.files.map((file) => (
                            <li key={file} className="tree-row tree-file">
                              <span className="tree-icon" aria-hidden>
                                ▾
                              </span>
                              {file}
                            </li>
                          ))}
                        </ul>
                      </TreeFolder>
                    ))}
                  </ul>
                </TreeFolder>
              ))}
            </ul>
          </div>
          <div className="panel-bottom-actions">
            <Button variant="success">OK</Button>
          </div>
        </aside>
      </div>
    </>
  );
}

function ModelPage() {
  return (
    <section className="single-page page-content">
      <h1 className="page-title">Model</h1>
      <Card>
        <div className="page-panel">
          <p>모델 설정, 버전 관리, 학습/배포 옵션을 여기에서 분리해서 관리하세요.</p>
        </div>
      </Card>
    </section>
  );
}

function LogPage() {
  return (
    <section className="single-page page-content">
      <h1 className="page-title">Log</h1>
      <Card>
        <div className="page-panel">
          <p>추론 로그, 오류 내역, 이벤트 타임라인을 이 페이지에서 확인할 수 있습니다.</p>
        </div>
      </Card>
    </section>
  );
}

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
