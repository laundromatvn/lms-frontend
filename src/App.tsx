import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@shared/theme/ThemeProvider';

import AppRouter from './router';
import { routes } from './router/routes';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className="app">
          <div className="main-layout">
            <main className="content">
              <AppRouter routes={routes} />
            </main>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;