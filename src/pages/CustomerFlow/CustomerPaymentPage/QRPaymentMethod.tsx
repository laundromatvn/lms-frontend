import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography, QRCode, Spin } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';

interface QRPaymentMethodProps {
  qrCode?: string | null;
  transactionCode?: string | null;
  loading?: boolean;
  remainingSeconds?: number;
}

export const QRPaymentMethod: React.FC<QRPaymentMethodProps> = ({ 
  qrCode, 
  transactionCode, 
  loading, 
  remainingSeconds 
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatTime = (totalSeconds: number) => {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;
    return `${minutes}:${String(restSeconds).padStart(2, '0')}`;
  };

  if (qrCode) {
    return (
      <Flex align="center" justify="center" gap={theme.custom.spacing.large}>
        <QRCode 
          size={200} 
          value={qrCode} 
          style={{ backgroundColor: theme.custom.colors.background.light }}
        />

        <Flex vertical align="flex-start" justify="center" gap={theme.custom.spacing.small} style={{ width: 400 }}>
          <Typography.Text strong style={{ fontSize: theme.custom.fontSize.xxlarge }}>
            {t('customerFlow.scanToPay')}
          </Typography.Text>

          <Typography.Text type="secondary" style={{ fontSize: theme.custom.fontSize.large }}>
            {t('customerFlow.pleaseEnsureThisTransactionCodeInPaymentContent')}
          </Typography.Text>

          <Box
            align="center"
            style={{
              width: '100%',
              border: `1px solid ${theme.custom.colors.neutral[200]}`,
              borderRadius: theme.custom.radius.large,
              padding: theme.custom.spacing.medium,
              fontSize: theme.custom.fontSize.xxlarge,
            }}
          >
            {transactionCode}
          </Box>

          {typeof remainingSeconds === 'number' && (
            <Typography.Text type="secondary" style={{ fontSize: theme.custom.fontSize.large }}>
              {t('customerFlow.qrExpiresIn', { time: formatTime(remainingSeconds) })}
            </Typography.Text>
          )}
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {t('customerFlow.qr')}
      </Typography.Title>
      <Spin size="large" />
      <Typography.Text type="secondary">
        {loading ? t('common.loading') : t('customerFlow.waitingForQrCode')}
      </Typography.Text>
    </>
  );
};
