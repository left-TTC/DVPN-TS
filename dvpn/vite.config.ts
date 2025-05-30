import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 自定义插件：为 .apk 文件设置正确的 MIME 类型
function apkMimeTypePlugin() {
  return {
    name: 'set-apk-mime-type',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url?.endsWith('.apk')) {
          res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: './', 
  plugins: [
    react(),
    apkMimeTypePlugin()
  ],
  build: {
    outDir: 'dist',
  }
});
