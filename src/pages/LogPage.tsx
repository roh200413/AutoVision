import { Card } from '../components/Card';

export function LogPage() {
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
