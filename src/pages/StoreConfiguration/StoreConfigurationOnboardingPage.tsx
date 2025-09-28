import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from 'antd';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';


export const StoreConfigurationOnboardingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={2}>{t('storeConfiguration.selectStore')}</Typography.Title>
    </DefaultLayout>
  );
};
