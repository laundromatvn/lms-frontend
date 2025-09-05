import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@shared/hooks/useTheme';

import { Button, Flex, Typography } from 'antd';

import { CrownMinimalistic } from '@solar-icons/react'

const HomePage: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Flex vertical justify="center" align="center" style={{ height: '100vh', width: '100vw' }}>
      <Typography.Title level={1} style={{ color: theme.custom.colors.primary.default }}>
        <CrownMinimalistic /> Laundromat
      </Typography.Title>

      <Button
        type="primary"
        size="large"
        style={{
          minWidth: 128,
          borderRadius: theme.custom.radius.full,
          padding: theme.custom.spacing.medium,
        }}
        onClick={() => navigate('/demo')}
      >
        Demo
      </Button>
    </Flex>
  );
};

export default HomePage;
