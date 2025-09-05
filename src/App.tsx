import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@shared/theme/ThemeProvider';

import AppRouter from './router';
import { routes } from './router/routes';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AppRouter routes={routes} />
      </ThemeProvider>
    </Router>
  );
};

export default App;