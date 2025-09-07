import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@shared/theme/useTheme';

import { Button, Flex } from 'antd';

import { Logo } from '@shared/components/common/Logo';

const HomePage: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap={theme.custom.spacing.large}
      style={{ height: '100vh', width: '100vw' }}
    >
      <Logo size="xlarge" />

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
