import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Typography, notification, QRCode } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { PaymentMethodSelection } from './PaymentMethodSelection';

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
