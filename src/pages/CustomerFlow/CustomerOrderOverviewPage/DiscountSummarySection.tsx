import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography } from 'antd';

import { Gift } from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import type { Order } from '@shared/types/Order';

import { Box } from '@shared/components/Box';

import { formatCurrencyCompact } from '@shared/utils/currency';


export interface DiscountSummarySectionProps {
  order: Order;
}

export const DiscountSummarySection: React.FC<DiscountSummarySectionProps> = ({ order }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getRewardValue = (reward: any) => {
    if (reward.type === 'FIXED_AMOUNT') {
      return formatCurrencyCompact(reward.value);
    }
    return reward.value;
  }

  return (
    <Box
      border
      gap={theme.custom.spacing.small}
      style={{
        width: '100%',
        border: `2px dashed ${theme.custom.colors.success.default} `,
        backgroundColor: theme.custom.colors.success.light,
      }}
    >
      <Gift color={theme.custom.colors.success.default} weight='BoldDuotone' width={48} height={48} />
      <Flex vertical gap={theme.custom.spacing.small} style={{ width: '100%' }}>
        <Typography.Text
          strong
          style={{
            fontSize: theme.custom.fontSize.large,
            color: theme.custom.colors.success.dark,
          }}
        >
          {t('common.specialDiscount')}
        </Typography.Text>

        {order.promotion_summary?.rewards?.map((reward) => {
          return (
            <Typography.Text
              strong
              style={{
                fontSize: theme.custom.fontSize.xlarge,
                color: theme.custom.colors.success.default,
              }}
            >
              {t(`promotion.reward_type.${reward.type}`, { value: reward.value })}
            </Typography.Text>
          )
        })}

        <Typography.Text
          strong
          style={{
            fontSize: theme.custom.fontSize.xxxlarge,
            color: theme.custom.colors.success[700],
          }}
        >
          {t('common.savings', { value: formatCurrencyCompact(order.discount_amount) })}
        </Typography.Text>
      </Flex>
    </Box>
  );
};
