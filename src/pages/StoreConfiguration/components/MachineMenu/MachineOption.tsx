import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { type Machine } from '@shared/types/machine';

import { Box } from '@shared/components/Box';
import { DynamicTag } from '@shared/components/DynamicTag';
import { MachineIcon } from '@shared/components/MachineIcon';

import { formatCurrencyCompact } from '@shared/utils/currency';

interface Props {
  machine: Machine;
}

export const MachineOption: React.FC<Props> = ({ machine }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      border
      justify="space-between"
      style={{
        width: '100%',
        border: `1px solid ${theme.custom.colors.neutral[200]}`,
        backgroundColor: theme.custom.colors.background.surface,
      }}
    >
      <Flex justify="flex-start" align="center" gap={theme.custom.spacing.small} style={{ height: '100%' }}>
        <MachineIcon machineType={machine.machine_type} />

        <Flex vertical gap={theme.custom.spacing.small}>
          <Typography.Text strong style={{ fontSize: theme.custom.fontSize.large }}>
            {`${t('storeConfiguration.relayNo', { relayNo: machine.relay_no })} - ${machine.name}`}
          </Typography.Text>
          <Typography.Text
            strong
            style={{
              fontSize: theme.custom.fontSize.medium,
              color: theme.custom.colors.success.default,
            }}
          >
            {formatCurrencyCompact(machine.base_price)}
          </Typography.Text>
        </Flex>
      </Flex>

      <Flex style={{ height: '100%' }}>
        <DynamicTag value={machine.status} />
      </Flex>
    </Box>
  );
};
