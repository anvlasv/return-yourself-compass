import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from "./contexts/LanguageContext";
import { TelegramProvider } from "./contexts/TelegramContext";

createRoot(document.getElementById("root")!).render(
  <TelegramProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </TelegramProvider>
);
