export function Container({
  children,
  className = "",
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <div className={`page-shell ${className}`.trim()}>{children}</div>;
}
