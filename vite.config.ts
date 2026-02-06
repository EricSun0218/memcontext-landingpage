import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // API 代理配置
      proxy: {
        '/api': {
          target: 'http://192.168.22.16:5019', // 主项目后端地址
          changeOrigin: true,
          rewrite: (path) => path,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log(`代理请求: ${req.method} ${req.url} → ${options.target}${req.url}`);
            });
          }
        },
        // Supabase API 代理（如果需要）
        '/supabase-api': {
          target: env.VITE_SUPABASE_URL || 'http://192.168.22.111:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/supabase-api/, ''),
          // 添加认证头（如果需要）
          headers: {
            'Authorization': `Bearer ${env.VITE_SUPABASE_ANON_KEY}`,
            'apikey': env.VITE_SUPABASE_ANON_KEY
          }
        }
      }
    },
    plugins: [react()],
    define: {
      // 主网站环境变量
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL || '/api'),
      
      // Dashboard 环境变量（兼容 process.env 和 import.meta.env）
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@dashboard': path.resolve(__dirname, './dashboard'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@main': path.resolve(__dirname, './src')
      }
    },
    // 构建配置
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['lucide-react', 'react-icons'],
            'dashboard-vendor': ['@supabase/supabase-js', 'recharts'],
            'radix-ui': ['@radix-ui/react-tabs', '@radix-ui/react-dropdown-menu', '@radix-ui/react-progress']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      // 代码分割优化
      chunkSizeWarningLimit: 1000,
      minify: mode === 'production' ? 'terser' : false,
      terserOptions: mode === 'production' ? {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      } : undefined
    },
    // CSS 配置
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    },
    // 环境变量加载
    envPrefix: ['VITE_', 'GEMINI_'], // 允许加载的环境变量前缀
    // 预加载配置
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'lucide-react'
      ],
      exclude: ['@radix-ui/react-tabs', '@radix-ui/react-dropdown-menu']
    }
  };
});