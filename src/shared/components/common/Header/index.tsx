import React from 'react';

import { useTheme } from '@shared/theme/useTheme';

import { CrownMinimalistic } from '@solar-icons/react';

import { Flex, Layout, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { Logo } from '@shared/components/common/Logo';

const { Header: AntdHeader } = Layout;

const MAX_WIDTH = 1200;

export const Header: React.FC = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();

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
          <Logo size="small" />
        </Flex>

        <Flex
          justify="flex-end"
          align="center"
          style={{
            width: '100%',
            height: '100%',
          }}>
          <Select
            value={i18n.language.startsWith('vn') ? 'vn' : 'en'}
            style={{ width: 120 }}
            onChange={(lng) => i18n.changeLanguage(lng)}
            options={[
              { label: 'English', value: 'en' },
              { label: 'Tiếng Việt', value: 'vn' },
            ]}
          />
        </Flex>
      </Flex>
  </AntdHeader>
  );
};