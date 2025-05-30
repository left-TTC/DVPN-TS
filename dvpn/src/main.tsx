import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import "./global.css"
import { WeChatProvider } from './context/wechatProvider.tsx'

import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeChatProvider>
      <App />
    </WeChatProvider>
  </StrictMode>
)