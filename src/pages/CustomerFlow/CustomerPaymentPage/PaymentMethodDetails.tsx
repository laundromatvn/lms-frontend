import React from 'react';

import { Flex } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

import { QRPaymentMethod } from './QRPaymentMethod';
import { CardPaymentMethod } from './CardPaymentMethod';

interface PaymentMethodDetailsProps {
  selectedMethod: PaymentMethodEnum;
  qrCode?: string | null;
  transactionCode?: string | null;
  loading?: boolean;
  style?: React.CSSProperties;
  remainingSeconds?: number;
}

export const PaymentMethodDetails: React.FC<PaymentMethodDetailsProps> = ({ 
  selectedMethod, 
  qrCode, 
  transactionCode, 
  loading, 
  style, 
  remainingSeconds 
}) => {
  const theme = useTheme();

  const renderPaymentMethod = () => {
    switch (selectedMethod) {
      case PaymentMethodEnum.QR:
        return (
          <QRPaymentMethod
            qrCode={qrCode}
            transactionCode={transactionCode}
            loading={loading}
            remainingSeconds={remainingSeconds}
          />
        );
      case PaymentMethodEnum.CARD:
        return <CardPaymentMethod />;
      default:
        return null;
    }
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
        {renderPaymentMethod()}
      </Flex>
    </Flex>
  );
};
