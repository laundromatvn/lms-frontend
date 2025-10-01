import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Image } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { Instruction } from './components/Instruction';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';

import pressStartImage from '@public/customerFlow/pressStart.png';

export const CustomerPressStartPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  // Auto-reset after 90s of inactivity back to welcome
  useInactivityRedirect({ timeoutMs: 90_000, targetPath: '/customer-flow/welcome' });

  return (
    <DefaultLayout>
      <Instruction
        instruction={t('customerFlow.pleasePressStart')}
        imageUrl={pressStartImage}
        style={{ height: 'calc(100% - 64px)' }}
      />

      <LeftRightSection
        left={null}
        right={(
          <Button
            type="primary"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate('/customer-flow/welcome')}
          >
            {t('common.done')}
          </Button>
        )}
        align="flex-end"
        style={{ height: 64 }}
      />
    </DefaultLayout>
  );
};
