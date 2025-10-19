import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

// Removed destructive clears on mount to preserve kiosk auth/session/default route

import { Logo } from '@shared/components/common/Logo';
import { CenteredLayout } from '@shared/components/layouts/CenteredLayout';

export const HomePage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const navigate = useNavigate();

  // Do not clear storage here; kiosk should retain auth/default route across reloads

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
