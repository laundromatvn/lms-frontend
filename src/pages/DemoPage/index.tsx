import React, { useState } from 'react';

import { useTheme } from '@shared/theme/useTheme';

import { Button, Flex, Typography, notification } from 'antd';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';

import { MachineOption } from './MachineOption';

import { useTurnOnMachineApi, type TurnOnMachineResponse } from '@shared/hooks/useTurnOnMachineApi';
import { useTurnOffMachineApi, type TurnOffMachineResponse } from '@shared/hooks/useTurnOffMachineApi';

const DemoPage: React.FC = () => {
  const theme = useTheme();

  const [api, contextHolder] = notification.useNotification();

  const [selectedMachine, setSelectedMachine] = useState<number>(0);
  const [applyingMachineId, setApplyingMachineId] = useState<number | null>(null);

  const machines = [
    { label: 'Machine 1', value: 1 },
    { label: 'Machine 2', value: 2 },
    { label: 'Machine 3', value: 3 },
    { label: 'Machine 4', value: 4 },
    { label: 'Machine 5', value: 5 },
    { label: 'Machine 6', value: 6 },
    { label: 'Machine 7', value: 7 },
    { label: 'Machine 8', value: 8 },
  ];

  const {
    turnOnMachine,
    loading: isTurningOn,
  } = useTurnOnMachineApi<TurnOnMachineResponse>();

  const {
    turnOffMachine,
    loading: isTurningOff,
    error: turnOffError,
  } = useTurnOffMachineApi<TurnOffMachineResponse>();

  const handleTurnOn = async () => {
    if (!selectedMachine) return;
    setApplyingMachineId(selectedMachine);
    try {
      await turnOnMachine({ relay_id: selectedMachine });
      api.success({
        message: `Machine ${selectedMachine} turned on successfully`,
      });
    } catch (error) {
      api.error({
        message: `Failed to turn on machine ${selectedMachine}`,
      });
    } finally {
      setApplyingMachineId(null);
    }
  };

  const handleTurnOff = async () => {
    if (!selectedMachine) return;
    setApplyingMachineId(selectedMachine);
    try {
      await turnOffMachine({ relay_id: selectedMachine });
      api.success({
        message: `Machine ${selectedMachine} turned off successfully`,
      });
    } catch (error) {
      api.error({
        message: `Failed to turn off machine ${selectedMachine}`,
      });
    } finally {
      setApplyingMachineId(null);
    }
  };

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      {contextHolder}
      <Typography.Title level={1}>Demo</Typography.Title>

      <Flex 
        wrap
        justify="center"
        gap={theme.custom.spacing.medium}
        style={{ width: '100%' }}
      >
        {machines.map((machine) => (
          <div key={machine.value} style={{ flex: '0 0 20%' }}>
            <MachineOption
              label={machine.label}
              value={machine.value}
              selectedValue={selectedMachine}
              onSelect={() => setSelectedMachine(machine.value)}
              isApplying={applyingMachineId === machine.value && isTurningOn}
            />
          </div>
        ))}
      </Flex>

      <Flex gap={theme.custom.spacing.medium}  >
        <Button
          type="primary"
          size="large"
          loading={isTurningOn}
          style={{
            borderRadius: theme.custom.radius.full,
            minWidth: 128,
          }}
          onClick={handleTurnOn}
          disabled={!selectedMachine}
        >
          Turn On
        </Button>

        <Button
          type="primary"
          size="large"
          loading={isTurningOn}
          style={{
            borderRadius: theme.custom.radius.full,
            minWidth: 128,
          }}
          onClick={handleTurnOff}
          disabled={!selectedMachine}
        >
          Turn Off
        </Button>
      </Flex>
    </DefaultLayout>
  );
};

export default DemoPage;