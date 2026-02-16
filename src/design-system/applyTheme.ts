import { tokens } from './tokens';

const cssVariables: Record<string, string> = {
  '--color-bg-app': tokens.color.bgApp,
  '--color-bg-panel': tokens.color.bgPanel,
  '--color-bg-header': tokens.color.bgHeader,
  '--color-bg-muted': tokens.color.bgMuted,
  '--color-bg-canvas': tokens.color.bgCanvas,
  '--color-border': tokens.color.border,
  '--color-border-strong': tokens.color.borderStrong,
  '--color-text-primary': tokens.color.textPrimary,
  '--color-text-secondary': tokens.color.textSecondary,
  '--color-text-muted': tokens.color.textMuted,
  '--color-blue': tokens.color.blue,
  '--color-green': tokens.color.green,
  '--radius-sm': tokens.radius.sm,
  '--radius-md': tokens.radius.md,
  '--space-xs': tokens.space.xs,
  '--space-sm': tokens.space.sm,
  '--space-md': tokens.space.md,
  '--space-lg': tokens.space.lg,
  '--shadow-panel': tokens.shadow.panel,
};

export function applyTheme() {
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
