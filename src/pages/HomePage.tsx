import React from 'react';

import { useTheme } from '@shared/hooks/useTheme';

import { Flex, Typography } from 'antd';

import { CrownMinimalistic } from '@solar-icons/react'

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <Flex justify="center" align="center" style={{ height: '100vh', width: '100vw' }}>
      <Typography.Title level={1} style={{ color: theme.custom.colors.primary.default }}>
        <CrownMinimalistic /> Laundromat
      </Typography.Title>
    </Flex>
  );
};

export default HomePage;
