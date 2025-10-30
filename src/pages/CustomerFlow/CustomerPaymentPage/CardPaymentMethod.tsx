import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from 'antd';

interface CardPaymentMethodProps {
  // Future props for card payment can be added here
  // For example: cardNumber, expiryDate, cvv, etc.
}

export const CardPaymentMethod: React.FC<CardPaymentMethodProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {t('customerFlow.card')}
      </Typography.Title>
      <Typography.Text type="secondary">
        {t('customerFlow.paymentCardComingSoon')}
      </Typography.Text>
    </>
  );
};
