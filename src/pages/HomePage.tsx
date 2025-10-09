import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { oneTimeTokenStorage } from '@core/storage/oneTimeTokenStorage';
import { orderStorage } from '@core/storage/orderStorage';
import { paymentStorage } from '@core/storage/paymentStorage';
import { selectMachineStorage } from '@core/storage/selectMachineStorage';
import { storeStorage } from '@core/storage/storeStorage';
import { tenantStorage } from '@core/storage/tenantStorage';
import { tokenManager } from '@core/auth/tokenManager';
import { tokenStorage } from '@core/storage/tokenStorage';
import { userStorage } from '@core/storage/userStorage';

import { Logo } from '@shared/components/common/Logo';
import { CenteredLayout } from '@shared/components/layouts/CenteredLayout';

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    oneTimeTokenStorage.clear();
    orderStorage.clear();
    paymentStorage.clear();
    selectMachineStorage.clear();
    storeStorage.clear();
    tenantStorage.clear();
    tokenManager.clear();
    tokenStorage.clear();
    userStorage.clear();
  }, []);

  return (
    <CenteredLayout>
        <Logo size="xlarge" />

        <Button
          type="primary"
          size="large"
          style={{
            minWidth: 128,
            borderRadius: theme.custom.radius.full,
            padding: theme.custom.spacing.medium,
          }}
          onClick={() => navigate('/auth/sign-in')}
        >
          {t('common.signIn')}
        </Button>
    </CenteredLayout>
  );
};
