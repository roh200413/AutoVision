import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

type ModelOption = {
  id: number;
  lineName: string;
  modelName: string;
  normalDataset: string;
  keepMemoryAfterTraining: boolean;
};

const modelCatalog = ['PaDiM', 'PatchCore', 'FastFlow', 'STPM'];

const initialRows: ModelOption[] = [
  {
    id: 1,
    lineName: 'Front Cam - Slot A',
    modelName: 'PaDiM',
    normalDataset: 'dummy/normal/front_a_v1',
    keepMemoryAfterTraining: true,
  },
  {
    id: 2,
    lineName: 'Top Cam - Slot B',
    modelName: 'PatchCore',
    normalDataset: 'dummy/normal/top_b_v2',
    keepMemoryAfterTraining: false,
  },
  {
    id: 3,
    lineName: 'Side Cam - Slot C',
    modelName: 'FastFlow',
    normalDataset: 'dummy/normal/side_c_v1',
    keepMemoryAfterTraining: true,
  },
];

export function ModelPage() {
  const [rows, setRows] = useState<ModelOption[]>(initialRows);

  const updateRow = <K extends keyof ModelOption>(id: number, key: K, value: ModelOption[K]) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  };

  return (
    <section className="single-page page-content model-page">
      <h1 className="page-title">Model</h1>
      <p className="model-page-description">
        few-shot learning 이상탐지 모델을 선택하고, 더미 정상 데이터셋으로 학습 옵션을 구성하세요.
      </p>

      <div className="model-list">
        {rows.map((row) => (
          <Card key={row.id}>
            <article className="model-row-card">
              <header className="model-row-head">
                <h2>{row.lineName}</h2>
                <Button variant="secondary" className="model-row-train-btn">
                  더미 학습 실행
                </Button>
              </header>

              <div className="model-row-fields">
                <label className="model-field">
                  <span>모델 선택</span>
                  <select
                    value={row.modelName}
                    onChange={(event) => updateRow(row.id, 'modelName', event.target.value)}
                  >
                    {modelCatalog.map((modelName) => (
                      <option key={modelName} value={modelName}>
                        {modelName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="model-field">
                  <span>정상 데이터셋 업데이트</span>
                  <input
                    type="text"
                    value={row.normalDataset}
                    onChange={(event) => updateRow(row.id, 'normalDataset', event.target.value)}
                    placeholder="dummy/normal/dataset_path"
                  />
                </label>

                <label className="model-field model-field--checkbox">
                  <span>학습 메모리 보유</span>
                  <input
                    type="checkbox"
                    checked={row.keepMemoryAfterTraining}
                    onChange={(event) =>
                      updateRow(row.id, 'keepMemoryAfterTraining', event.target.checked)
                    }
                  />
                </label>
              </div>
            </article>
          </Card>
        ))}
      </div>
    </section>
  );
}
