import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Divider, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import type { SelectedMachineOption } from '../CustomerSelectMachinePage/type';
import type { Order } from '@shared/types/Order';

import { Box } from '@shared/components/Box';

import { DiscountSummarySection } from './DiscountSummarySection';
import { FinalTotalAmount } from './FinalTotalAmount';

import { formatCurrencyCompact } from '@shared/utils/currency';

import { calculateSelectedMachinePrice } from '../helpers';

interface Props {
  order: Order;
  selectedMachines: SelectedMachineOption[];
  style?: React.CSSProperties;
}

export const OrderSummarySection: React.FC<Props> = ({ order, selectedMachines, style }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [calculatedMachines, setCalculatedMachines] = useState<{ selectedMachine: SelectedMachineOption, price: number }[]>([]);

  useEffect(() => {
    setCalculatedMachines(selectedMachines.map((machine) => ({
      selectedMachine: machine,
      price: calculateSelectedMachinePrice(machine),
    })));
  }, [selectedMachines]);

  return (
    <Box
      border
      vertical
      gap={theme.custom.spacing.small}
      style={{
        width: '100%',
        height: '100%',
        border: `2px dashed ${theme.custom.colors.neutral[200]} `,
        boxShadow: theme.custom.shadows.medium,
        ...style,
      }}
    >
      {calculatedMachines.map((item, index) => (
        <Flex justify="space-between" style={{ width: '100%' }} >
          <Typography.Text style={{ fontSize: theme.custom.fontSize.xxlarge }}>
            {`${index + 1}. ${item.selectedMachine.machine.name || `${t('storeConfiguration.relayNo', 'Relay No.', { relayNo: item.selectedMachine.machine.relay_no })}`}`}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: theme.custom.fontSize.xxlarge,
            }}
          >
            {formatCurrencyCompact(item.price)}
          </Typography.Text>
        </Flex>
      ))}

      <Divider
        style={{
          borderRadius: theme.custom.radius.full,
          border: `1px solid ${theme.custom.colors.neutral[200]}`,
        }}
      />

      <Flex justify="space-between" style={{ width: '100%' }} gap={theme.custom.spacing.small}>
        <Typography.Text style={{
          fontWeight: theme.custom.fontWeight.medium,
          fontSize: theme.custom.fontSize.xxlarge,
        }}>{t('common.subTotal')}</Typography.Text>
        <Typography.Text
          strong
          style={{
            fontSize: theme.custom.fontSize.xxlarge,
          }}
        >
          {formatCurrencyCompact(order.sub_total)}
        </Typography.Text>
      </Flex>

      {(order.promotion_summary?.rewards
        && Array.isArray(order.promotion_summary.rewards)
        && order.promotion_summary.rewards.length > 0
      ) && (
          <>
            <Divider
              style={{
                borderRadius: theme.custom.radius.full,
                border: `1px solid ${theme.custom.colors.neutral[200]}`,
              }}
            />

            <DiscountSummarySection order={order} />
          </>
        )}

      <Divider
        style={{
          borderRadius: theme.custom.radius.full,
          border: `1px solid ${theme.custom.colors.neutral[200]}`,
        }}
      />

      <FinalTotalAmount order={order} />
    </Box>
  );
};