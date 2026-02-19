import type { ReactNode } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';

const dataset = [
  {
    name: 'Dataset 1',
    folders: [
      { name: 'p1', files: ['filename01.png', 'filename02.png', 'filename03.png'] },
    ],
  }
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

export function App() {
  return (
    <main className="app-shell">
      <aside className="left-sidebar">
        <header className="brand">HAN JOO LIGHT METAL</header>
        <nav className="left-nav">
          <Button className="nav-item nav-item--active" fullWidth>
            Data
          </Button>
          <Button variant="ghost" className="nav-item" fullWidth>
            Model
          </Button>
          <Button variant="ghost" className="nav-item" fullWidth>
            Log
          </Button>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="top-actions">
            <Button variant="secondary">AI Model</Button>
            <Button variant="secondary">모델 이름</Button>
            <Button variant="secondary">데이터 업데이트</Button>
            <Button variant="secondary">경로 확인</Button>
          </div>

          <div className="top-actions">          
            <Button variant="secondary" className="ok-btn">모델 추론</Button>
            <Button variant="secondary" className="ok-btn">전체 추론</Button>
          </div>

        </header>

        <div className="content-grid">
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
            <Button variant="success">
              OK
            </Button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
