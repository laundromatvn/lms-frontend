import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Typography } from 'antd';

import { CheckCircle } from '@solar-icons/react'

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';

interface Props {
  onClose: () => void;
}

export const SuccessStep: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

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
      navigate('/store-configuration/stores');
    }
  }, [remainingMs, navigate]);

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
      <CheckCircle color={theme.custom.colors.success.default} weight='BoldDuotone' width={96} height={96} />
      <Typography.Text type="secondary">{t('common.success')}</Typography.Text>
      <Typography.Text type="secondary">
        {t('messages.sessionExpiresIn', { time: `${Math.ceil(remainingMs / 1000)}s` })}
      </Typography.Text>
    </Box>
  );
};


