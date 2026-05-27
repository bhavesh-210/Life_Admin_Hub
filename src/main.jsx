// App entry point: render React app into #root
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LifeAdminProvider } from './context/LifeAdminContext';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    // BrowserRouter wraps the app for client-side routing
    <BrowserRouter>
        <LifeAdminProvider>
            <App />
        </LifeAdminProvider>
    </BrowserRouter>,
);

