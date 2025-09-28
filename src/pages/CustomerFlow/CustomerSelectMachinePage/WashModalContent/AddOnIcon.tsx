import React, { useMemo } from 'react';

import {
  Temperature,
  Snowflake,
  Stars,
  Waterdrops,
} from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import { AddOnTypeEnum } from '@shared/enums/AddOnTypeEnum';

import { Box } from '@shared/components/Box';


interface Props {
  addOnType: AddOnTypeEnum;
}

export const AddOnIcon: React.FC<Props> = ({ addOnType }) => {
  const theme = useTheme();

  const defaultColor = useMemo(() => {
    switch (addOnType) {
      case AddOnTypeEnum.COLD_WATER:
        return theme.custom.colors.info.default;
      case AddOnTypeEnum.HOT_WATER:
        return theme.custom.colors.danger.default;
      case AddOnTypeEnum.DETERGENT:
        return theme.custom.colors.warning.default;
      case AddOnTypeEnum.SOFTENER:
        return theme.custom.colors.success.default;
    }
  }, [addOnType]);

  const lightColor = useMemo(() => {
    switch (addOnType) {
      case AddOnTypeEnum.COLD_WATER:
        return theme.custom.colors.info.light;
      case AddOnTypeEnum.HOT_WATER:
        return theme.custom.colors.danger.light;
      case AddOnTypeEnum.DETERGENT:
        return theme.custom.colors.warning.light;
      case AddOnTypeEnum.SOFTENER:
        return theme.custom.colors.success.light;
    }
  }, [addOnType]);

  const Icon = () => {
    switch (addOnType) {
      case AddOnTypeEnum.COLD_WATER:
        return <Snowflake weight="BoldDuotone" style={{ color: defaultColor, width: '100%', height: '100%' }} />;
      case AddOnTypeEnum.HOT_WATER:
        return <Temperature weight="BoldDuotone" style={{ color: defaultColor, width: '100%', height: '100%' }} />;
      case AddOnTypeEnum.DETERGENT:
        return <Waterdrops weight="BoldDuotone" style={{ color: defaultColor, width: '100%', height: '100%' }} />;
      case AddOnTypeEnum.SOFTENER:
        return <Stars weight="BoldDuotone" style={{ color: defaultColor, width: '100%', height: '100%' }} />;
    }
  };

  return <Box
    style={{
      width: 48,
      height: 48,
      padding: theme.custom.spacing.xsmall,
      backgroundColor: lightColor,
    }}
  >
    <Icon />
  </Box>
};