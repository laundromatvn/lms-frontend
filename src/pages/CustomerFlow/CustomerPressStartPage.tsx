import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from 'antd';

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
      <Instruction
        instruction={t('customerFlow.pleasePressStart')}
        imageUrl={pressStartImage}
        style={{ height: 'calc(100% - 64px)' }}
      >
        <Box
          vertical
          justify="center"
          align="center"
          gap={theme.custom.spacing.medium}
          style={{
            backgroundColor: theme.custom.colors.warning.light,
            padding: theme.custom.spacing.large,
          }}>
          <Siren size={48} weight='BoldDuotone' color={theme.custom.colors.danger.default} />

          <Typography.Text>
            {t('customerFlow.warningIfNotPressStart', { time: formatTime(timeLeft) })}
          </Typography.Text>

          <Typography.Text color={theme.custom.colors.danger.default}>
            {t('customerFlow.yourOrderWillBeNotRefundable')}
          </Typography.Text>
        </Box>
      </Instruction>

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
