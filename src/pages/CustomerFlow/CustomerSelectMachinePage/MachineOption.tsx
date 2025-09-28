import React from 'react';
import { useTranslation } from 'react-i18next';

import { WashingMachineMinimalistic } from '@solar-icons/react';

import { Button, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { MachineTypeEnum } from '@shared/enums/MachineTypeEnum';
import { type Machine } from '@shared/types/machine';

import { Box } from '@shared/components/Box';

import { formatCurrencyCompact } from '@shared/utils/currency';

interface Props {
  machine: Machine;
  selectedMachineIds: string[];
  onSelect: () => void;
  onRemove: () => void;
}

export const MachineOption: React.FC<Props> = ({ machine, selectedMachineIds, onSelect, onRemove }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const isSelected = selectedMachineIds.includes(machine.id);

  const defaultColor = machine.machine_type === MachineTypeEnum.WASHER
    ? theme.custom.colors.info.default
    : theme.custom.colors.warning.default;
  const lightColor = machine.machine_type === MachineTypeEnum.WASHER
    ? theme.custom.colors.info.light
    : theme.custom.colors.warning.light;

  return (
    <Flex vertical gap={theme.custom.spacing.large}>
      <Box
        vertical
        border
        align="center"
        justify="center"
        gap={theme.custom.spacing.large}
        onClick={onSelect}
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
          {formatCurrencyCompact(machine.base_price)}
        </Typography.Text>
      </Box>

      {isSelected && (
        <Button
          type="dashed"
          onClick={onRemove}
          style={{
            width: '100%',
            height: 48
          }}
        >
          {t('common.removeSelection')}
        </Button>
      )}
    </Flex>
  )
};