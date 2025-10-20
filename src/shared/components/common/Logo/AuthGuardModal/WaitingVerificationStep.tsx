import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from 'antd';

import { EmojiFunnySquare } from '@solar-icons/react'

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';

interface Props {
  remainingMs: number;
}

export const WaitingVerificationStep: React.FC<Props> = ({ remainingMs }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        height: '100%',
        gap: 16,
      }}
      gap={theme.custom.spacing.medium}
    >
      <EmojiFunnySquare color={theme.custom.colors.warning.default} weight='BoldDuotone' width={96} height={96} />
      <Typography.Text type="secondary">{t('messages.pleaseWaitABitWeAreProcessingYourRequest')}</Typography.Text>
      <Typography.Text type="secondary">
      {t('messages.sessionExpiresIn', { time: `${Math.ceil(remainingMs / 1000)}s` })}
      </Typography.Text>
    </Box>
  );
};


