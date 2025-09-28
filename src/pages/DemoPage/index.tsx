import React, { useMemo, useState } from 'react';

import { useTheme } from '@shared/theme/useTheme';

import { Button, Flex, Typography, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';

import { MachineOption } from './MachineOption';

import { useTurnOnMachineApi, type TurnOnMachineResponse } from '@shared/hooks/useTurnOnMachineApi';
import { useTurnOffMachineApi, type TurnOffMachineResponse } from '@shared/hooks/useTurnOffMachineApi';

export const DemoPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [api, contextHolder] = notification.useNotification();

  const [selectedMachine, setSelectedMachine] = useState<number>(0);
  const [applyingMachineId, setApplyingMachineId] = useState<number | null>(null);

  const machines = useMemo(() => (
    Array.from({ length: 10 }, (_, idx) => {
      const id = idx + 1;
      return { label: t('machines.label', { id }), value: id };
    })
  ), [t]);

  const {
    turnOnMachine,
    loading: isTurningOn,
  } = useTurnOnMachineApi<TurnOnMachineResponse>();

  const {
    turnOffMachine,
    loading: isTurningOff,
  } = useTurnOffMachineApi<TurnOffMachineResponse>();

  const handleTurnOn = async () => {
    if (!selectedMachine) return;
    setApplyingMachineId(selectedMachine);
    try {
      await turnOnMachine({ relay_id: selectedMachine });
      api.success({
        message: t('machines.turnedOn', { id: selectedMachine }),
      });
    } catch (error) {
      api.error({
        message: t('machines.turnOnFailed', { id: selectedMachine }),
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
        message: t('machines.turnedOff', { id: selectedMachine }),
      });
    } catch (error) {
      api.error({
        message: t('machines.turnOffFailed', { id: selectedMachine }),
      });
    } finally {
      setApplyingMachineId(null);
    }
  };

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      {contextHolder}
      <Typography.Title level={1}>{t('common.demo')}</Typography.Title>

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
              isApplying={applyingMachineId === machine.value && (isTurningOn || isTurningOff)}
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
          {t('common.start')}
        </Button>
      </Flex>
    </DefaultLayout>
  );
};
