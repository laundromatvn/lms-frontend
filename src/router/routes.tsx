import { HomePage } from '@pages/HomePage';
import { DemoPage } from '@pages/DemoPage';

import { SignInPage } from '@pages/Auth';
import { GenerateOTPPage } from '@pages/Auth/GenerateOTPPage';
import { VerifyOTPPage } from '@pages/Auth/VerifyOTPPage';

import { StoreListingPage } from '@pages/StoreConfiguration/StoreListingPage';
import { StoreDetailPage } from '@pages/StoreConfiguration/StoreDetailPage';


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
  {
    path: '/auth/sign-in',
    component: <SignInPage />,
  },
  {
    path: '/auth/generate-otp',
    component: <GenerateOTPPage />,
  },
  {
    path: '/auth/verify-otp',
    component: <VerifyOTPPage />,
  },
  {
    path: '/store-configuration/stores',
    component: <StoreListingPage />,
  },
  {
    path: '/store-configuration/stores/:storeId',
    component: <StoreDetailPage />,
  },
];
