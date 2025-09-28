import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WashingMachineMinimalistic } from '@solar-icons/react';

import { Button, Flex, Modal, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { formatCurrencyCompact } from '@shared/utils/currency';

import { MachineTypeEnum } from '@shared/enums/MachineTypeEnum';
import { type Machine } from '@shared/types/machine';

import { Box } from '@shared/components/Box';
import { LeftRightSection } from '@shared/components/LeftRightSection';

import type { AddOnOption, SelectedMachineOption } from './type';
import { WashModalContent } from './WashModalContent';
import { DryModalContent } from './DryModalContent';
import { AddOnTypeEnum } from '@shared/enums/AddOnTypeEnum';

const MIN_DRYING_TIME = 15;

interface Props {
  machine: Machine;
  selectedMachineOptions: SelectedMachineOption[];
  onSelect: (machineOption: SelectedMachineOption) => void;
  onRemove: (machineOption: SelectedMachineOption) => void;
}

export const MachineOption: React.FC<Props> = ({ machine, selectedMachineOptions, onSelect, onRemove }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const isSelected = selectedMachineOptions.some((option) => option.machine.id === machine.id);
  const selectedMachineOption = selectedMachineOptions.find((option) => option.machine.id === machine.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);

  const defaultColor = machine.machine_type === MachineTypeEnum.WASHER
    ? theme.custom.colors.info.default
    : theme.custom.colors.warning.default;
  const lightColor = machine.machine_type === MachineTypeEnum.WASHER
    ? theme.custom.colors.info.light
    : theme.custom.colors.warning.light;

  const onSelectAddOn = (addOnOption: AddOnOption) => {
    if (selectedAddOns.some((option) => option.addOn.id === addOnOption.addOn.id)) {
      return;
    }

    setSelectedAddOns([...selectedAddOns, addOnOption]);
  };

  const onRemoveAddOn = (addOnOption: AddOnOption) => {
    setSelectedAddOns(selectedAddOns.filter((option) => option.addOn.id !== addOnOption.addOn.id));
  };

  const totalPrice = () => {
    if (machine.machine_type === MachineTypeEnum.WASHER) {
      const coldWaterPrice = selectedMachineOption?.addOns.find((addOn) => addOn.addOn.type === AddOnTypeEnum.COLD_WATER && !addOn.addOn.is_default)?.addOn.price || 0;
      const detergentPrice = selectedMachineOption?.addOns.find((addOn) => addOn.addOn.type === AddOnTypeEnum.DETERGENT && !addOn.addOn.is_default)?.addOn.price || 0;
      const softenerPrice = selectedMachineOption?.addOns.find((addOn) => addOn.addOn.type === AddOnTypeEnum.SOFTENER && !addOn.addOn.is_default)?.addOn.price || 0;

      return Number(coldWaterPrice) + Number(detergentPrice) + Number(softenerPrice) + Number(machine.base_price);
    } else {
      let totalDurationTime = 0;
      selectedMachineOption?.addOns.forEach((addOn) => {
        if (addOn.addOn.type === AddOnTypeEnum.DRYING_TIME_MINUTE) {
          totalDurationTime += addOn.quantity;
        }
      });

      return Math.max(Number(totalDurationTime), MIN_DRYING_TIME) * Number(machine.base_price);
    }
  };

  return (
    <Flex vertical gap={theme.custom.spacing.large}>
      <Box
        vertical
        border
        align="center"
        justify="center"
        gap={theme.custom.spacing.large}
        onClick={() => setIsModalOpen(true)}
        style={{
          height: 312,
          borderColor: defaultColor,
          borderWidth: isSelected ? 4 : 0,
          backgroundColor: lightColor,
        }}
      >
        <WashingMachineMinimalistic
          weight="BoldDuotone"
          color={defaultColor}
          style={{
            width: '100%',
            height: '100%',
          }}
        />

        <Typography.Text strong>{machine.name}</Typography.Text>

        <Typography.Text strong style={{ color: theme.custom.colors.success.default }}>
          {formatCurrencyCompact(totalPrice())}
        </Typography.Text>
      </Box>

      {isSelected && (
        <Button
          type="dashed"
          onClick={() => onRemove({ machine, addOns: [] })}
          style={{
            width: '100%',
            height: 48
          }}
        >
          {t('common.removeSelection')}
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        closable={false}
        maskClosable={false}
        footer={null}
        width={1200}
        styles={{
          content: { height: 600, overflow: 'hidden' },
          body: { height: '100%' },
        }}
      >
        <Flex vertical gap={theme.custom.spacing.large} style={{ width: '100%', height: 'calc(100% - 48px)' }}>
          <Typography.Text strong>{t('storeConfiguration.selectForMachine', { machineName: machine.name })}</Typography.Text>

          {machine.machine_type === MachineTypeEnum.WASHER
            ? <WashModalContent
              selectedAddOns={selectedAddOns}
              setSelectedAddOns={setSelectedAddOns}
              onSelect={onSelectAddOn}
              onRemove={onRemoveAddOn}
            />
            : <DryModalContent
                selectedAddOns={selectedAddOns}
                setSelectedAddOns={setSelectedAddOns}
              />
            }
        </Flex>

        <LeftRightSection
          left={(
            <Button
              type="default"
              size="large"
              onClick={() => setIsModalOpen(false)}
              style={{ width: 240, height: 48, borderRadius: theme.custom.radius.full }}
            >
              {t('common.back')}
            </Button>
          )}
          right={(
            <Button
              type="primary"
              size="large"
              onClick={() => {
                onSelect({ machine, addOns: selectedAddOns });
                setIsModalOpen(false);
              }}
              style={{ width: 240, height: 48, borderRadius: theme.custom.radius.full }}
            >
              {t('common.selectMachine')}
            </Button>
          )}
          style={{ width: '100%', height: 48 }}
        />
      </Modal>
    </Flex>
  )
};
