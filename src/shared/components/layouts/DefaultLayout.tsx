import React from 'react';

import { useTheme } from '@shared/hooks/useTheme';

import { Flex, Layout } from 'antd';

import { Header } from '@shared/components/common/Header';

const { Content } = Layout;

const MAX_WIDTH = 1200;

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Header />

      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          backgroundColor: theme.custom.colors.background.light,
        }}>
        <Flex
          vertical
          style={{
            width: '100%',
            height: '100%',
            maxWidth: MAX_WIDTH,
          }}>
          {children}
        </Flex>
      </Content>
    </Layout>
  );
};