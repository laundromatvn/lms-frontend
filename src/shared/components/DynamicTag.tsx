import React, { useMemo } from 'react';

import { Tag } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

interface Props {
  value: string;
}

export const DynamicTag: React.FC<Props> = ({ value }) => {
  const theme = useTheme();

  const color = useMemo(() => {
    switch (value.toLowerCase() ) {
      case 'active':
        return theme.custom.colors.success.default;
      case 'inactive':
        return theme.custom.colors.neutral.default;
      case 'pending':
        return theme.custom.colors.warning.default;
      case 'error':
        return theme.custom.colors.danger.default;
      case 'success':
        return theme.custom.colors.success.default;
      default:
        return theme.custom.colors.neutral[200];
    }
  }, [value]);

  return <Tag color={color}>{value}</Tag>;
};
