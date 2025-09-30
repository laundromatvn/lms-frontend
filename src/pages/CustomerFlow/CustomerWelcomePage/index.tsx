import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Typography, Flex } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';

import { MachineOption } from './MachineOption';
import { MachineTypeEnum } from '@shared/enums/MachineTypeEnum';
import { selectMachineStorage } from '@core/storage/selectMachineStorage';
import { orderStorage } from '@core/storage/orderStorage';

export const CustomerWelcomePage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    selectMachineStorage.clear();
    orderStorage.clear();
  }, []);

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={2}>{t('customerFlow.whatWouldYouLikeToDo')}</Typography.Title>

      <Flex
        justify="center"
        align="flex-start"
        gap={theme.custom.spacing.xxxxlarge}
        style={{ width: '100%', marginTop: theme.custom.spacing.large }}
      >
        <MachineOption machineType={MachineTypeEnum.WASHER} onSelect={() => navigate('/customer-flow/load-clothes?workingType=WASH')} />
        <MachineOption machineType={MachineTypeEnum.DRYER} onSelect={() => navigate('/customer-flow/load-clothes?workingType=DRY')} />
      </Flex>

      <Typography.Text style={{ fontWeight: theme.custom.fontWeight.small, fontStyle: 'italic' }}>
        {t('storeConfiguration.touchOnMachineDescription')}
      </Typography.Text>
    </DefaultLayout>
  );
};
