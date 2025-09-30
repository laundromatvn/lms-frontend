import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Typography, notification } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { PaymentMethodSelection } from './PaymentMethodSelection';
import { PaymentMethodDetails } from './PaymentMethodDetails';

export const CustomerPaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethodEnum>(PaymentMethodEnum.QR);

  const paymentMethodOptions = [
    { label: t('customerFlow.qr'), value: PaymentMethodEnum.QR },
    { label: t('customerFlow.card'), value: PaymentMethodEnum.CARD },
  ];

  const handlePay = () => {
    if (selectedMethod === PaymentMethodEnum.QR) {
      api.success({
        message: t('customerFlow.paymentSuccess'),
      });
      return;
    }

    api.info({
      message: t('customerFlow.paymentCardComingSoon'),
    });
  };

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      {contextHolder}

      <Typography.Title level={2}>
        {t('customerFlow.payment')}
      </Typography.Title>

      <Flex
        vertical
        align="center"
        gap={theme.custom.spacing.medium}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
        }}
      >
        <Flex vertical align="flex-start" style={{ width: '100%' }} gap={theme.custom.spacing.medium}>
          <Typography.Text type="secondary">
            {t('customerFlow.selectPaymentMethod')}
          </Typography.Text>

          <PaymentMethodSelection
            options={paymentMethodOptions}
            selectedMethod={selectedMethod}
            onSelect={setSelectedMethod}
          />
        </Flex>

        <PaymentMethodDetails selectedMethod={selectedMethod} />
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate('/customer-flow/order-overview')}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={handlePay}
          >
            {t('common.pay')}
          </Button>
        )}
      />
    </DefaultLayout>
  );
};
