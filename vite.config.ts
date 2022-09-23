import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import type { ConfigEnv, UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_PORT, VITE_PUBLIC_PATH } = env
  return {
    base: VITE_PUBLIC_PATH,
    plugins: [
      uni(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      }),
      Unocss(),
    ],
    optimizeDeps: ['@dcloudio/uni-ui'],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src'),
        },
      ],
      server: {
        host: true,
        port: Number(VITE_PORT),
      },
    },
  }
})