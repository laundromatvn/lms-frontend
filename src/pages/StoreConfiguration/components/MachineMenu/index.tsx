import React from 'react';

import { Flex } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { type Machine } from '@shared/types/machine';

import { MachineOption } from './MachineOption';

interface Props {
  machines: Machine[];
}

export const MachineMenu: React.FC<Props> = ({ machines }) => {
  const theme = useTheme();

  return (
    <Flex
      vertical
      justify="flex-start"
      align="flex-start"
      gap={theme.custom.spacing.medium}
      style={{ width: '100%', height: '100%', overflowY: 'auto' }}
    >
      {machines.map((machine) => (
        <MachineOption key={machine.id} machine={machine} />
      ))}
    </Flex>
  );
};
