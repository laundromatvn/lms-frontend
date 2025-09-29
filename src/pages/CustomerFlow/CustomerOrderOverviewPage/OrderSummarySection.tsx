import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Divider, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import type { SelectedMachineOption } from '../CustomerSelectMachinePage/type';

import { Box } from '@shared/components/Box';

import { formatCurrencyCompact } from '@shared/utils/currency';

import { calculateSelectedMachinePrice } from '../helpers';

interface Props {
  selectedMachines: SelectedMachineOption[];
  style?: React.CSSProperties;
}

export const OrderSummarySection: React.FC<Props> = ({ selectedMachines, style }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [calculatedMachines, setCalculatedMachines] = useState<{selectedMachine: SelectedMachineOption, price: number}[]>([]);

  useEffect(() => {
    setCalculatedMachines(selectedMachines.map((machine) => ({
      selectedMachine: machine,
      price: calculateSelectedMachinePrice(machine),
    })));
  }, [selectedMachines]);

  return (
    <Box
      vertical
      gap={theme.custom.spacing.medium}
      style={{
        width: '100%',
        ...style,
      }}
    >
      {calculatedMachines.map((item) => (
        <Flex justify="space-between" style={{ width: '100%' }} >
          <Typography.Text>{item.selectedMachine.machine.name}</Typography.Text>
          <Typography.Text
            strong
            style={{ color: theme.custom.colors.success.default }}
          >
            {formatCurrencyCompact(item.price)}
          </Typography.Text>
        </Flex>
      ))}

      <Divider
        style={{
          borderRadius: theme.custom.radius.full,
          border: `2px solid ${theme.custom.colors.primary.default}`,
        }}
      />

      <Flex justify="space-between" style={{ width: '100%' }}>
        <Typography.Text style={{ fontWeight: theme.custom.fontWeight.medium }}>{t('common.total')}</Typography.Text>
        <Typography.Text
          strong
          style={{ color: theme.custom.colors.success.default }}
        >
          {formatCurrencyCompact(calculatedMachines.reduce((sum, item) => sum + item.price, 0))}
        </Typography.Text>
      </Flex>
    </Box>
  );
};