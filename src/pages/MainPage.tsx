import type { ReactNode } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

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

export function MainPage() {
  return (
    <>
      <header className="topbar">
        <div className="top-actions">
          <Button >AI Model</Button>
          <Button className="path-btn">모델 이름</Button>
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
          <div >
            <Button className="data-header">
              <span >파일 경로</span>
              <span >/dataset/sample1</span>
            </Button>
          </div>
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
