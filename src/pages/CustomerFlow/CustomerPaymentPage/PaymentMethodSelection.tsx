import React from 'react';

import { Flex } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

import { PaymentMethodOption } from './PaymentMethodOption';

interface PaymentMethodSelectionProps {
  options: { label: string; value: PaymentMethodEnum }[];
  selectedMethod: PaymentMethodEnum;
  onSelect: (method: PaymentMethodEnum) => void;
}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ options, selectedMethod, onSelect }) => {
  const theme = useTheme();

  return (
    <Flex vertical align="flex-start" style={{ width: '100%' }} gap={theme.custom.spacing.medium}>
      {options.map((option) => (
        <PaymentMethodOption
          key={option.value}
          item={option}
          selectedValue={selectedMethod}
          onSelect={onSelect}
        />
      ))}
    </Flex>
  );
};
