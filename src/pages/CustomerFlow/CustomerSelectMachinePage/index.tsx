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

const MAX_SELECTED_WASHING_MACHINES = 2;
const MAX_SELECTED_DRYING_MACHINES = 2;

export const CustomerSelectMachinePage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [searchParams] = useSearchParams();
  const initialWorkingType = searchParams.get('workingType') as WorkingTypeEnum;
  const storeId = storeStorage.load();

  const [workingType, setWorkingType] = useState(initialWorkingType || WorkingTypeEnum.WASH);
  const [washers, setWashers] = useState<Machine[]>([]);
  const [dryers, setDryers] = useState<Machine[]>([]);
  const [selectedWashingMachineIds, setSelectedWashingMachineIds] = useState<string[]>([]);
  const [selectedDryerMachineIds, setSelectedDryerMachineIds] = useState<string[]>([]);

  const {
    listClassifiedStoreMachine,
    loading: isLoading,
    data: listClassifiedStoreMachineData,
    error: listClassifiedStoreMachineError,
  } = useListClassifiedStoreMachineApi<ListClassifiedStoreMachineResponse>();

  const onSelectWashingMachine = (machineId: string) => {
    if (selectedWashingMachineIds.includes(machineId)) {
      return;
    }
    
    if (selectedWashingMachineIds.length >= MAX_SELECTED_WASHING_MACHINES) {
      api.error({
        message: t('customerFlow.maxSelectedWashingMachines', { maxSelected: MAX_SELECTED_WASHING_MACHINES }),
      });
      return;
    }

    const uniqueSelectedWashingMachineIds = [...selectedWashingMachineIds, machineId].filter((id, index, self) => self.indexOf(id) === index);
    setSelectedWashingMachineIds(uniqueSelectedWashingMachineIds);
  };

  const onRemoveWashingMachine = (machineId: string) => {
    const uniqueSelectedWashingMachineIds = selectedWashingMachineIds.filter((id) => id !== machineId);
    setSelectedWashingMachineIds(uniqueSelectedWashingMachineIds);
  };

  const onSelectDryerMachine = (machineId: string) => {
    if (selectedDryerMachineIds.includes(machineId)) {
      return;
    }

    if (selectedDryerMachineIds.length >= MAX_SELECTED_DRYING_MACHINES) {
      api.error({
        message: t('customerFlow.maxSelectedDryerMachines', { maxSelected: MAX_SELECTED_DRYING_MACHINES }),
      });
      return;
    }

    const uniqueSelectedDryerMachineIds = [...selectedDryerMachineIds, machineId].filter((id, index, self) => self.indexOf(id) === index);
    setSelectedDryerMachineIds(uniqueSelectedDryerMachineIds);
  };

  const onRemoveDryerMachine = (machineId: string) => {
    const uniqueSelectedDryerMachineIds = selectedDryerMachineIds.filter((id) => id !== machineId);
    setSelectedDryerMachineIds(uniqueSelectedDryerMachineIds);
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

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      {contextHolder}

      <Flex gap={theme.custom.spacing.medium} style={{ width: '100%' }}>
        <Button
          size="large"
          type={workingType === WorkingTypeEnum.WASH ? 'primary' : 'default'}
          onClick={() => setWorkingType(WorkingTypeEnum.WASH)}
        >
          {`${t('common.washer')} (${selectedWashingMachineIds.length}/${MAX_SELECTED_WASHING_MACHINES})`}
        </Button>
        <Button
          size="large"
          type={workingType === WorkingTypeEnum.DRY ? 'primary' : 'default'}
          onClick={() => setWorkingType(WorkingTypeEnum.DRY)}
        >
          {`${t('common.dryer')} (${selectedDryerMachineIds.length}/${MAX_SELECTED_DRYING_MACHINES})`}
        </Button>
      </Flex>

      <Typography.Title level={2}>
        {workingType === WorkingTypeEnum.WASH
          ? t('customerFlow.selectWashingMachine',
            { totalSelected: selectedWashingMachineIds.length, maxSelected: MAX_SELECTED_WASHING_MACHINES })
          : t('customerFlow.selectDryerMachine',
            { totalSelected: selectedDryerMachineIds.length, maxSelected: MAX_SELECTED_DRYING_MACHINES })}
      </Typography.Title>

      <Flex style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <MachineList
          workingType={workingType}
          machines={workingType === WorkingTypeEnum.WASH ? washers : dryers}
          selectedWashingMachineIds={selectedWashingMachineIds}
          onSelectWashingMachine={onSelectWashingMachine}
          onRemoveWashingMachine={onRemoveWashingMachine}
          selectedDryerMachineIds={selectedDryerMachineIds}
          onSelectDryerMachine={onSelectDryerMachine}
          onRemoveDryerMachine={onRemoveDryerMachine}
        />
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate(`/customer-flow/load-clothes?workingType=${workingType}`)}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate(`/customer-flow/select-machines?workingType=${workingType}`)}
            disabled={selectedWashingMachineIds.length === 0 && selectedDryerMachineIds.length === 0}
          >
            {t('common.continue')}
          </Button>
        )}
      />
    </DefaultLayout>
  );
};
