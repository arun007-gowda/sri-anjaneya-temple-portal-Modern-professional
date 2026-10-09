import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const dataDir = path.join(__dirname, '.data');

if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (_) {}
}

const photosFile = path.join(dataDir, 'photos.json');
const storiesFile = path.join(dataDir, 'stories.json');
const updatesFile = path.join(dataDir, 'updates.json');

const readJsonFile = (filePath, defaultVal = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading JSON file:', filePath, err);
  }
  return defaultVal;
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing JSON file:', filePath, err);
  }
};

app.use(express.json({ limit: '15mb' }));

// Lightweight health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Dynamic API endpoints for user-pushed photos and stories
app.get('/api/photos', (_req, res) => {
  const photos = readJsonFile(photosFile, []);
  res.status(200).json({ success: true, data: photos });
});

app.post('/api/photos', (req, res) => {
  try {
    const photo = req.body;
    if (!photo) return res.status(400).json({ error: 'Missing photo payload' });
    const photos = readJsonFile(photosFile, []);
    const newPhoto = {
      ...photo,
      id: photo.id || `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
      status: 'APPROVED', // Auto-approve community photos for dynamic live upgrade
    };
    photos.unshift(newPhoto);
    writeJsonFile(photosFile, photos);
    res.status(200).json({ success: true, data: newPhoto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stories', (_req, res) => {
  const stories = readJsonFile(storiesFile, []);
  res.status(200).json({ success: true, data: stories });
});

app.post('/api/stories', (req, res) => {
  try {
    const story = req.body;
    if (!story) return res.status(400).json({ error: 'Missing story payload' });
    const stories = readJsonFile(storiesFile, []);
    const newStory = {
      ...story,
      id: story.id || `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
      approved: true, // Auto-approve community stories for dynamic live upgrade
    };
    stories.unshift(newStory);
    writeJsonFile(storiesFile, stories);
    res.status(200).json({ success: true, data: newStory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dynamic API endpoints for public pushed temple data & announcements
app.get('/api/temple-updates', (_req, res) => {
  const updates = readJsonFile(updatesFile, []);
  res.status(200).json({ success: true, data: updates });
});

app.post('/api/temple-updates', (req, res) => {
  try {
    const update = req.body;
    if (!update) return res.status(400).json({ error: 'Missing update payload' });
    const updates = readJsonFile(updatesFile, []);
    const newUpdate = {
      ...update,
      id: update.id || `upd-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
      status: 'APPROVED',
    };
    updates.unshift(newUpdate);
    writeJsonFile(updatesFile, updates);
    res.status(200).json({ success: true, data: newUpdate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static assets
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1h',
    etag: true,
  }));
}

// SPA fallback for all HTML/navigation requests
app.get('*', (_req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Anjaneya Swamy Temple</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>Anjaneya Swamy Temple, Thappagondanahalli</h2>
          <p>Application is initializing. Please refresh in a few moments.</p>
        </body>
      </html>
    `);
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`[production] Server running at http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error('[server error]', err);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

