import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Spin, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { storeStorage } from '@core/storage/storeStorage';
import { selectMachineStorage } from '@core/storage/selectMachineStorage';
import { orderStorage } from '@core/storage/orderStorage';

import { useCreateOrderApi, type CreateOrderResponse } from '@shared/hooks/useCreateOrderApi';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { BaseModal } from '@shared/components/BaseModal';
import { OrderSummarySection } from './OrderSummarySection';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';


export const CustomerOrderOverviewPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const selectedWashingMachines= useMemo(() => selectMachineStorage.load().selectedWashingMachineOptions, []);
  const selectedDryerMachines= useMemo(() => selectMachineStorage.load().selectedDryerMachineOptions, []);
  const selectedMachines = useMemo(() => [...selectedWashingMachines, ...selectedDryerMachines], [selectedWashingMachines, selectedDryerMachines]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-reset after 90s of inactivity back to welcome
  useInactivityRedirect({ timeoutMs: 90_000, targetPath: '/customer-flow/welcome' });

  const { 
    createOrder,
    loading: createOrderLoading,
    data: createOrderData,
  } = useCreateOrderApi<CreateOrderResponse>();

  const handleNext = async () => {
    const storeId = storeStorage.load();
    if (!storeId) {
      return;
    }

    await createOrder({
      store_id: storeId,
      machine_selections: selectedMachines,
    });

    setIsModalOpen(true);
  };

  useEffect(() => {
    if (createOrderData) {
      orderStorage.save(createOrderData);
      navigate(`/customer-flow/payment?orderId=${createOrderData.id}`);
    }
  }, [createOrderData]);

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={2}>{t('customerFlow.orderOverview')}</Typography.Title>

      <Flex vertical align="center" style={{ width: '100%', height: '100%' }}>
        <OrderSummarySection selectedMachines={selectedMachines} style={{ width: 640 }}/>
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate(`/customer-flow/select-machines`)}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={handleNext}
          >
            {t('common.confirm')}
          </Button>
        )}
        align="flex-end"
        style={{ height: 64 }}
      />

      <BaseModal
        isModalOpen={isModalOpen && createOrderLoading}
        setIsModalOpen={setIsModalOpen}
      >
        <Flex 
          vertical
          justify="center"
          align="center"
          gap={theme.custom.spacing.large}
          style={{ width: '100%', height: '100%' }}
        >
          <Spin spinning={createOrderLoading} size="large" />
          <Typography.Text>{t('customerFlow.pleaseWaitABitWeAreProcessingYourOrder')}</Typography.Text>
        </Flex>
      </BaseModal>
    </DefaultLayout>
  );
};
