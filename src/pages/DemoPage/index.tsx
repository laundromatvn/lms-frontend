import React, { useState } from 'react';

import { useTheme } from '@shared/hooks/useTheme';

import { Button, Flex, Typography } from 'antd';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';

import { MachineOption } from './MachineOption';

const DemoPage: React.FC = () => {
  const theme = useTheme();

  const [selectedMachine, setSelectedMachine] = useState<number>(0);

  const machines = [
    { label: 'Machine 1', value: 1 },
    { label: 'Machine 2', value: 2 },
    { label: 'Machine 3', value: 3 },
    { label: 'Machine 4', value: 4 },
    { label: 'Machine 5', value: 5 },
    { label: 'Machine 6', value: 6 },
    { label: 'Machine 7', value: 7 },
    { label: 'Machine 8', value: 8 },
  ];

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={1}>Demo</Typography.Title>

      <Flex 
        wrap
        justify="center"
        gap={theme.custom.spacing.medium}
        style={{ width: '100%' }}
      >
        {machines.map((machine) => (
          <div key={machine.value} style={{ flex: '0 0 20%' }}>
            <MachineOption
              label={machine.label}
              value={machine.value}
              selectedValue={selectedMachine}
              onSelect={() => setSelectedMachine(machine.value)}
            />
          </div>
        ))}
      </Flex>

      <Flex gap={theme.custom.spacing.medium}  >
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: theme.custom.radius.full,
            minWidth: 128,
          }}
        >
          Turn On
        </Button>

        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: theme.custom.radius.full,
            minWidth: 128,
          }}
        >
          Turn Off
        </Button>
      </Flex>
    </DefaultLayout>
  );
};

export default DemoPage;