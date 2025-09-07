import React, { useState } from 'react';

import { useTheme } from '@shared/theme/useTheme';

import { Flex, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';

import { Box } from '@shared/components/Box'

interface Props {
  label: string;
  value: any;
  selectedValue: any;
  onSelect: () => void;
  onTurnOn?: () => Promise<void> | void;
  onTurnOff?: () => Promise<void> | void;
  isApplying?: boolean;
}

export const MachineOption: React.FC<Props> = ({ label, value, selectedValue, onSelect, isApplying }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <Box
      vertical
      border
      gap={theme.custom.spacing.small}
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        backgroundColor: isHovered
          ? theme.custom.colors.background.overlay
          : theme.custom.colors.background.light,
        border: `1px solid ${selectedValue === value
          ? theme.custom.colors.primary.default
          : isHovered
            ? theme.custom.colors.neutral[300]
            : theme.custom.colors.neutral[200]}`,
        transition: 'background-color 120ms ease, border-color 120ms ease',
        width: '100%',
        minHeight: '128px',
        pointerEvents: isApplying ? 'none' : 'auto',
        opacity: isApplying ? 0.9 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <Typography.Text strong>{label}</Typography.Text>

        <Spin
          spinning={!!isApplying}
          indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
          size='small'
          style={{ color: theme.custom.colors.warning.default }}
        />
      </Flex>

      {selectedValue === value && (
        <Box
          vertical
          align="center"
          style={{
            backgroundColor: theme.custom.colors.primary.default,
            width: '100%',
          }}>
          <Typography.Text style={{ color: theme.custom.colors.text.inverted }}>{t('common.selected', 'Selected')}</Typography.Text>
        </Box>
      )}
    </Box>
  );
};