export interface CharacterAsset {
  id: string;
  label: string;
  src: string;
}

export interface BackgroundAsset {
  id: string;
  label: string;
  background: { type: 'solid'; color: string } | { type: 'gradient'; from: string; to: string; direction: 'to bottom' | 'to top' | 'to right' | 'to bottom right' };
  preview: string; // CSS background string for thumbnail
}

export interface StickerAsset {
  id: string;
  emoji: string;
  label: string;
}

const dicebear = (style: string, seed: string) =>
  `https://api.dicebear.com/9.x/${style}/png?seed=${encodeURIComponent(seed)}&size=200`;

export const CHARACTERS: CharacterAsset[] = [
  // adventurer (cute cartoon kids)
  { id: 'adv-1', label: 'נועה',     src: dicebear('adventurer', 'Noa') },
  { id: 'adv-2', label: 'יונתן',    src: dicebear('adventurer', 'Yoni') },
  { id: 'adv-3', label: 'מיה',      src: dicebear('adventurer', 'Mia') },
  { id: 'adv-4', label: 'אלי',      src: dicebear('adventurer', 'Eli') },
  { id: 'adv-5', label: 'שירה',     src: dicebear('adventurer', 'Shira') },
  { id: 'adv-6', label: 'דוד',      src: dicebear('adventurer', 'David') },
  // fun-emoji
  { id: 'emo-1', label: 'שמח',      src: dicebear('fun-emoji', 'Happy') },
  { id: 'emo-2', label: 'עצוב',     src: dicebear('fun-emoji', 'Sad') },
  { id: 'emo-3', label: 'מופתע',    src: dicebear('fun-emoji', 'Wow') },
  { id: 'emo-4', label: 'מצחיק',    src: dicebear('fun-emoji', 'Funny') },
  // bottts (robots – kids love robots!)
  { id: 'bot-1', label: 'רובוט 1',  src: dicebear('bottts', 'Robot1') },
  { id: 'bot-2', label: 'רובוט 2',  src: dicebear('bottts', 'Robot2') },
  { id: 'bot-3', label: 'רובוט 3',  src: dicebear('bottts', 'Robot3') },
  // lorelei (simple clean)
  { id: 'lor-1', label: 'ליאור',    src: dicebear('lorelei', 'Lior') },
  { id: 'lor-2', label: 'טל',       src: dicebear('lorelei', 'Tal') },
  // open-peeps (illustrated people)
  { id: 'pep-1', label: 'ענבל',     src: dicebear('open-peeps', 'Inbal') },
  { id: 'pep-2', label: 'עומר',     src: dicebear('open-peeps', 'Omer') },
  // pixel-art
  { id: 'pix-1', label: 'גיבור פיקסל', src: dicebear('pixel-art', 'Hero') },
  { id: 'pix-2', label: 'נסיכת פיקסל', src: dicebear('pixel-art', 'Princess') },
  // micah
  { id: 'mic-1', label: 'חבר',      src: dicebear('micah', 'Buddy') },
];

export const BACKGROUNDS: BackgroundAsset[] = [
  { id: 'sky',      label: 'שמיים ביום',   background: { type: 'gradient', from: '#87CEEB', to: '#e0f7fa', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #87CEEB, #e0f7fa)' },
  { id: 'night',    label: 'שמיים בלילה',  background: { type: 'gradient', from: '#0f0c29', to: '#302b63', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #0f0c29, #302b63)' },
  { id: 'sunset',   label: 'שקיעה',        background: { type: 'gradient', from: '#f97316', to: '#fbbf24', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #f97316, #fbbf24)' },
  { id: 'forest',   label: 'יער',          background: { type: 'gradient', from: '#166534', to: '#4ade80', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #166534, #4ade80)' },
  { id: 'ocean',    label: 'ים',           background: { type: 'gradient', from: '#0284c7', to: '#38bdf8', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #0284c7, #38bdf8)' },
  { id: 'space',    label: 'חלל',          background: { type: 'gradient', from: '#020617', to: '#1e1b4b', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #020617, #1e1b4b)' },
  { id: 'desert',   label: 'מדבר',         background: { type: 'gradient', from: '#f59e0b', to: '#fde68a', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #f59e0b, #fde68a)' },
  { id: 'snow',     label: 'שלג',          background: { type: 'gradient', from: '#bfdbfe', to: '#f0f9ff', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #bfdbfe, #f0f9ff)' },
  { id: 'volcano',  label: 'הר געש',       background: { type: 'gradient', from: '#7f1d1d', to: '#ef4444', direction: 'to bottom right' }, preview: 'linear-gradient(to bottom right, #7f1d1d, #ef4444)' },
  { id: 'rainbow',  label: 'קשת',          background: { type: 'gradient', from: '#f43f5e', to: '#818cf8', direction: 'to bottom right' }, preview: 'linear-gradient(to bottom right, #f43f5e, #818cf8)' },
  { id: 'cave',     label: 'מערה',         background: { type: 'gradient', from: '#292524', to: '#57534e', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #292524, #57534e)' },
  { id: 'meadow',   label: 'שדה ירוק',     background: { type: 'gradient', from: '#65a30d', to: '#d9f99d', direction: 'to bottom' }, preview: 'linear-gradient(to bottom, #65a30d, #d9f99d)' },
  { id: 'indoor',   label: 'חדר בית',      background: { type: 'solid', color: '#fef3c7' }, preview: '#fef3c7' },
  { id: 'school',   label: 'כיתה',         background: { type: 'solid', color: '#dbeafe' }, preview: '#dbeafe' },
  { id: 'white',    label: 'לבן',          background: { type: 'solid', color: '#ffffff' }, preview: '#ffffff' },
  { id: 'black',    label: 'שחור',         background: { type: 'solid', color: '#111827' }, preview: '#111827' },
];

export const STICKERS: StickerAsset[] = [
  // Faces
  { id: 's1',  emoji: '😊', label: 'שמח' },
  { id: 's2',  emoji: '😢', label: 'עצוב' },
  { id: 's3',  emoji: '😡', label: 'כועס' },
  { id: 's4',  emoji: '😮', label: 'מופתע' },
  { id: 's5',  emoji: '😂', label: 'מצחיק' },
  { id: 's6',  emoji: '😴', label: 'ישן' },
  { id: 's7',  emoji: '🤔', label: 'חושב' },
  { id: 's8',  emoji: '😎', label: 'מגניב' },
  // Animals
  { id: 's9',  emoji: '🐶', label: 'כלב' },
  { id: 's10', emoji: '🐱', label: 'חתול' },
  { id: 's11', emoji: '🐰', label: 'ארנב' },
  { id: 's12', emoji: '🦊', label: 'שועל' },
  { id: 's13', emoji: '🐻', label: 'דב' },
  { id: 's14', emoji: '🦁', label: 'אריה' },
  { id: 's15', emoji: '🐸', label: 'צפרדע' },
  { id: 's16', emoji: '🦋', label: 'פרפר' },
  // Effects / Nature
  { id: 's17', emoji: '⭐', label: 'כוכב' },
  { id: 's18', emoji: '❤️', label: 'לב' },
  { id: 's19', emoji: '💥', label: 'פיצוץ' },
  { id: 's20', emoji: '💫', label: 'נצנץ' },
  { id: 's21', emoji: '❓', label: 'שאלה' },
  { id: 's22', emoji: '❗', label: 'קריאה' },
  { id: 's23', emoji: '☀️', label: 'שמש' },
  { id: 's24', emoji: '🌈', label: 'קשת' },
  { id: 's25', emoji: '⚡', label: 'ברק' },
  { id: 's26', emoji: '🔥', label: 'אש' },
  { id: 's27', emoji: '💧', label: 'טיפה' },
  { id: 's28', emoji: '🌸', label: 'פרח' },
  // Objects
  { id: 's29', emoji: '🏠', label: 'בית' },
  { id: 's30', emoji: '🚀', label: 'רקטה' },
  { id: 's31', emoji: '⚔️', label: 'חרב' },
  { id: 's32', emoji: '🎵', label: 'מוזיקה' },
  { id: 's33', emoji: '🍕', label: 'פיצה' },
  { id: 's34', emoji: '🏆', label: 'גביע' },
  { id: 's35', emoji: '💎', label: 'יהלום' },
  { id: 's36', emoji: '🎮', label: 'משחק' },
];
