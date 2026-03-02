import type { BubbleStyle, TailDirection } from '../../types/comic';

interface Props {
  text: string;
  style: BubbleStyle;
  tailDirection: TailDirection;
  width: number;
  height: number;
  fontSize: number;
  selected?: boolean;
}

export default function SpeechBubble({
  text,
  style,
  tailDirection,
  width,
  height,
  fontSize,
  selected,
}: Props) {
  const tailSize = 18;
  const bodyH = height - tailSize;
  const r = 16;

  // Tail position based on direction
  const isTailBottom = tailDirection.startsWith('bottom');
  const isTailRight = tailDirection.endsWith('right');

  if (style === 'thought') {
    return <ThoughtBubble text={text} width={width} height={height} fontSize={fontSize} selected={selected} />;
  }

  if (style === 'shout') {
    return <ShoutBubble text={text} width={width} height={height} fontSize={fontSize} selected={selected} />;
  }

  // Speech bubble path
  const tailTipX = isTailRight ? width - 20 : 20;
  const tailTipY = isTailBottom ? height : 0;
  const tailLeft = isTailRight ? width - 55 : 25;
  const tailRight = isTailRight ? width - 25 : 55;

  const path = isTailBottom
    ? `
      M ${r} 0
      H ${width - r} Q ${width} 0 ${width} ${r}
      V ${bodyH - r} Q ${width} ${bodyH} ${width - r} ${bodyH}
      H ${tailRight}
      L ${tailTipX} ${tailTipY}
      L ${tailLeft} ${bodyH}
      H ${r} Q 0 ${bodyH} 0 ${bodyH - r}
      V ${r} Q 0 0 ${r} 0 Z
    `
    : `
      M ${r} ${tailSize}
      H ${tailLeft}
      L ${tailTipX} 0
      L ${tailRight} ${tailSize}
      H ${width - r} Q ${width} ${tailSize} ${width} ${tailSize + r}
      V ${height - r} Q ${width} ${height} ${width - r} ${height}
      H ${r} Q 0 ${height} 0 ${height - r}
      V ${tailSize + r} Q 0 ${tailSize} ${r} ${tailSize} Z
    `;

  const textTop = isTailBottom ? 8 : tailSize + 8;
  const textH = isTailBottom ? bodyH - 16 : height - tailSize - 16;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        outline: selected ? '2px dashed #7c3aed' : 'none',
        outlineOffset: 3,
        borderRadius: 8,
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <path d={path} fill="white" stroke="#1e1b4b" strokeWidth={2.5} strokeLinejoin="round" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: textTop,
          left: 10,
          right: 10,
          height: textH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          fontWeight: 700,
          color: '#1e1b4b',
          textAlign: 'center',
          direction: 'rtl',
          wordBreak: 'break-word',
          overflow: 'hidden',
          lineHeight: 1.3,
          pointerEvents: 'none',
        }}
      >
        {text || <span style={{ opacity: 0.35 }}>הקלד כאן...</span>}
      </div>
    </div>
  );
}

function ThoughtBubble({ text, width, height, fontSize, selected }: Omit<Props, 'style' | 'tailDirection'>) {
  const cx = width / 2;
  const cy = (height - 22) / 2;
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        outline: selected ? '2px dashed #7c3aed' : 'none',
        outlineOffset: 3,
        borderRadius: '50%',
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <ellipse cx={cx} cy={cy} rx={cx - 4} ry={cy - 4} fill="white" stroke="#1e1b4b" strokeWidth={2.5} strokeDasharray="8 4" />
        <circle cx={20} cy={height - 12} r={6} fill="white" stroke="#1e1b4b" strokeWidth={2} />
        <circle cx={10} cy={height - 4} r={4} fill="white" stroke="#1e1b4b" strokeWidth={1.5} />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 6,
          right: 6,
          bottom: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          fontWeight: 700,
          color: '#1e1b4b',
          textAlign: 'center',
          direction: 'rtl',
          wordBreak: 'break-word',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {text || <span style={{ opacity: 0.35 }}>חושב...</span>}
      </div>
    </div>
  );
}

function ShoutBubble({ text, width, height, fontSize, selected }: Omit<Props, 'style' | 'tailDirection'>) {
  const cx = width / 2;
  const cy = height / 2;
  const spikes = 12;
  const outerR = Math.min(cx, cy) - 2;
  const innerR = outerR * 0.78;
  let path = '';
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  path += 'Z';

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        outline: selected ? '2px dashed #7c3aed' : 'none',
        outlineOffset: 3,
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <path d={path} fill="#fef08a" stroke="#854d0e" strokeWidth={2.5} />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          right: '20%',
          bottom: '20%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          fontWeight: 900,
          color: '#7c2d12',
          textAlign: 'center',
          direction: 'rtl',
          wordBreak: 'break-word',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {text || <span style={{ opacity: 0.35 }}>!!!‎</span>}
      </div>
    </div>
  );
}
