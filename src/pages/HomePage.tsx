import React from 'react';

import { Flex, Typography } from 'antd';

const HomePage: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh', width: '100vw' }}>
      <Typography.Title level={1}>Home Page</Typography.Title>
    </Flex>
  );
};

export default HomePage;
