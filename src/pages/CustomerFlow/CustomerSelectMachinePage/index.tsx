import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Flex, Typography, notification } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { storeStorage } from '@core/storage/storeStorage';
import { type Machine } from '@shared/types/machine';
import {
  useListClassifiedStoreMachineApi,
  type ListClassifiedStoreMachineResponse,
} from '@shared/hooks/useListClassifiedStoreMachineApi';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { MachineList } from './MachineList';
import type { SelectedMachineOption } from './type';
import { selectMachineStorage } from '@core/storage/selectMachineStorage';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';

const MAX_SELECTED_WASHING_MACHINES = 2;
const MAX_SELECTED_DRYING_MACHINES = 2;

export const CustomerSelectMachinePage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationButtonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
    fontSize: theme.custom.fontSize.xxlarge,
  };

  const [api, contextHolder] = notification.useNotification();

  const [searchParams] = useSearchParams();
  const initialWorkingType = searchParams.get('workingType') as WorkingTypeEnum;
  const storeId = storeStorage.load();

  const [workingType, setWorkingType] = useState(initialWorkingType || WorkingTypeEnum.WASH);
  const [washers, setWashers] = useState<Machine[]>([]);
  const [dryers, setDryers] = useState<Machine[]>([]);
  const [selectedWashingMachineOptions, setSelectedWashingMachineOptions] = useState<SelectedMachineOption[]>([]);
  const [selectedDryerMachineOptions, setSelectedDryerMachineOptions] = useState<SelectedMachineOption[]>([]);

  const {
    listClassifiedStoreMachine,
    data: listClassifiedStoreMachineData,
  } = useListClassifiedStoreMachineApi<ListClassifiedStoreMachineResponse>();

  const onSelectWashingMachine = (machineOption: SelectedMachineOption) => {
    if (selectedWashingMachineOptions.some((option) => option.machine.id === machineOption.machine.id)) {
      return;
    }
    
    if (selectedWashingMachineOptions.length >= MAX_SELECTED_WASHING_MACHINES) {
      api.error({
        message: t('customerFlow.maxSelectedWashingMachines', { maxSelected: MAX_SELECTED_WASHING_MACHINES }),
      });
      return;
    }

    const uniqueSelectedWashingMachineOptions = [...selectedWashingMachineOptions, machineOption];
    setSelectedWashingMachineOptions(uniqueSelectedWashingMachineOptions);
  };

  const onRemoveWashingMachine = (machineOption: SelectedMachineOption) => {
    const uniqueSelectedWashingMachineOptions = selectedWashingMachineOptions.filter((option) => option.machine.id !== machineOption.machine.id);
    setSelectedWashingMachineOptions(uniqueSelectedWashingMachineOptions);
  };

  const onSelectDryerMachine = (machineOption: SelectedMachineOption) => {
    if (selectedDryerMachineOptions.some((option) => option.machine.id === machineOption.machine.id)) {
      return;
    }

    if (selectedDryerMachineOptions.length >= MAX_SELECTED_DRYING_MACHINES) {
      api.error({
        message: t('customerFlow.maxSelectedDryerMachines', { maxSelected: MAX_SELECTED_DRYING_MACHINES }),
      });
      return;
    }

    const uniqueSelectedDryerMachineOptions = [...selectedDryerMachineOptions, machineOption];
    setSelectedDryerMachineOptions(uniqueSelectedDryerMachineOptions);
  };

  const onRemoveDryerMachine = (machineOption: SelectedMachineOption) => {
    const uniqueSelectedDryerMachineOptions = selectedDryerMachineOptions.filter((option) => option.machine.id !== machineOption.machine.id);
    setSelectedDryerMachineOptions(uniqueSelectedDryerMachineOptions);
  };

  const getMachines = () => {
    if (!storeId) return;

    listClassifiedStoreMachine({ storeId });
  };

  useEffect(() => {
    getMachines();
  }, []);

  useEffect(() => {
    if (listClassifiedStoreMachineData) {
      setWashers(listClassifiedStoreMachineData.washers);
      setDryers(listClassifiedStoreMachineData.dryers);
    }
  }, [listClassifiedStoreMachineData]);

  // Auto-reset after 90s of inactivity back to welcome
  useInactivityRedirect({ timeoutMs: 90_000, targetPath: '/customer-flow/welcome' });

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      {contextHolder}

      <Flex gap={theme.custom.spacing.medium} style={{ width: '100%' }}>
        <Button
          size="large"
          type={workingType === WorkingTypeEnum.WASH ? 'primary' : 'default'}
          onClick={() => setWorkingType(WorkingTypeEnum.WASH)}
        >
          {`${t('common.washer')} (${selectedWashingMachineOptions.length}/${MAX_SELECTED_WASHING_MACHINES})`}
        </Button>
        <Button
          size="large"
          type={workingType === WorkingTypeEnum.DRY ? 'primary' : 'default'}
          onClick={() => setWorkingType(WorkingTypeEnum.DRY)}
        >
          {`${t('common.dryer')} (${selectedDryerMachineOptions.length}/${MAX_SELECTED_DRYING_MACHINES})`}
        </Button>
      </Flex>

      <Typography.Title level={2}>
        {workingType === WorkingTypeEnum.WASH
          ? t('customerFlow.selectWashingMachine',
            { totalSelected: selectedWashingMachineOptions.length, maxSelected: MAX_SELECTED_WASHING_MACHINES })
          : t('customerFlow.selectDryerMachine',
            { totalSelected: selectedDryerMachineOptions.length, maxSelected: MAX_SELECTED_DRYING_MACHINES })}
      </Typography.Title>

      <Flex style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <MachineList
          workingType={workingType}
          machines={workingType === WorkingTypeEnum.WASH ? washers : dryers}
          selectedWashingMachineOptions={selectedWashingMachineOptions}
          onSelectWashingMachine={onSelectWashingMachine}
          onRemoveWashingMachine={onRemoveWashingMachine}
          selectedDryerMachineOptions={selectedDryerMachineOptions}
          onSelectDryerMachine={onSelectDryerMachine}
          onRemoveDryerMachine={onRemoveDryerMachine}
        />
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={navigationButtonStyle}
            onClick={() => navigate(`/customer-flow/load-clothes`)}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={navigationButtonStyle}
            onClick={() => {
              selectMachineStorage.save({
                selectedWashingMachineOptions,
                selectedDryerMachineOptions,
              });
              navigate(`/customer-flow/order-overview`)
            }}
            disabled={selectedWashingMachineOptions.length === 0 && selectedDryerMachineOptions.length === 0}
          >
            {t('common.continue')}
          </Button>
        )}
      />
    </DefaultLayout>
  );
};
