import { HomePage } from '@pages/HomePage';
import { DemoPage } from '@pages/DemoPage';
import { SignInPage } from '@pages/Auth';

import { type Route } from './index';
import { StoreConfigurationOnboardingPage } from '@pages/StoreConfiguration/StoreConfigurationOnboardingPage';

export const routes: Route[] = [
  {
    path: '/',
    component: <HomePage />,
  },
  {
    path: '/demo',
    component: <DemoPage />,
  },
  {
    path: '/sign-in',
    component: <SignInPage />,
  },
  {
    path: '/store-configuration/onboarding',
    component: <StoreConfigurationOnboardingPage />,
  },
];
