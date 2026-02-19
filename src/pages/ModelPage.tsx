import { Card } from '../components/Card';

export function ModelPage() {
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
