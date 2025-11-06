import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography } from 'antd';

import { CheckCircle } from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import type { Order } from '@shared/types/Order';

import { Box } from '@shared/components/Box';

import { formatCurrencyCompact } from '@shared/utils/currency';


export interface FinalTotalAmountProps {
  order: Order;
}

export const FinalTotalAmount: React.FC<FinalTotalAmountProps> = ({ order }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      border
      gap={theme.custom.spacing.small}
      align="center"
      justify="center"
      style={{
        width: '100%',
        border: `1px solid ${theme.custom.colors.neutral[400]} `,
        backgroundColor: theme.custom.colors.neutral.light,
      }}
    >
      <Flex vertical gap={theme.custom.spacing.xxsmall} style={{ width: '100%' }}>
        <Typography.Text
          style={{
            fontSize: theme.custom.fontSize.medium,
            color: theme.custom.colors.text.tertiary,
          }}
        >
          {t('common.totalPayment')}
        </Typography.Text>

        <Typography.Text
          strong
          style={{
            fontSize: theme.custom.fontSize.xxxlarge,
            color: theme.custom.colors.text.secondary,
          }}
        >
          {formatCurrencyCompact(order.total_amount)}
        </Typography.Text>

        {Number(order.total_amount) === 0 && (
          <Typography.Text
            style={{
              fontSize: theme.custom.fontSize.large,
              color: theme.custom.colors.text.tertiary,
            }}
          >
            {t('common.completelyFree')}
          </Typography.Text>
        )}
      </Flex>

      <CheckCircle
        color={theme.custom.colors.success.default}
        weight='Bold'
        width={96}
        height={96}
      />
    </Box>
  );
};
