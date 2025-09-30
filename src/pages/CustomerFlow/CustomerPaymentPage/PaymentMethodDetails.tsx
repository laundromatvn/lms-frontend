import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography, QRCode } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

interface PaymentMethodDetailsProps {
  selectedMethod: PaymentMethodEnum;
  style?: React.CSSProperties;
}

export const PaymentMethodDetails: React.FC<PaymentMethodDetailsProps> = ({ selectedMethod, style }) => {
  const { t } = useTranslation();
  const theme = useTheme();

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
          <>
            <QRCode value="https://washgo247.example/pay?order=demo" size={400} />
            <Typography.Text>{t('customerFlow.scanToPay')}</Typography.Text>
          </>
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
