import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography, QRCode, Spin } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

interface PaymentMethodDetailsProps {
  selectedMethod: PaymentMethodEnum;
  qrCode?: string | null;
  loading?: boolean;
  style?: React.CSSProperties;
  remainingSeconds?: number;
}

export const PaymentMethodDetails: React.FC<PaymentMethodDetailsProps> = ({ selectedMethod, qrCode, loading, style, remainingSeconds }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatTime = (totalSeconds: number) => {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;
    return `${minutes}:${String(restSeconds).padStart(2, '0')}`;
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        border: `1px solid ${theme.custom.colors.neutral[200]}`,
        borderRadius: theme.custom.radius.large,
        padding: theme.custom.spacing.medium,
        background: theme.custom.colors.background.surface,
        ...style,
      }}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        gap={theme.custom.spacing.medium}
        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
      >
        {selectedMethod === PaymentMethodEnum.QR ? (
          qrCode ? (
            <>
              <QRCode size={360} value={qrCode} />
              <Typography.Text>{t('customerFlow.scanToPay')}</Typography.Text>
              {typeof remainingSeconds === 'number' && (
                <Typography.Text type="secondary">
                  {t('customerFlow.qrExpiresIn', { time: formatTime(remainingSeconds) })}
                </Typography.Text>
              )}
            </>
          ) : (
            <>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {t('customerFlow.qr')}
              </Typography.Title>
              <Spin size="large" />
              <Typography.Text type="secondary">
                {loading ? t('common.loading') : t('customerFlow.waitingForQrCode')}
              </Typography.Text>
            </>
          )
        ) : (
          <>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {t('customerFlow.card')}
            </Typography.Title>
            <Typography.Text type="secondary">
              {t('customerFlow.paymentCardComingSoon')}
            </Typography.Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};
