import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from '@components/Preloader/Preloader.tsx';
import { persistor, store } from '@store/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
< Provider store={store}>
            <PersistGate loading={<Preloader minLoadingTime={800} />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
  </StrictMode>,
)
