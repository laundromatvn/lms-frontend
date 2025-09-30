import { HomePage } from '@pages/HomePage';
import { DemoPage } from '@pages/DemoPage';

import { SignInPage } from '@pages/Auth';
import { GenerateOTPPage } from '@pages/Auth/GenerateOTPPage';
import { VerifyOTPPage } from '@pages/Auth/VerifyOTPPage';

import { StoreListingPage } from '@pages/StoreConfiguration/StoreListingPage';
import { StoreDetailPage } from '@pages/StoreConfiguration/StoreDetailPage';

import { CustomerWelcomePage } from '@pages/CustomerFlow';
import { CustomerLoadClothesPage } from '@pages/CustomerFlow';
import { CustomerSelectMachinePage } from '@pages/CustomerFlow';
import { CustomerOrderOverviewPage } from '@pages/CustomerFlow/CustomerOrderOverviewPage';
import { CustomerPaymentPage } from '@pages/CustomerFlow/CustomerPaymentPage';
import { CustomerSuccessPage } from '@pages/CustomerFlow/CustomerSuccessPage';
import { CustomerFailedPage } from '@pages/CustomerFlow/CustomerFailedPage';


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
  // Auth
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
  // Store Configuration
  {
    path: '/store-configuration/stores',
    component: <StoreListingPage />,
  },
  {
    path: '/store-configuration/stores/:storeId',
    component: <StoreDetailPage />,
  },
  // Customer Flow
  {
    path: '/customer-flow/welcome',
    component: <CustomerWelcomePage />,
  },
  {
    path: '/customer-flow/load-clothes',
    component: <CustomerLoadClothesPage />,
  },
  {
    path: '/customer-flow/select-machines',
    component: <CustomerSelectMachinePage />,
  },
  {
    path: '/customer-flow/order-overview',
    component: <CustomerOrderOverviewPage />,
  },
  {
    path: '/customer-flow/payment',
    component: <CustomerPaymentPage />,
  },
  {
    path: '/customer-flow/success',
    component: <CustomerSuccessPage />,
  },
  {
    path: '/customer-flow/failed',
    component: <CustomerFailedPage />,
  },
];
