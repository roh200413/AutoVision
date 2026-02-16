import { useMemo, useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';

type FileNode = { name: string };
type FolderNode = { name: string; files: FileNode[] };
type DatasetNode = { name: string; path: string; folders: FolderNode[] };

type NavTab = 'data' | 'model' | 'log';

type ModalState = {
  title: string;
  description: string;
} | null;

const datasets: DatasetNode[] = [
  {
    name: 'Dataset 1',
    path: 'C:/autovision/datasets/dataset1',
    folders: [
      {
        name: 'p1',
        files: [{ name: 'filename01.png' }, { name: 'filename02.png' }, { name: 'filename03.png' }],
      },
    ],
  },
  {
    name: 'Dataset 2',
    path: 'C:/autovision/datasets/dataset2',
    folders: [
      {
        name: 's1',
        files: [{ name: 'filename11.png' }, { name: 'filename12.png' }, { name: 'filename13.png' }],
      },
    ],
  },
];

const models = [
  { name: 'Defect Detector V1', version: '1.2.0', status: 'Active' },
  { name: 'Surface Segmenter', version: '2.1.4', status: 'Standby' },
  { name: 'Bolt Classifier', version: '0.9.8', status: 'Draft' },
];

function createMockImage(fileName: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#ececec' />
      <stop offset='100%' stop-color='#d9d9d9' />
    </linearGradient>
  </defs>
  <rect width='1200' height='700' fill='url(#bg)' />
  <ellipse cx='570' cy='360' rx='380' ry='230' fill='#1e1f25' />
  <ellipse cx='420' cy='300' rx='76' ry='76' fill='#454852' />
  <ellipse cx='710' cy='290' rx='72' ry='72' fill='#4d5059' />
  <ellipse cx='560' cy='430' rx='102' ry='92' fill='#555861' />
  <text x='70' y='80' fill='#191c24' font-size='42' font-family='Segoe UI,sans-serif'>${fileName}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function DataTree({ onSelectFile }: { onSelectFile: (value: string) => void }) {
  return (
    <ul className="tree-root">
      {datasets.map((group) => (
        <li key={group.name}>
          <div className="tree-row tree-folder">
            <span className="tree-icon">▾</span>
            <span>{group.name}</span>
          </div>
          <ul>
            {group.folders.map((folder) => (
              <li key={folder.name}>
                <div className="tree-row tree-folder">
                  <span className="tree-icon">▾</span>
                  <span>{folder.name}</span>
                </div>
                <ul>
                  {folder.files.map((file) => (
                    <li key={file.name}>
                      <button className="tree-file-button" onClick={() => onSelectFile(file.name)}>
                        <span className="tree-icon">▾</span>
                        <span className="tree-file">{file.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function ModelManagerPage() {
  return (
    <div className="model-page">
      <header className="model-page__header">
        <h2>Model Management</h2>
        <Button variant="primary">+ 모델 등록</Button>
      </header>
      <div className="model-list">
        {models.map((model) => (
          <Card key={model.name}>
            <div className="model-item">
              <div>
                <strong>{model.name}</strong>
                <p>Version: {model.version}</p>
              </div>
              <span className="model-badge">{model.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Modal({ state, onClose }: { state: ModalState; onClose: () => void }) {
  if (!state) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <h3>{state.title}</h3>
        <p>{state.description}</p>
        <Button variant="primary" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('data');
  const [selectedFile, setSelectedFile] = useState('filename01.png');
  const [modalState, setModalState] = useState<ModalState>(null);

  const selectedImage = useMemo(() => createMockImage(selectedFile), [selectedFile]);

  const currentPath = useMemo(() => datasets.map((item) => `${item.name}: ${item.path}`).join('\n'), []);

  return (
    <main className="app-shell">
      <aside className="left-sidebar">
        <header className="brand">HAN JOO LIGHT METAL</header>
        <nav className="left-nav">
          <Button
            className={`nav-item ${activeTab === 'data' ? 'nav-item--active' : ''}`}
            variant={activeTab === 'data' ? 'primary' : 'ghost'}
            fullWidth
            onClick={() => setActiveTab('data')}
          >
            Data
          </Button>
          <Button
            className={`nav-item ${activeTab === 'model' ? 'nav-item--active' : ''}`}
            variant={activeTab === 'model' ? 'primary' : 'ghost'}
            fullWidth
            onClick={() => setActiveTab('model')}
          >
            Model
          </Button>
          <Button
            className={`nav-item ${activeTab === 'log' ? 'nav-item--active' : ''}`}
            variant={activeTab === 'log' ? 'primary' : 'ghost'}
            fullWidth
            onClick={() => setActiveTab('log')}
          >
            Log
          </Button>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="top-actions">
            <Button
              variant="secondary"
              onClick={() => setModalState({ title: '데이터 업데이트', description: '데이터 동기화를 시작했습니다.' })}
            >
              데이터 업데이트
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                setModalState({
                  title: '데이터 경로',
                  description: `현재 오른쪽 폴더 구조 기준 경로\n${currentPath}`,
                })
              }
            >
              경로 확인
            </Button>
          </div>
          <Button variant="success" className="ok-btn">
            OK
          </Button>
        </header>

        {activeTab === 'data' && (
          <div className="content-grid">
            <Card>
              <div className="image-canvas">
                <img src={selectedImage} alt={selectedFile} className="preview-image" />
              </div>
            </Card>
            <aside className="data-panel">
              <div className="data-header">Data</div>
              <div className="data-tree-wrap">
                <DataTree onSelectFile={setSelectedFile} />
              </div>
              <div className="panel-bottom-actions">
                <Button fullWidth>라벨링 추가</Button>
                <Button fullWidth>확정</Button>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'model' && <ModelManagerPage />}
        {activeTab === 'log' && (
          <div className="placeholder-page">
            <h2>Log</h2>
            <p>작업 로그 페이지는 다음 단계에서 연동 가능합니다.</p>
          </div>
        )}
      </section>

      <Modal state={modalState} onClose={() => setModalState(null)} />
    </main>
  );
}
