import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import "./global.css"
import { WeChatProvider } from './context/wechatProvider.tsx'

import "./i18n";
import { FixedToastProvider } from './context/fixedToastProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <WeChatProvider>
            <FixedToastProvider>
                <App />
            </FixedToastProvider>
        </WeChatProvider>
  </StrictMode>
)