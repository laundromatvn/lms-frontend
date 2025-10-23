import React from 'react';

import { Tag } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { toCamelCase } from '@shared/utils/string';

interface Props {
  value: string;
  color?: string;
  style?: React.CSSProperties;
}

export const DynamicTag: React.FC<Props> = ({ value, color, style }) => {
  const theme = useTheme();

  const dynamicColor = () => {
    switch (value.toLowerCase()) {
      case 'active':
      case 'idle':
        return theme.custom.colors.success.default;
      case 'inactive':
        return theme.custom.colors.neutral.default;
      case 'pending':
      case 'pending_setup':
      case 'busy':
      case 'starting':
        return theme.custom.colors.warning.default;
      case 'error':
      case 'out_of_service':
        return theme.custom.colors.danger.default;
      case 'success':
        return theme.custom.colors.success.default;
      case 'washer':
        return theme.custom.colors.info[400];
      case 'dryer':
        return theme.custom.colors.warning[400];
      default:
        return theme.custom.colors.neutral[400];
    }
  }

  return <Tag
    color={color || dynamicColor()}
    style={{
      borderRadius: theme.custom.radius.full,
      paddingLeft: theme.custom.spacing.medium,
      paddingRight: theme.custom.spacing.medium,
      height: 'fit-content',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
      ...style,
    }}
  >
    {toCamelCase(value)}
  </Tag>;
};
