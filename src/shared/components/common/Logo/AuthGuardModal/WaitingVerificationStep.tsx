import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, Flex } from 'antd';

import { EmojiFunnySquare } from '@solar-icons/react'

import { useTheme } from '@shared/theme/useTheme';

interface Props {
  remainingMs: number;
}

export const WaitingVerificationStep: React.FC<Props> = ({ remainingMs }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Flex vertical align="center" justify="center" style={{ height: '100%', gap: 16 }}>
      <EmojiFunnySquare color={theme.custom.colors.warning.default} weight='BoldDuotone' width={96} height={96} />
      <Typography.Text type="secondary">{t('messages.pleaseWaitABitWeAreProcessingYourRequest')}</Typography.Text>
      <Typography.Text type="secondary">
      {t('messages.sessionExpiresIn', { time: `${Math.ceil(remainingMs / 1000)}s` })}
      </Typography.Text>
    </Flex>
  );
};


