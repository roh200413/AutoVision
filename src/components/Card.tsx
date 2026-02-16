import type { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <section className="ds-card">{children}</section>;
}
