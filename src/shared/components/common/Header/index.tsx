import React from 'react';

import { useTheme } from '@shared/hooks/useTheme';

import { CrownMinimalistic } from '@solar-icons/react';

import { Flex, Layout, Typography } from 'antd';

const { Header: AntdHeader } = Layout;

const MAX_WIDTH = 1200;

export const Header: React.FC = () => {
  const theme = useTheme();

  return (
  <AntdHeader 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 0,
      margin: 0,
      backgroundColor: theme.custom.colors.primary.default,
      height: 64,
      width: '100%',
    }}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: MAX_WIDTH,
        }}>

        <Flex
          justify="flex-start"
          align="center"
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Typography.Title
            level={1}
            style={{
              color: theme.custom.colors.text.inverted,
              margin: 0,
            }}>
            <CrownMinimalistic size={32}/> Laundromat
          </Typography.Title>
        </Flex>

        <Flex
          justify="flex-end"
          align="center"
          style={{
            width: '100%',
            height: '100%',
          }}>

        </Flex>
      </Flex>
  </AntdHeader>
  );
};