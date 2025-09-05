import React from 'react';
import { Flex, Typography } from 'antd';

import { CrownMinimalistic } from '@solar-icons/react'

const HomePage: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh', width: '100vw' }}>
      <Typography.Title level={1}>
        <CrownMinimalistic /> Laundromat
      </Typography.Title>
    </Flex>
  );
};

export default HomePage;
