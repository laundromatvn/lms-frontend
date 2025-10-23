import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Typography } from 'antd';

import { Siren } from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';
import { useCountdown } from '@shared/hooks/useCountdown';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { Box } from '@shared/components/Box';

import { Instruction } from './components/Instruction';

import pressStartImage from '@public/customerFlow/pressStart.png';

const WARNING_TIME = 300;

export const CustomerPressStartPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationButtonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
    fontSize: theme.custom.fontSize.xxlarge,
  };

  useInactivityRedirect({ timeoutMs: WARNING_TIME * 1000, targetPath: '/customer-flow/welcome' });

  const { timeLeft, start, formatTime } = useCountdown({
    initialTime: WARNING_TIME,
    onComplete: () => {
      navigate('/customer-flow/welcome');
    },
  });

  useEffect(() => {
    start();
  }, [start]);

  return (
    <DefaultLayout>
      <Flex
        vertical
        align="space-between"
        justify="center"
        gap={theme.custom.spacing.medium}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      >
        <div
          style={{
            backgroundImage: `url(${pressStartImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '80%',
          }}
        />

        <Box
          vertical
          border
          justify="center"
          align="center"
          style={{
            width: '100%',
            borderColor: theme.custom.colors.primary.default,
            backgroundColor: theme.custom.colors.primary.light,
          }}
        >
          <Typography.Text
            style={{
              fontSize: theme.custom.fontSize.xxxlarge,
              fontWeight: theme.custom.fontWeight.medium,
              color: theme.custom.colors.primary.default,
            }}
          >
            {t('customerFlow.pleasePressStart')}
          </Typography.Text>
        </Box>

        <Box
          border
          justify="center"
          align="flex-start"
          gap={theme.custom.spacing.medium}
          style={{
            width: '100%',
            padding: theme.custom.spacing.large,
            backgroundColor: theme.custom.colors.warning.light,
            border: `2px solid ${theme.custom.colors.warning.default}`,
          }}
        >
          <Siren
            size={48}
            weight='BoldDuotone'
            color={theme.custom.colors.danger.default}
            style={{ marginRight: theme.custom.spacing.medium }}
          />

          <Flex vertical align="flex-start" justify="center" gap={theme.custom.spacing.medium}>
            <Typography.Text>
              {t('customerFlow.warningIfNotPressStart', { time: formatTime(timeLeft) })}
            </Typography.Text>

            <Typography.Text strong style={{ color: theme.custom.colors.danger.default }}>
              {t('customerFlow.yourOrderWillBeNotRefundable')}
            </Typography.Text>
          </Flex>
        </Box>
      </Flex>

      <LeftRightSection
        left={null}
        right={(
          <Button
            type="primary"
            size="large"
            style={navigationButtonStyle}
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
