import HomePage from '@pages/HomePage';
import DemoPage from '@pages/DemoPage';

import { type Route } from './index';

export const routes: Route[] = [
  {
    path: '/',
    component: <HomePage />,
  },
  {
    path: '/demo',
    component: <DemoPage />,
  },
];
