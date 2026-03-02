import express from 'express';
import cors from 'cors';
import { comicsRouter } from './routes/comics';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/comics', comicsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: '🎨 Comic Creator API' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
