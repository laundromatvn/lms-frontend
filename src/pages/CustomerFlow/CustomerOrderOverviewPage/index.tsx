import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { selectMachineStorage } from '@core/storage/selectMachineStorage';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { OrderSummarySection } from './OrderSummarySection';


export const CustomerOrderOverviewPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const selectedWashingMachines= useMemo(() => selectMachineStorage.load().selectedWashingMachineOptions, []);
  const selectedDryerMachines= useMemo(() => selectMachineStorage.load().selectedDryerMachineOptions, []);
  const selectedMachines = useMemo(() => [...selectedWashingMachines, ...selectedDryerMachines], [selectedWashingMachines, selectedDryerMachines]);

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
            onClick={() => navigate(`/customer-flow/payment`)}
          >
            {t('common.confirm')}
          </Button>
        )}
        align="flex-end"
        style={{ height: 64 }}
      />
    </DefaultLayout>
  );
};
