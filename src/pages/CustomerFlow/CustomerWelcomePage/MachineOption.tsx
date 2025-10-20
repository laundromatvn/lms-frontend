import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Waterdrop,
  Wind,
} from '@solar-icons/react';

import { Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { MachineTypeEnum } from '@shared/enums/MachineTypeEnum';

import { Box } from '@shared/components/Box';

interface Props {
  machineType: MachineTypeEnum;
  onSelect: () => void;
}

export const MachineOption: React.FC<Props> = ({ machineType, onSelect }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const defaultColor = machineType === MachineTypeEnum.WASHER
    ? theme.custom.colors.info.default
    : theme.custom.colors.warning.default;
  const lightColor = machineType === MachineTypeEnum.WASHER
    ? theme.custom.colors.info.light
    : theme.custom.colors.warning.light;
  const iconBackgroundColor = machineType === MachineTypeEnum.WASHER
    ? theme.custom.colors.info[400]
    : theme.custom.colors.warning[400];

  const Icon = () => {
    switch (machineType) {
      case MachineTypeEnum.WASHER:
        return <Waterdrop weight="BoldDuotone" style={{ color: lightColor, width: '100%', height: '100%' }} />;
      case MachineTypeEnum.DRYER:
        return <Wind weight="BoldDuotone" style={{ color: lightColor, width: '100%', height: '100%' }} />;
    }
  };

  return (
    <Box
      vertical
      align="center"
      justify="center"
      gap={theme.custom.spacing.large}
      onClick={onSelect}
      style={{
        width: '100%',
        maxWidth: 360,
        height: '100%',
        maxHeight: 480,
        cursor: 'pointer',
        border: `4px solid ${defaultColor}`,
        backgroundColor: iconBackgroundColor,
      }}
    >
      <Box
        vertical
        align="center"
        justify="center"
        style={{
          width: '100%',
          height: '100%',
          padding: theme.custom.spacing.medium,
          background: 'transparent',
        }}
      >
        <Icon />
      </Box>

      <Typography.Text
        strong
        style={{
          fontSize: theme.custom.fontSize.xxxxxlarge,
          color: theme.custom.colors.text.inverted,
        }}
      >
        {t(machineType === MachineTypeEnum.WASHER ? 'common.wash' : 'common.dry')}
      </Typography.Text>
    </Box>
  );
};
