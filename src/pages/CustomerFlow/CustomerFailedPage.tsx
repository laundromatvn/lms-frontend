import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Image } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { PaymentMessage } from './components/PaymentMessage';
import { Box } from '@shared/components/Box';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';

import paymentFailedImage from '@public/customerFlow/paymentFailed.png';

export const CustomerFailedPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationButtonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
    fontSize: theme.custom.fontSize.xxlarge,
  };

  // Auto-reset after 90s of inactivity back to welcome
  useInactivityRedirect({ timeoutMs: 90_000, targetPath: '/customer-flow/welcome' });

  return (
    <DefaultLayout>
      <Flex
        vertical
        align="align"
        justify="flex-start"
        style={{ height: '100%' }}
        gap={theme.custom.spacing.medium}
      >
        <PaymentMessage type="failed" title={t('customerFlow.paymentFailed')} message={t('customerFlow.pleaseTryAgain')} />

        <Box
          vertical
          border
          justify="center"
          align="center"
          gap={theme.custom.spacing.medium}
          style={{
            width: '100%',
            height: '100%',
            borderColor: theme.custom.colors.info.default,
            backgroundColor: theme.custom.colors.info.light,
          }}
        >
          <Image src={paymentFailedImage} alt="failed" width={240} height={240} preview={false} />

          <Button
            type="primary"
            size="large"
            style={navigationButtonStyle}
            onClick={() => navigate('/customer-flow/welcome')}
          >
            {t('common.tryAgain')}
          </Button>
        </Box>
      </Flex>
    </DefaultLayout>
  );
};
