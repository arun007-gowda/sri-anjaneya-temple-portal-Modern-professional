import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function dynamicApiPlugin(): Plugin {
  const dataDir = path.resolve('.data');
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch (_) {}
  }
  const photosFile = path.join(dataDir, 'photos.json');
  const storiesFile = path.join(dataDir, 'stories.json');

  const readJson = (file: string) => {
    try {
      if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
      }
    } catch (_) {}
    return [];
  };

  const writeJson = (file: string, data: any) => {
    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    } catch (_) {}
  };

  return {
    name: 'dynamic-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/photos') {
          if (req.method === 'GET') {
            const data = readJson(photosFile);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data }));
            return;
          }
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const photo = JSON.parse(body);
                const list = readJson(photosFile);
                const newPhoto = {
                  ...photo,
                  id: photo.id || `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                  created_at: new Date().toISOString(),
                  status: 'APPROVED',
                };
                list.unshift(newPhoto);
                writeJson(photosFile, list);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, data: newPhoto }));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }
        }

        if (req.url === '/api/stories') {
          if (req.method === 'GET') {
            const data = readJson(storiesFile);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, data }));
            return;
          }
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const story = JSON.parse(body);
                const list = readJson(storiesFile);
                const newStory = {
                  ...story,
                  id: story.id || `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                  created_at: new Date().toISOString(),
                  approved: true,
                };
                list.unshift(newStory);
                writeJson(storiesFile, list);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, data: newStory }));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), dynamicApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

