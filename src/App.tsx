import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@shared/theme/ThemeProvider';
import { tokenManager } from '@core/auth/tokenManager';
import { PROACTIVE_REFRESH_CHECK_INTERVAL_MS, FORCE_ACCESS_REFRESH_INTERVAL_MS, FORCE_REFRESH_ROTATION_INTERVAL_MS } from '@core/constant';

import AppRouter from './router';
import { routes } from './router/routes';

const App: React.FC = () => {
  useEffect(() => {
    const proactiveId = setInterval(() => {
      tokenManager.proactiveRefresh();
    }, PROACTIVE_REFRESH_CHECK_INTERVAL_MS);

    const forceAccessId = setInterval(() => {
      tokenManager.refreshAccessNow();
    }, FORCE_ACCESS_REFRESH_INTERVAL_MS);

    const rotateRefreshId = setInterval(() => {
      tokenManager.rotateRefreshTokenNow();
    }, FORCE_REFRESH_ROTATION_INTERVAL_MS);

    return () => {
      clearInterval(proactiveId);
      clearInterval(forceAccessId);
      clearInterval(rotateRefreshId);
    };
  }, []);
  return (
    <Router>
      <ThemeProvider>
        <AppRouter routes={routes} />
      </ThemeProvider>
    </Router>
  );
};

export default App;