/**
 * Hand-crafted SVG comic characters.
 * Design rules: thick black outlines (stroke-width 3-4), flat bold colours,
 * oversized cartoon heads — the classic comic-book look.
 */

function uri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
}

/* ─── HERO ─────────────────────────────────────────────── */
export const HERO = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <path d="M38 70 Q14 115 20 152 L60 128 L100 152 Q106 115 82 70" fill="#EF4444" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <rect x="36" y="67" width="48" height="58" rx="8" fill="#2563EB" stroke="#111" stroke-width="3"/>
  <path d="M60 75l3.5 10.5H74l-9 6.5 3.5 10.5L60 96l-8.5 6.5L55 92l-9-6.5h10.5z" fill="#FBBF24" stroke="#111" stroke-width="1.5"/>
  <rect x="36" y="102" width="48" height="9" rx="3" fill="#F59E0B" stroke="#111" stroke-width="2.5"/>
  <path d="M36 74 Q17 92 11 114" stroke="#2563EB" stroke-width="17" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q103 92 109 114" stroke="#2563EB" stroke-width="17" fill="none" stroke-linecap="round"/>
  <path d="M36 74 Q17 92 11 114" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q103 92 109 114" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="10" cy="118" r="10" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <circle cx="110" cy="118" r="10" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <rect x="38" y="122" width="18" height="34" rx="7" fill="#1E3A8A" stroke="#111" stroke-width="3"/>
  <rect x="64" y="122" width="18" height="34" rx="7" fill="#1E3A8A" stroke="#111" stroke-width="3"/>
  <circle cx="60" cy="37" r="28" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M32 29 Q60 12 88 29 L86 44 Q60 27 34 44Z" fill="#1E40AF" stroke="#111" stroke-width="2.5"/>
  <ellipse cx="48" cy="37" rx="7" ry="6" fill="white" stroke="#111" stroke-width="2"/>
  <ellipse cx="72" cy="37" rx="7" ry="6" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="48" cy="37" r="3.5" fill="#111"/>
  <circle cx="72" cy="37" r="3.5" fill="#111"/>
  <circle cx="50" cy="35" r="1.5" fill="white"/>
  <circle cx="74" cy="35" r="1.5" fill="white"/>
  <path d="M46 53 Q60 64 74 53" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`);

/* ─── PRINCESS ──────────────────────────────────────────── */
export const PRINCESS = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <path d="M30 75 Q10 120 20 155 L60 130 L100 155 Q110 120 90 75" fill="#EC4899" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <path d="M25 75 Q60 95 95 75 L90 155 L30 155Z" fill="#F472B6" stroke="#111" stroke-width="3"/>
  <text x="60" y="120" text-anchor="middle" font-size="14" fill="#FBBF24">✦ ✦ ✦</text>
  <path d="M36 67 L36 75 L60 68 L84 75 L84 67 L76 58 L68 67 L60 55 L52 67 L44 58Z" fill="#FBBF24" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="60" cy="37" r="27" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M34 20 Q60 8 86 20" stroke="#8B5CF6" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M34 20 Q60 8 86 20" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M33 22 Q25 45 30 65" stroke="#8B5CF6" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M87 22 Q95 45 90 65" stroke="#8B5CF6" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M33 22 Q25 45 30 65" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M87 22 Q95 45 90 65" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="46" cy="36" r="6" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="74" cy="36" r="6" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="46" cy="37" r="3" fill="#7C3AED"/>
  <circle cx="74" cy="37" r="3" fill="#7C3AED"/>
  <circle cx="47.5" cy="35" r="1.5" fill="white"/>
  <circle cx="75.5" cy="35" r="1.5" fill="white"/>
  <path d="M33 28 Q37 22 44 24" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M87 28 Q83 22 76 24" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M47 52 Q60 62 73 52" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="60" cy="46" r="3" fill="#EC4899" stroke="#111" stroke-width="1.5"/>
</svg>`);

/* ─── BOY ───────────────────────────────────────────────── */
export const BOY = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="36" y="67" width="48" height="55" rx="8" fill="#EF4444" stroke="#111" stroke-width="3"/>
  <path d="M36 74 Q17 90 12 110" stroke="#FDE68A" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q103 90 108 110" stroke="#FDE68A" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M36 74 Q17 90 12 110" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q103 90 108 110" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="11" cy="114" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <circle cx="109" cy="114" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <rect x="38" y="119" width="17" height="36" rx="7" fill="#1D4ED8" stroke="#111" stroke-width="3"/>
  <rect x="65" y="119" width="17" height="36" rx="7" fill="#1D4ED8" stroke="#111" stroke-width="3"/>
  <rect x="36" y="143" width="21" height="12" rx="4" fill="#111" stroke="#111" stroke-width="2"/>
  <rect x="63" y="143" width="21" height="12" rx="4" fill="#111" stroke="#111" stroke-width="2"/>
  <circle cx="60" cy="37" r="27" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M34 14 Q60 4 86 14 Q88 30 84 38 Q60 26 36 38 Q32 30 34 14Z" fill="#92400E" stroke="#111" stroke-width="2.5"/>
  <circle cx="46" cy="38" r="6.5" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="74" cy="38" r="6.5" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="46" cy="39" r="3.5" fill="#111"/>
  <circle cx="74" cy="39" r="3.5" fill="#111"/>
  <circle cx="47.5" cy="37" r="1.5" fill="white"/>
  <circle cx="75.5" cy="37" r="1.5" fill="white"/>
  <ellipse cx="42" cy="48" rx="4" ry="3" fill="#FBBF24" opacity="0.6"/>
  <ellipse cx="78" cy="48" rx="4" ry="3" fill="#FBBF24" opacity="0.6"/>
  <path d="M47 53 Q60 64 73 53" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M53 56 L67 56" stroke="#111" stroke-width="2" stroke-linecap="round"/>
</svg>`);

/* ─── GIRL ──────────────────────────────────────────────── */
export const GIRL = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <path d="M30 72 Q8 115 18 155 L60 133 L102 155 Q112 115 90 72" fill="#A855F7" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <path d="M36 72 Q60 85 84 72 L90 155 L30 155Z" fill="#C084FC" stroke="#111" stroke-width="2.5"/>
  <path d="M34 74 Q16 92 10 114" stroke="#FDE68A" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M86 74 Q104 92 110 114" stroke="#FDE68A" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M34 74 Q16 92 10 114" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M86 74 Q104 92 110 114" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="9" cy="118" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <circle cx="111" cy="118" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <circle cx="60" cy="37" r="27" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M33 14 Q40 4 60 8 Q80 4 87 14 Q92 28 88 42 Q80 30 60 32 Q40 30 32 42 Q28 28 33 14Z" fill="#7C2D12" stroke="#111" stroke-width="2.5"/>
  <path d="M33 14 Q20 35 22 65" stroke="#7C2D12" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M87 14 Q100 35 98 65" stroke="#7C2D12" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M33 14 Q20 35 22 65" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M87 14 Q100 35 98 65" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="22" cy="60" r="6" fill="#EC4899" stroke="#111" stroke-width="2"/>
  <circle cx="98" cy="60" r="6" fill="#EC4899" stroke="#111" stroke-width="2"/>
  <circle cx="46" cy="37" r="6.5" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="74" cy="37" r="6.5" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="46" cy="38" r="3.5" fill="#7C3AED"/>
  <circle cx="74" cy="38" r="3.5" fill="#7C3AED"/>
  <circle cx="47.5" cy="36" r="1.5" fill="white"/>
  <circle cx="75.5" cy="36" r="1.5" fill="white"/>
  <path d="M47 53 Q60 63 73 53" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="42" cy="48" rx="4" ry="3" fill="#EC4899" opacity="0.5"/>
  <ellipse cx="78" cy="48" rx="4" ry="3" fill="#EC4899" opacity="0.5"/>
</svg>`);

/* ─── SCIENTIST ─────────────────────────────────────────── */
export const SCIENTIST = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="34" y="67" width="52" height="58" rx="8" fill="white" stroke="#111" stroke-width="3"/>
  <rect x="34" y="67" width="52" height="12" rx="4" fill="#DBEAFE" stroke="#111" stroke-width="2"/>
  <path d="M52 105 L52 135" stroke="#111" stroke-width="2" stroke-dasharray="4 3"/>
  <path d="M52 105 L48 100 L56 100 Z" fill="#111"/>
  <rect x="34" y="72" width="52" height="8" rx="3" fill="#E0F2FE" stroke="#111" stroke-width="1.5"/>
  <path d="M34 75 Q16 92 10 112" stroke="white" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M86 75 Q104 92 110 112" stroke="white" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M34 75 Q16 92 10 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M86 75 Q104 92 110 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="9" cy="116" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <rect x="96" y="100" width="18" height="28" rx="4" fill="#6EE7B7" stroke="#111" stroke-width="2.5"/>
  <ellipse cx="105" cy="100" rx="7" ry="4" fill="#A7F3D0" stroke="#111" stroke-width="2"/>
  <rect x="38" y="122" width="17" height="34" rx="7" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <rect x="65" y="122" width="17" height="34" rx="7" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <circle cx="60" cy="36" r="27" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M33 14 Q38 2 60 6 Q82 2 87 14 Q90 24 88 35 Q72 16 60 20 Q48 16 32 35 Q30 24 33 14Z" fill="#F97316" stroke="#111" stroke-width="2.5"/>
  <path d="M33 15 Q22 8 18 18 Q16 28 28 32" stroke="#F97316" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M87 15 Q98 8 102 18 Q104 28 92 32" stroke="#F97316" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="36" y="35" width="48" height="14" rx="7" fill="none" stroke="#111" stroke-width="2.5"/>
  <line x1="36" y1="42" x2="84" y2="42" stroke="#111" stroke-width="2"/>
  <circle cx="46" cy="39" r="5" fill="#BFDBFE"/>
  <circle cx="74" cy="39" r="5" fill="#BFDBFE"/>
  <circle cx="46" cy="39" r="2.5" fill="#111"/>
  <circle cx="74" cy="39" r="2.5" fill="#111"/>
  <path d="M48 52 Q60 60 72 52" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`);

/* ─── PIRATE ────────────────────────────────────────────── */
export const PIRATE = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="36" y="67" width="48" height="56" rx="8" fill="#92400E" stroke="#111" stroke-width="3"/>
  <path d="M36 67 Q60 80 84 67 L84 80 Q60 93 36 80Z" fill="#B45309" stroke="#111" stroke-width="2"/>
  <path d="M36 74 Q16 90 10 112" stroke="#92400E" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q104 90 110 112" stroke="#92400E" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M36 74 Q16 90 10 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q104 90 110 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M10 112 Q6 118 8 124" stroke="#92400E" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M10 112 Q6 118 8 124" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M8 122 Q4 130 10 134" stroke="#94A3B8" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M8 122 Q4 130 10 134" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="110" cy="116" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <rect x="38" y="120" width="17" height="35" rx="7" fill="#111" stroke="#111" stroke-width="3"/>
  <rect x="65" y="120" width="17" height="35" rx="7" fill="#111" stroke="#111" stroke-width="3"/>
  <circle cx="60" cy="37" r="27" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M30 18 Q60 4 90 18 L92 10 L60 0 L28 10 Z" fill="#111" stroke="#111" stroke-width="2"/>
  <path d="M28 22 Q60 8 92 22 L92 32 Q60 20 28 32Z" fill="#111" stroke="#111" stroke-width="2"/>
  <path d="M40 10 L50 24 M60 6 L60 24 M80 10 L70 24" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
  <circle cx="60" cy="14" r="5" fill="#EF4444" stroke="#111" stroke-width="1.5"/>
  <text x="60" y="18" text-anchor="middle" font-size="7" fill="white" font-weight="bold">☠</text>
  <rect x="42" y="34" width="18" height="12" rx="2" fill="#111" stroke="#111" stroke-width="1"/>
  <circle cx="51" cy="40" r="5" fill="#EF4444" stroke="#111" stroke-width="1.5"/>
  <circle cx="70" cy="37" r="6.5" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="70" cy="37" r="3.5" fill="#111"/>
  <circle cx="71.5" cy="35" r="1.5" fill="white"/>
  <path d="M47 52 Q60 62 73 52" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M46 53 Q52 58 60 56 Q68 54 74 50" stroke="#111" stroke-width="1.5" fill="none"/>
</svg>`);

/* ─── NINJA ─────────────────────────────────────────────── */
export const NINJA = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="36" y="67" width="48" height="58" rx="8" fill="#1F2937" stroke="#111" stroke-width="3"/>
  <path d="M36 74 Q16 90 10 112" stroke="#1F2937" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q104 90 110 112" stroke="#1F2937" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M36 74 Q16 90 10 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M84 74 Q104 90 110 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="9" cy="116" r="9" fill="#1F2937" stroke="#111" stroke-width="3"/>
  <circle cx="111" cy="116" r="9" fill="#1F2937" stroke="#111" stroke-width="3"/>
  <rect x="38" y="122" width="17" height="34" rx="7" fill="#111" stroke="#111" stroke-width="3"/>
  <rect x="65" y="122" width="17" height="34" rx="7" fill="#111" stroke="#111" stroke-width="3"/>
  <path d="M100 50 L90 80 L106 76 L94 108" stroke="#C0C0C0" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M100 50 L90 80 L106 76 L94 108" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M96 48 L104 52" stroke="#C0C0C0" stroke-width="6" stroke-linecap="round"/>
  <circle cx="60" cy="37" r="27" fill="#1F2937" stroke="#111" stroke-width="3.5"/>
  <rect x="32" y="25" width="56" height="24" rx="4" fill="#EF4444" stroke="#111" stroke-width="2.5"/>
  <rect x="32" y="44" width="56" height="10" rx="3" fill="#1F2937" stroke="#111" stroke-width="2"/>
  <ellipse cx="46" cy="36" rx="7" ry="6" fill="white" stroke="#111" stroke-width="2"/>
  <ellipse cx="74" cy="36" rx="7" ry="6" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="46" cy="36" r="3.5" fill="#111"/>
  <circle cx="74" cy="36" r="3.5" fill="#111"/>
  <circle cx="47.5" cy="34" r="1.5" fill="white"/>
  <circle cx="75.5" cy="34" r="1.5" fill="white"/>
  <rect x="32" y="36" width="56" height="22" rx="3" fill="#1F2937" stroke="#111" stroke-width="2"/>
  <path d="M32 47 L88 47" stroke="#EF4444" stroke-width="2.5"/>
</svg>`);

/* ─── WIZARD ────────────────────────────────────────────── */
export const WIZARD = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <path d="M36 72 Q12 118 20 155 L60 132 L100 155 Q108 118 84 72" fill="#7C3AED" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <text x="60" y="118" text-anchor="middle" font-size="12" fill="#FBBF24">✦ ★ ✦</text>
  <rect x="36" y="68" width="48" height="58" rx="8" fill="#6D28D9" stroke="#111" stroke-width="3"/>
  <path d="M36 75 Q16 92 10 115" stroke="#6D28D9" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M84 75 Q104 92 110 115" stroke="#6D28D9" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M36 75 Q16 92 10 115" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M84 75 Q104 92 110 115" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="9" cy="119" r="9" fill="#FDE68A" stroke="#111" stroke-width="3"/>
  <path d="M106 108 L114 140" stroke="#D4A017" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M106 108 L114 140" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="107" cy="106" r="7" fill="#FBBF24" stroke="#111" stroke-width="2"/>
  <text x="107" y="110" text-anchor="middle" font-size="8" fill="#111">★</text>
  <rect x="38" y="122" width="17" height="34" rx="7" fill="#5B21B6" stroke="#111" stroke-width="3"/>
  <rect x="65" y="122" width="17" height="34" rx="7" fill="#5B21B6" stroke="#111" stroke-width="3"/>
  <circle cx="60" cy="40" r="25" fill="#FDE68A" stroke="#111" stroke-width="3.5"/>
  <path d="M35 40 Q60 0 85 40 L60 30Z" fill="#7C3AED" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
  <path d="M35 40 L85 40" stroke="#111" stroke-width="3"/>
  <text x="60" y="30" text-anchor="middle" font-size="9" fill="#FBBF24">★</text>
  <path d="M30 50 Q24 42 28 40" stroke="#E5E7EB" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M90 50 Q96 42 92 40" stroke="#E5E7EB" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="48" cy="40" r="6" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="72" cy="40" r="6" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="48" cy="40" r="3" fill="#7C3AED"/>
  <circle cx="72" cy="40" r="3" fill="#7C3AED"/>
  <circle cx="49.5" cy="38" r="1.5" fill="white"/>
  <circle cx="73.5" cy="38" r="1.5" fill="white"/>
  <path d="M28 56 Q40 70 60 66 Q80 70 92 56" stroke="#E5E7EB" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M28 56 Q40 70 60 66 Q80 70 92 56" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M48 54 Q60 63 72 54" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`);

/* ─── ALIEN ─────────────────────────────────────────────── */
export const ALIEN = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="38" y="72" width="44" height="52" rx="10" fill="#4ADE80" stroke="#111" stroke-width="3"/>
  <path d="M38 80 Q18 96 12 116" stroke="#4ADE80" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M82 80 Q102 96 108 116" stroke="#4ADE80" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M38 80 Q18 96 12 116" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M82 80 Q102 96 108 116" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="11" cy="120" rx="10" ry="7" fill="#4ADE80" stroke="#111" stroke-width="3"/>
  <ellipse cx="109" cy="120" rx="10" ry="7" fill="#4ADE80" stroke="#111" stroke-width="3"/>
  <rect x="42" y="122" width="14" height="32" rx="6" fill="#22C55E" stroke="#111" stroke-width="3"/>
  <rect x="64" y="122" width="14" height="32" rx="6" fill="#22C55E" stroke="#111" stroke-width="3"/>
  <ellipse cx="60" cy="42" rx="32" ry="36" fill="#4ADE80" stroke="#111" stroke-width="3.5"/>
  <line x1="42" y1="9" x2="38" y2="2" stroke="#4ADE80" stroke-width="4" stroke-linecap="round"/>
  <line x1="60" y1="7" x2="60" y2="0" stroke="#4ADE80" stroke-width="4" stroke-linecap="round"/>
  <line x1="78" y1="9" x2="82" y2="2" stroke="#4ADE80" stroke-width="4" stroke-linecap="round"/>
  <line x1="42" y1="9" x2="38" y2="2" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="60" y1="7" x2="60" y2="0" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="78" y1="9" x2="82" y2="2" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="38" cy="2" r="4" fill="#FBBF24" stroke="#111" stroke-width="2"/>
  <circle cx="60" cy="0" r="4" fill="#FBBF24" stroke="#111" stroke-width="2"/>
  <circle cx="82" cy="2" r="4" fill="#FBBF24" stroke="#111" stroke-width="2"/>
  <ellipse cx="44" cy="38" rx="10" ry="12" fill="#000" stroke="#111" stroke-width="2"/>
  <ellipse cx="76" cy="38" rx="10" ry="12" fill="#000" stroke="#111" stroke-width="2"/>
  <ellipse cx="44" cy="36" rx="6" ry="7" fill="#A7F3D0"/>
  <ellipse cx="76" cy="36" rx="6" ry="7" fill="#A7F3D0"/>
  <ellipse cx="44" cy="36" rx="3" ry="4" fill="#111"/>
  <ellipse cx="76" cy="36" rx="3" ry="4" fill="#111"/>
  <circle cx="45" cy="34" r="2" fill="white"/>
  <circle cx="77" cy="34" r="2" fill="white"/>
  <path d="M48 58 L60 55 L72 58" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`);

/* ─── ROBOT ─────────────────────────────────────────────── */
export const ROBOT = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="32" y="68" width="56" height="56" rx="6" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <rect x="32" y="68" width="56" height="16" rx="4" fill="#CBD5E1" stroke="#111" stroke-width="2.5"/>
  <circle cx="44" cy="90" r="6" fill="#EF4444" stroke="#111" stroke-width="2"/>
  <circle cx="60" cy="90" r="6" fill="#22C55E" stroke="#111" stroke-width="2"/>
  <circle cx="76" cy="90" r="6" fill="#FBBF24" stroke="#111" stroke-width="2"/>
  <rect x="40" y="100" width="40" height="14" rx="4" fill="#64748B" stroke="#111" stroke-width="2"/>
  <rect x="44" y="104" width="32" height="6" rx="3" fill="#38BDF8" stroke="#111" stroke-width="1.5"/>
  <path d="M32 78 Q12 88 8 108 L8 118 Q12 124 18 122 L22 110 Q22 100 32 88" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <path d="M88 78 Q108 88 112 108 L112 118 Q108 124 102 122 L98 110 Q98 100 88 88" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <rect x="4" y="112" width="18" height="12" rx="4" fill="#64748B" stroke="#111" stroke-width="2.5"/>
  <rect x="98" y="112" width="18" height="12" rx="4" fill="#64748B" stroke="#111" stroke-width="2.5"/>
  <rect x="38" y="122" width="18" height="34" rx="4" fill="#64748B" stroke="#111" stroke-width="3"/>
  <rect x="64" y="122" width="18" height="34" rx="4" fill="#64748B" stroke="#111" stroke-width="3"/>
  <rect x="36" y="148" width="22" height="10" rx="4" fill="#475569" stroke="#111" stroke-width="2.5"/>
  <rect x="62" y="148" width="22" height="10" rx="4" fill="#475569" stroke="#111" stroke-width="2.5"/>
  <rect x="32" y="20" width="56" height="48" rx="8" fill="#94A3B8" stroke="#111" stroke-width="3.5"/>
  <rect x="32" y="20" width="56" height="48" rx="8" fill="none" stroke="#64748B" stroke-width="1"/>
  <line x1="60" y1="14" x2="60" y2="20" stroke="#111" stroke-width="3" stroke-linecap="round"/>
  <circle cx="60" cy="12" r="4" fill="#FBBF24" stroke="#111" stroke-width="2"/>
  <rect x="40" y="28" width="16" height="16" rx="4" fill="#1E293B" stroke="#111" stroke-width="2"/>
  <rect x="64" y="28" width="16" height="16" rx="4" fill="#1E293B" stroke="#111" stroke-width="2"/>
  <circle cx="48" cy="36" r="5" fill="#38BDF8"/>
  <circle cx="72" cy="36" r="5" fill="#38BDF8"/>
  <circle cx="48" cy="36" r="2.5" fill="#111"/>
  <circle cx="72" cy="36" r="2.5" fill="#111"/>
  <circle cx="49" cy="35" r="1" fill="white"/>
  <circle cx="73" cy="35" r="1" fill="white"/>
  <rect x="42" y="50" width="36" height="10" rx="3" fill="#1E293B" stroke="#111" stroke-width="2"/>
  <path d="M46 55 L50 55 M54 53 L54 57 M58 55 L62 55 M66 53 L66 57 M70 55 L74 55" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>
</svg>`);

/* ─── DRAGON ────────────────────────────────────────────── */
export const DRAGON = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <path d="M20 55 Q10 40 22 30 Q30 24 38 38" fill="#22C55E" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M100 55 Q110 40 98 30 Q90 24 82 38" fill="#22C55E" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="32" y="68" width="56" height="58" rx="12" fill="#22C55E" stroke="#111" stroke-width="3"/>
  <path d="M38 70 Q22 90 18 112" stroke="#22C55E" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M82 70 Q98 90 102 112" stroke="#22C55E" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M38 70 Q22 90 18 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M82 70 Q98 90 102 112" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="17" cy="116" r="10" fill="#4ADE80" stroke="#111" stroke-width="3"/>
  <circle cx="103" cy="116" r="10" fill="#4ADE80" stroke="#111" stroke-width="3"/>
  <path d="M98 130 Q114 132 120 124 Q118 116 108 118" fill="#EF4444" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="36" y="124" width="20" height="32" rx="8" fill="#16A34A" stroke="#111" stroke-width="3"/>
  <rect x="64" y="124" width="20" height="32" rx="8" fill="#16A34A" stroke="#111" stroke-width="3"/>
  <rect x="34" y="147" width="24" height="12" rx="5" fill="#15803D" stroke="#111" stroke-width="2.5"/>
  <rect x="62" y="147" width="24" height="12" rx="5" fill="#15803D" stroke="#111" stroke-width="2.5"/>
  <ellipse cx="60" cy="42" rx="30" ry="28" fill="#22C55E" stroke="#111" stroke-width="3.5"/>
  <path d="M40 16 Q52 4 60 14 Q68 4 80 16" fill="#16A34A" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
  <ellipse cx="44" cy="40" rx="9" ry="8" fill="white" stroke="#111" stroke-width="2"/>
  <ellipse cx="76" cy="40" rx="9" ry="8" fill="white" stroke="#111" stroke-width="2"/>
  <circle cx="44" cy="41" r="5" fill="#FBBF24"/>
  <circle cx="76" cy="41" r="5" fill="#FBBF24"/>
  <ellipse cx="44" cy="41" rx="2.5" ry="3.5" fill="#111"/>
  <ellipse cx="76" cy="41" rx="2.5" ry="3.5" fill="#111"/>
  <circle cx="45" cy="39" r="1.5" fill="white"/>
  <circle cx="77" cy="39" r="1.5" fill="white"/>
  <ellipse cx="40" cy="52" rx="4" ry="3" fill="#4ADE80" opacity="0.6"/>
  <ellipse cx="80" cy="52" rx="4" ry="3" fill="#4ADE80" opacity="0.6"/>
  <path d="M40 56 Q50 64 60 58 Q70 64 80 56" stroke="#111" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M52 60 L60 56 L68 60" fill="#EF4444" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`);

/* ─── KNIGHT ────────────────────────────────────────────── */
export const KNIGHT = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160">
  <rect x="30" y="68" width="60" height="60" rx="6" fill="#94A3B8" stroke="#111" stroke-width="3.5"/>
  <rect x="30" y="68" width="60" height="60" rx="6" fill="none" stroke="#64748B" stroke-width="1" stroke-dasharray="6 4"/>
  <path d="M50 88 L70 88 L70 110 L60 118 L50 110Z" fill="#FBBF24" stroke="#111" stroke-width="2.5"/>
  <path d="M30 78 Q10 94 6 116 L6 128 Q10 135 16 132 L20 118 Q20 106 30 90" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <path d="M90 78 Q110 94 114 116 L114 128 Q110 135 104 132 L100 118 Q100 106 90 90" fill="#94A3B8" stroke="#111" stroke-width="3"/>
  <rect x="2" y="118" width="20" height="16" rx="4" fill="#64748B" stroke="#111" stroke-width="2.5"/>
  <rect x="98" y="118" width="20" height="16" rx="4" fill="#64748B" stroke="#111" stroke-width="2.5"/>
  <rect x="34" y="126" width="20" height="30" rx="5" fill="#64748B" stroke="#111" stroke-width="3"/>
  <rect x="66" y="126" width="20" height="30" rx="5" fill="#64748B" stroke="#111" stroke-width="3"/>
  <rect x="32" y="148" width="24" height="12" rx="4" fill="#475569" stroke="#111" stroke-width="2.5"/>
  <rect x="64" y="148" width="24" height="12" rx="4" fill="#475569" stroke="#111" stroke-width="2.5"/>
  <rect x="30" y="14" width="60" height="58" rx="8" fill="#94A3B8" stroke="#111" stroke-width="3.5"/>
  <path d="M30 14 Q60 2 90 14 L90 24 Q60 12 30 24Z" fill="#64748B" stroke="#111" stroke-width="2"/>
  <rect x="36" y="28" width="48" height="30" rx="4" fill="#475569" stroke="#111" stroke-width="2"/>
  <rect x="42" y="32" width="36" height="22" rx="3" fill="#1E293B"/>
  <ellipse cx="52" cy="43" rx="7" ry="6" fill="white" stroke="#111" stroke-width="1.5"/>
  <ellipse cx="68" cy="43" rx="7" ry="6" fill="white" stroke="#111" stroke-width="1.5"/>
  <circle cx="52" cy="43" r="3.5" fill="#111"/>
  <circle cx="68" cy="43" r="3.5" fill="#111"/>
  <circle cx="53.5" cy="41" r="1.5" fill="white"/>
  <circle cx="69.5" cy="41" r="1.5" fill="white"/>
</svg>`);
