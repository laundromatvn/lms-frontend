import React from 'react';

import { CheckCircle } from '@solar-icons/react';

import { Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';

interface PaymentMessageProps {
  type: 'success' | 'failed';
  title: string;
  message: string;
}

export const PaymentMessage: React.FC<PaymentMessageProps> = ({ type, title, message }) => {
  const theme = useTheme();

  const primaryColor = type === 'success'
    ? theme.custom.colors.success.default
    : theme.custom.colors.danger.default;

  const lightColor = type === 'success'
    ? theme.custom.colors.success.light
    : theme.custom.colors.danger.light;

  return (
    <Box
      border
      align="center"
      justify="center"
      gap={theme.custom.spacing.medium}
      style={{
        width: '100%',
        borderColor: primaryColor,
        backgroundColor: lightColor,
      }}
    >
      <CheckCircle color={primaryColor} weight='BoldDuotone' width={96} height={96} />

      <Flex vertical align="flex-start" justify="center" gap={theme.custom.spacing.small}>
        <Typography.Text
          strong
          style={{
            fontSize: theme.custom.fontSize.xlarge,
            fontWeight: theme.custom.fontWeight.xlarge,
            color: primaryColor,
          }}
        >
          {title}
        </Typography.Text>
        <Typography.Text style={{ fontSize: theme.custom.fontSize.medium, fontWeight: theme.custom.fontWeight.medium }}>
          {message}
        </Typography.Text>
      </Flex>
    </Box>
  )
};
