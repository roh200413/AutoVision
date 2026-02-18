import { useMemo, useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';

type FileNode = { name: string };
type FolderNode = { name: string; files: FileNode[] };
type DatasetNode = { name: string; path: string; folders: FolderNode[] };
type ModelNode = { name: string; version: string; status: string; mAP: number; latency: number };
type LogNode = { time: string; type: 'INFO' | 'WARN' | 'ERROR'; message: string; actor: string };

type NavTab = 'data' | 'model' | 'log' | 'settings';

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

const models: ModelNode[] = [
  { name: 'Defect Detector V1', version: '1.2.0', status: 'Active', mAP: 94.3, latency: 22 },
  { name: 'Surface Segmenter', version: '2.1.4', status: 'Standby', mAP: 91.2, latency: 29 },
  { name: 'Bolt Classifier', version: '0.9.8', status: 'Draft', mAP: 88.7, latency: 17 },
];

const logs: LogNode[] = [
  { time: '2026-02-16 10:24', type: 'INFO', message: 'Dataset 1 동기화 완료', actor: 'system' },
  { time: '2026-02-16 10:26', type: 'WARN', message: 'Surface Segmenter 임계값 변경', actor: 'admin' },
  { time: '2026-02-16 10:28', type: 'ERROR', message: 'Dataset 2 일부 파일 누락 감지', actor: 'system' },
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
  const [selectedModel, setSelectedModel] = useState<ModelNode>(models[0]);

  return (
    <div className="model-page">
      <header className="model-page__header">
        <h2>Model Management</h2>
        <Button variant="primary">+ 모델 등록</Button>
      </header>
      <div className="model-page-grid">
        <div className="model-list">
          {models.map((model) => (
            <button key={model.name} className="model-card-button" onClick={() => setSelectedModel(model)}>
              <Card>
                <div className="model-item">
                  <div>
                    <strong>{model.name}</strong>
                    <p>Version: {model.version}</p>
                  </div>
                  <span className="model-badge">{model.status}</span>
                </div>
              </Card>
            </button>
          ))}
        </div>

        <Card>
          <div className="model-detail">
            <h3>{selectedModel.name}</h3>
            <p>현재 선택된 모델의 성능 지표와 배포 상태입니다.</p>
            <div className="metrics-grid">
              <div className="metric-item">
                <span>mAP</span>
                <strong>{selectedModel.mAP}%</strong>
              </div>
              <div className="metric-item">
                <span>Latency</span>
                <strong>{selectedModel.latency}ms</strong>
              </div>
              <div className="metric-item">
                <span>Version</span>
                <strong>{selectedModel.version}</strong>
              </div>
              <div className="metric-item">
                <span>Status</span>
                <strong>{selectedModel.status}</strong>
              </div>
            </div>
            <div className="model-actions">
              <Button variant="secondary">학습 이력</Button>
              <Button variant="primary">배포하기</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function LogPage() {
  return (
    <div className="page-surface">
      <header className="page-header">
        <h2>System Logs</h2>
        <div className="top-actions">
          <Button variant="secondary">오늘</Button>
          <Button variant="secondary">에러만</Button>
        </div>
      </header>
      <Card>
        <div className="log-table-wrap">
          <table className="log-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Message</th>
                <th>Actor</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((item) => (
                <tr key={`${item.time}-${item.message}`}>
                  <td>{item.time}</td>
                  <td>
                    <span className={`badge badge--${item.type.toLowerCase()}`}>{item.type}</span>
                  </td>
                  <td>{item.message}</td>
                  <td>{item.actor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page-surface">
      <header className="page-header">
        <h2>Settings</h2>
      </header>
      <div className="settings-grid">
        <Card>
          <div className="settings-card">
            <h3>데이터 루트 경로</h3>
            <p>C:/autovision/datasets</p>
            <Button variant="secondary">경로 변경</Button>
          </div>
        </Card>
        <Card>
          <div className="settings-card">
            <h3>추론 옵션</h3>
            <p>Confidence 0.45 / NMS 0.5</p>
            <Button variant="secondary">옵션 편집</Button>
          </div>
        </Card>
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

function DataPage({ selectedImage, selectedFile, setSelectedFile }: { selectedImage: string; selectedFile: string; setSelectedFile: (value: string) => void; }) {
  return (
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
          <Button className={`nav-item ${activeTab === 'data' ? 'nav-item--active' : ''}`} variant={activeTab === 'data' ? 'primary' : 'ghost'} fullWidth onClick={() => setActiveTab('data')}>Data</Button>
          <Button className={`nav-item ${activeTab === 'model' ? 'nav-item--active' : ''}`} variant={activeTab === 'model' ? 'primary' : 'ghost'} fullWidth onClick={() => setActiveTab('model')}>Model</Button>
          <Button className={`nav-item ${activeTab === 'log' ? 'nav-item--active' : ''}`} variant={activeTab === 'log' ? 'primary' : 'ghost'} fullWidth onClick={() => setActiveTab('log')}>Log</Button>
          <Button className={`nav-item ${activeTab === 'settings' ? 'nav-item--active' : ''}`} variant={activeTab === 'settings' ? 'primary' : 'ghost'} fullWidth onClick={() => setActiveTab('settings')}>Settings</Button>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="top-actions">
            <Button variant="secondary" onClick={() => setModalState({ title: '데이터 업데이트', description: '데이터 동기화를 시작했습니다. 완료 후 로그 탭에 기록됩니다.' })}>데이터 업데이트</Button>
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
          <Button variant="success" className="ok-btn">OK</Button>
        </header>

        {activeTab === 'data' && <DataPage selectedImage={selectedImage} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />}
        {activeTab === 'model' && <ModelManagerPage />}
        {activeTab === 'log' && <LogPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </section>

      <Modal state={modalState} onClose={() => setModalState(null)} />
    </main>
  );
}
