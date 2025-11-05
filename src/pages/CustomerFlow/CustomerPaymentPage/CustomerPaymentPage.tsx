import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Skeleton, Typography } from 'antd';

import { Gift } from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';
import { type Payment } from '@shared/types/Payment';

import { useCreatePaymentApi } from '@shared/hooks/useCreatePaymentApi';
import { useGetPaymentApi } from '@shared/hooks/useGetPaymentApi';
import { useTriggerPaymentTimeoutApi } from '@shared/hooks/useTriggerPaymentTimeoutApi';

import { storeStorage } from '@core/storage/storeStorage';
import { tenantStorage } from '@core/storage/tenantStorage';
import { orderStorage } from '@core/storage/orderStorage';
import { paymentStorage } from '@core/storage/paymentStorage';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { BaseModal } from '@shared/components/BaseModal';
import { Box } from '@shared/components/Box';
import { PaymentMethodSelection } from './PaymentMethodSelection';
import { PaymentMethodDetails } from './PaymentMethodDetails';

const PAYMENT_POLLING_INTERVAL = 2000;
const PAYMENT_TIMEOUT = 180_000;

const DISCOUNT_AUTO_NAVIGATE_TIMEOUT = 15_000;  

export const CustomerPaymentPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationButtonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
    fontSize: theme.custom.fontSize.xxlarge,
  };

  const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethodEnum>(PaymentMethodEnum.QR);

  const paymentMethodOptions = [
    { label: t('customerFlow.qr'), value: PaymentMethodEnum.QR },
  ];

  const [payment, setPayment] = React.useState<Payment | null>(null);

  const {
    createPayment,
    loading: createPaymentLoading,
    data: createPaymentData,
  } = useCreatePaymentApi();
  const {
    getPayment,
    loading: getPaymentLoading,
    data: getPaymentData,
  } = useGetPaymentApi();
  const { triggerPaymentTimeout } = useTriggerPaymentTimeoutApi();

  const [remainingMs, setRemainingMs] = React.useState<number | null>(null);
  const countdownDeadlineRef = React.useRef<number | null>(null);
  
  const [isDiscountModalOpen, setIsDiscountModalOpen] = React.useState(false);
  const discountAutoNavigateTimeoutRef = React.useRef<number | null>(null);

  const handleCreatePayment = async () => {
    const storeId = storeStorage.load();
    const tenant = tenantStorage.load();
    const order = orderStorage.load();
    if (!storeId || !tenant || !order) {
      return;
    }

    await createPayment({
      order_id: order.id,
      store_id: storeId,
      tenant_id: tenant.id,
      total_amount: Number(order.total_amount),
      payment_method: selectedMethod,
    });
  };

  const handleContinueFromDiscount = () => {
    if (discountAutoNavigateTimeoutRef.current) {
      window.clearTimeout(discountAutoNavigateTimeoutRef.current);
      discountAutoNavigateTimeoutRef.current = null;
    }
    setIsDiscountModalOpen(false);
    navigate('/customer-flow/press-start');
  };

  const handleCheckPayment = () => {
    if (!payment || !payment.id) return;

    let isMounted = true;
    const timeoutMs = PAYMENT_TIMEOUT;
    const timeoutId = window.setTimeout(async () => {
      if (!isMounted) return;
      
      try {
        const order = orderStorage.load();
        if (order?.id) {
          await triggerPaymentTimeout(order.id);
        }
      } catch (error) {
        console.error('Failed to trigger payment timeout:', error);
      }
      
      navigate('/customer-flow/failed');
    }, timeoutMs);
    countdownDeadlineRef.current = Date.now() + timeoutMs;
    setRemainingMs(timeoutMs);
    const intervalId = window.setInterval(async () => {
      try {
        const latest = await getPayment(payment.id);
        if (!isMounted) return;
        paymentStorage.save(latest);
        setPayment(latest);

        const status = (latest as any).status as string;
        if (status === 'SUCCESS') {
          window.clearInterval(intervalId);
          window.clearTimeout(timeoutId);
          navigate('/customer-flow/press-start');
        } else if (status === 'FAILED' || status === 'CANCELLED') {
          window.clearInterval(intervalId);
          window.clearTimeout(timeoutId);
          navigate('/customer-flow/failed');
        }
      } catch {}
    }, PAYMENT_POLLING_INTERVAL);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      countdownDeadlineRef.current = null;
      setRemainingMs(null);
    };
  };

  useEffect(() => {
    if (getPaymentData) {
      paymentStorage.save(getPaymentData);
      setPayment(getPaymentData);
    }
  }, [getPaymentData]);

  useEffect(() => {
    if (isDiscountModalOpen) return

    const cleanup = handleCheckPayment();
    return cleanup;
  }, [payment?.id, isDiscountModalOpen]);

  useEffect(() => {
    if (!countdownDeadlineRef.current) return;
    const tick = () => {
      const ms = Math.max(0, (countdownDeadlineRef.current as number) - Date.now());
      setRemainingMs(ms);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearInterval(id);
    };
  }, [payment?.id, selectedMethod]);

  useEffect(() => {
    if (createPaymentData) {
      paymentStorage.save(createPaymentData);
      setPayment(createPaymentData);
      
      const order = orderStorage.load();
      if (order && (order.total_amount === '0' || order.total_amount === '0.00' || parseFloat(order.total_amount) === 0)) {
        setIsDiscountModalOpen(true);
        
        discountAutoNavigateTimeoutRef.current = window.setTimeout(() => {
          navigate('/customer-flow/press-start');
        }, DISCOUNT_AUTO_NAVIGATE_TIMEOUT);
      } else {
        handleCheckPayment();
    }
    }
    
    return () => {
      if (discountAutoNavigateTimeoutRef.current) {
        window.clearTimeout(discountAutoNavigateTimeoutRef.current);
        discountAutoNavigateTimeoutRef.current = null;
      }
    };
  }, [createPaymentData]);

  useEffect(() => {
    handleCreatePayment();
  }, []);

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={2}>
        {t('customerFlow.payment')}
      </Typography.Title>

      {createPaymentLoading && (
        <Flex align="center" justify="center" style={{ width: '100%', height: '100%' }}>
          <Skeleton active />
        </Flex>
      )}

      {!createPaymentLoading && (
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

          <PaymentMethodDetails
            selectedMethod={selectedMethod}
            qrCode={payment?.details?.qr_code}
            transactionCode={payment?.transaction_code}
            loading={getPaymentLoading}
            remainingSeconds={typeof remainingMs === 'number' ? Math.ceil(remainingMs / 1000) : undefined}
          />
        </Flex>
      )}

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={navigationButtonStyle}
            onClick={() => navigate('/customer-flow/order-overview')}
          >
            {t('common.back')}
          </Button>
        )}
        right={null}
      />

      <BaseModal
        isModalOpen={isDiscountModalOpen}
        setIsModalOpen={setIsDiscountModalOpen}
      >
        <Flex
          vertical
          align="center"
          justify="center"
          gap={theme.custom.spacing.large}
          style={{ width: '100%', height: '100%' }}
        >
          <Box
            border
            vertical
            align="center"
            justify="center"
            gap={theme.custom.spacing.medium}
            style={{
              width: '100%',
              height: '100%',
              borderColor: theme.custom.colors.success.default,
              backgroundColor: theme.custom.colors.success.light,
            }}
          >
            <Gift color={theme.custom.colors.success.default} weight='BoldDuotone' width={96} height={96} />

            <Typography.Text
              strong
              style={{
                fontSize: theme.custom.fontSize.xxlarge,
                fontWeight: theme.custom.fontWeight.xlarge,
                color: theme.custom.colors.success.default,
              }}
            >
              {t('messages.discount100')}
            </Typography.Text>

            <Typography.Text style={{ fontSize: theme.custom.fontSize.medium }}>
              {t('messages.paymentNotRequired')}
            </Typography.Text>
          </Box>

          <LeftRightSection
            left={null}
            right={(
              <Button
                type="primary"
                size="large"
                style={navigationButtonStyle}
                onClick={handleContinueFromDiscount}
              >
                {t('common.continue')}
              </Button>
            )}
            align="flex-end"
            style={{ height: 64 }}
          />
        </Flex>
      </BaseModal>
    </DefaultLayout>
  );
};
