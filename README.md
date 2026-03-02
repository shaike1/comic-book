# 🎨 יוצר הקומיקס לילדים

פלטפורמה ליצירת קומיקסים לילדים — גם אלה שיכולת הציור שלהם לא גבוהה!

## הרצה מהירה

```bash
npm install
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

## טכנולוגיות

| שכבה      | טכנולוגיה                          |
|-----------|------------------------------------|
| Frontend  | React 18 + TypeScript + Vite       |
| סטייל     | Tailwind CSS (RTL עברית)           |
| State     | Zustand                            |
| Backend   | Express + TypeScript               |
| Database  | SQLite (better-sqlite3)            |
| דמויות    | Dicebear API (חינמי, ללא API key)  |
| ייצוא     | html2canvas                        |

## פיצ'רים

- **20 דמויות** מוכנות (ילדים, רובוטים, אווטרים)
- **16 רקעים** (שמיים, יער, חלל, מדבר...)
- **36 מדבקות** אמוג'י
- **3 סוגי בועות דיבור** (דיבור, מחשבה, צעקה)
- גרירה ושחרור של כל האלמנטים
- שינוי גודל בגרירה
- הפיכת דמות (שמאל/ימין)
- שכבות (הבא לפני / שלח אחורה)
- **שמירה אוטומטית** לשרת (כל 2 שניות)
- ייצוא פאנל בודד או כל הקומיקס כ-PNG

## מבנה הפרויקט

```
comic-book/
├── server/          # Express API + SQLite
│   └── src/
│       ├── index.ts
│       ├── database.ts
│       └── routes/comics.ts
└── client/          # React App
    └── src/
        ├── pages/   # HomePage, EditorPage
        ├── components/editor/
        │   ├── ComicEditor.tsx   # Main editor layout
        │   ├── PanelList.tsx     # Left sidebar
        │   ├── PanelCanvas.tsx   # Drawing canvas
        │   ├── AssetPanel.tsx    # Right sidebar
        │   ├── DraggableElement.tsx
        │   └── SpeechBubble.tsx
        ├── store/editorStore.ts  # Zustand state
        ├── hooks/useAutoSave.ts
        ├── data/assets.ts        # Characters, backgrounds, stickers
        └── types/comic.ts
```
