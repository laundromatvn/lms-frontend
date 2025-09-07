import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@shared/theme/useTheme';

import { Button, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import { Logo } from '@shared/components/common/Logo';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

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
        {t('common.demo')}
      </Button>
    </Flex>
  );
};

export default HomePage;
