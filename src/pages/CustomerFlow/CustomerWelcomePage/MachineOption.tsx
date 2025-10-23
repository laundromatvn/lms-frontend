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

const ICON_SIZE = '75%';

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
      {machineType === MachineTypeEnum.WASHER
        ? <Waterdrop weight="BoldDuotone" style={{ color: lightColor, width: ICON_SIZE, height: ICON_SIZE }} />
        : <Wind weight="BoldDuotone" style={{ color: lightColor, width: ICON_SIZE, height: ICON_SIZE }} />}

      <Typography.Text
        strong
        style={{
          fontSize: theme.custom.fontSize.xxxxlarge,
          color: theme.custom.colors.text.inverted,
        }}
      >
        {t(machineType === MachineTypeEnum.WASHER ? 'common.wash' : 'common.dry')}
      </Typography.Text>
    </Box>
  );
};
