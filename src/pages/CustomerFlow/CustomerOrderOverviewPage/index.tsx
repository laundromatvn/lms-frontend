import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Spin, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { storeStorage } from '@core/storage/storeStorage';
import { selectMachineStorage } from '@core/storage/selectMachineStorage';
import { orderStorage } from '@core/storage/orderStorage';

import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';
import { useCreateOrderApi, type CreateOrderResponse } from '@shared/hooks/useCreateOrderApi';

import type { Order } from '@shared/types/Order';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { BaseModal } from '@shared/components/BaseModal';
import { Box } from '@shared/components/Box';

import { OrderSummarySection } from './OrderSummarySection';


export const CustomerOrderOverviewPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationButtonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
    fontSize: theme.custom.fontSize.xxlarge,
  };

  const storeId = storeStorage.load();

  const [newOrder, setNewOrder] = useState<Order | null>(null);

  const selectedWashingMachines= useMemo(() => selectMachineStorage.load().selectedWashingMachineOptions, []);
  const selectedDryerMachines= useMemo(() => selectMachineStorage.load().selectedDryerMachineOptions, []);
  const selectedMachines = useMemo(() => [...selectedWashingMachines, ...selectedDryerMachines], [selectedWashingMachines, selectedDryerMachines]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useInactivityRedirect({ timeoutMs: 90_000, targetPath: '/customer-flow/welcome' });

  const { 
    createOrder,
    loading: createOrderLoading,
    data: createOrderData,
  } = useCreateOrderApi<CreateOrderResponse>();

  const handleCreateOrder = async () => {
    if (!storeId) return;

    createOrder({
      store_id: storeId,
      machine_selections: selectedMachines,
    });
  };

  const handleNext = async () => {
    if (!newOrder) return;

    navigate(`/customer-flow/payment?orderId=${newOrder.id}`);
  };

  useEffect(() => {
    if (createOrderData) {
      orderStorage.save(createOrderData);
      setNewOrder(createOrderData);
      setIsModalOpen(false);
    }
  }, [createOrderData]);

  useEffect(() => {
    setIsModalOpen(false);
  }, [createOrderLoading]);

  useEffect(() => {
    handleCreateOrder();
  }, []);

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={2}>{t('customerFlow.orderOverview')}</Typography.Title>

      <Flex
        vertical
        align="center"
        style={{
          width: '100%',
          height: '100%',
          padding: theme.custom.spacing.medium,
        }}
      >
        {createOrderLoading && (
          <Spin spinning={createOrderLoading} size="large" />
        )}

        {newOrder && (
          <OrderSummarySection
            order={newOrder}
            selectedMachines={selectedMachines}
            style={{ width: 640 }}
          />
        )}
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={navigationButtonStyle}
            onClick={() => navigate(`/customer-flow/select-machines`)}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={navigationButtonStyle}
            onClick={handleNext}
          >
            {t('common.confirm')}
          </Button>
        )}
        align="flex-end"
        style={{ height: 64 }}
      />

      <BaseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <Box 
          vertical
          justify="center"
          align="center"
          gap={theme.custom.spacing.large}
          style={{ width: '100%', height: '100%' }}
        >
          <Spin spinning={createOrderLoading} size="large" />

          <Typography.Text style={{ fontSize: theme.custom.fontSize.large }}>
            {t('customerFlow.pleaseWaitABitWeAreProcessingYourOrder')}
          </Typography.Text>
        </Box>
      </BaseModal>
    </DefaultLayout>
  );
};
