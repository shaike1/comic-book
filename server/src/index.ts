import express from 'express';
import cors from 'cors';
import path from 'path';
import { comicsRouter } from './routes/comics';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// API routes
app.use('/api/comics', comicsRouter);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: '🎨 Comic Creator API' });
});

// Serve the built React app
// __dirname = server/src  →  ../../client/dist
// __dirname = <project>/server/src  → ../../client/dist = <project>/client/dist
const clientDist = path.join(__dirname, '..', '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server + UI running on http://0.0.0.0:${PORT}`);
});
