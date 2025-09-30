import React from 'react';
import { useTranslation } from 'react-i18next';

import { WashingMachineMinimalistic } from '@solar-icons/react';

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

  return (
    <Box
      vertical
      align="center"
      justify="center"
      gap={theme.custom.spacing.large}
      onClick={onSelect}
      style={{
        width: 400,
        height: 600,
        cursor: 'pointer',
        border: `2px solid ${machineType === MachineTypeEnum.WASHER
          ? theme.custom.colors.info.default
          : theme.custom.colors.warning.default}`,
        backgroundColor: machineType === MachineTypeEnum.WASHER
          ? theme.custom.colors.info.light
          : theme.custom.colors.warning.light,
      }}
    >
      <WashingMachineMinimalistic
        weight="BoldDuotone"
        color={machineType === MachineTypeEnum.WASHER
          ? theme.custom.colors.info.default
          : theme.custom.colors.warning.default}
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      <Typography.Text
        strong
        style={{
          fontSize: theme.custom.fontSize.large,
          color: machineType === MachineTypeEnum.WASHER
            ? theme.custom.colors.info.default
            : theme.custom.colors.warning.default,
        }}
      >
        {machineType === MachineTypeEnum.WASHER ? t('common.wash') : t('common.dry')}
      </Typography.Text>
    </Box>
  );
};
