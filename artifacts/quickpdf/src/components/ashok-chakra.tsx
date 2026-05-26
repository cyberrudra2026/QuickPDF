export function AshokChakra({ size = 28 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 1;
  const innerR = outerR * 0.35;
  const hubR = outerR * 0.12;
  const spokeCount = 24;

  const spokes: React.ReactNode[] = [];
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i * 360) / spokeCount;
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + Math.cos(rad) * hubR;
    const y1 = cy + Math.sin(rad) * hubR;
    const x2 = cx + Math.cos(rad) * outerR;
    const y2 = cy + Math.sin(rad) * outerR;
    spokes.push(
      <line
        key={i}
        x1={x1} y1={y1}
        x2={x2} y2={y2}
        stroke="var(--logo-middle-color)"
        strokeWidth={size * 0.028}
        strokeLinecap="round"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="ashoka-chakra-spin flex-shrink-0"
    >
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="var(--logo-middle-color)" strokeWidth={size * 0.055} />
      {spokes}
      <circle cx={cx} cy={cy} r={hubR} fill="var(--logo-middle-color)" />
    </svg>
  );
}
