import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, Flex, Button } from 'antd';

import { 
  SadSquare,
} from '@solar-icons/react'

import { useTheme } from '@shared/theme/useTheme';

interface Props {
  onClose: () => void;
}

export const FailedStep: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [remainingMs, setRemainingMs] = useState<number>(5000);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemainingMs(prev => {
        const next = prev - 1000;
        return next <= 0 ? 0 : next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (remainingMs <= 0) {
      onClose();
    }
  }, [remainingMs, onClose]);

  return (
    <Flex vertical align="center" justify="center" style={{ height: '100%', gap: 16 }}>
      <SadSquare color={theme.custom.colors.danger.default} weight='BoldDuotone' width={96} height={96} />
      <Typography.Text type="secondary">{t('messages.failed')}</Typography.Text>
      <Typography.Text type="secondary">
        {t('modals.authGuard.countdown', { seconds: Math.ceil(remainingMs / 1000), unit: 's' })}
      </Typography.Text>
      <Button type="primary" onClick={onClose}>{t('common.close')}</Button>
    </Flex>
  );
};


