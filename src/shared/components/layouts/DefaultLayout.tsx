import React from 'react';

import { useTheme } from '@shared/hooks/useTheme';

import { Layout } from 'antd';

import { Header } from '@shared/components/common/Header';

const { Content } = Layout;

const MAX_WIDTH = 1200;

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const DefaultLayout: React.FC<Props> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <Layout 
      style={{ 
        minHeight: '100vh', 
        width: '100vw',
        backgroundColor: theme.custom.colors.background.light,
      }}
    >
      <Header />

      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          gap: theme.custom.spacing.medium,
          maxWidth: MAX_WIDTH,
          width: '100%',
          margin: 'auto',
          padding: theme.custom.spacing.medium,
          ...style,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};