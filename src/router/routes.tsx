import { HomePage } from '@pages/HomePage';
import { DemoPage } from '@pages/DemoPage';

import { SignInByQRPage } from '@pages/Auth/SignInByQRPage';
import { GenerateOTPPage } from '@pages/Auth/GenerateOTPPage';
import { WaitingSSOAuthenticationPage } from '@pages/Auth/WaitingSSOAuthenticationPage';

import { StoreListingPage } from '@pages/StoreConfiguration/StoreListingPage';
import { StoreDetailPage } from '@pages/StoreConfiguration/StoreDetailPage';

import { CustomerWelcomePage } from '@pages/CustomerFlow';
import { CustomerLoadClothesPage } from '@pages/CustomerFlow';
import { CustomerSelectMachinePage } from '@pages/CustomerFlow';
import { CustomerOrderOverviewPage } from '@pages/CustomerFlow/CustomerOrderOverviewPage';
import { CustomerPaymentPage } from '@pages/CustomerFlow/CustomerPaymentPage';
import { CustomerSuccessPage } from '@pages/CustomerFlow/CustomerSuccessPage';
import { CustomerFailedPage } from '@pages/CustomerFlow/CustomerFailedPage';
import { CustomerPressStartPage } from '@pages/CustomerFlow/CustomerPressStartPage';

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
    component: <SignInByQRPage />,
  },
  {
    path: '/auth/generate-otp',
    component: <GenerateOTPPage />,
  },
  {
    path: '/auth/waiting-sso-authentication',
    component: <WaitingSSOAuthenticationPage />,
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
  {
    path: '/customer-flow/press-start',
    component: <CustomerPressStartPage />,
  }
];
