import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AddSquare,
  MinusSquare,
} from '@solar-icons/react';

import { Button, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';
import { type AddOnOption } from '../type';
import { AddOnTypeEnum } from '@shared/enums/AddOnTypeEnum';

const DEFAULT_STEP = 15;
const DEFAULT_DURATION = 30;
const MAX_DURATION = 90;
const MIN_DURATION = 15;

interface Props {
  selectedAddOns: AddOnOption[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<AddOnOption[]>>;
}

export const DryModalContent: React.FC<Props> = ({ selectedAddOns, setSelectedAddOns }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const defaultDuration = [15, 30, 45, 60];
  const [selectedDuration, setSelectedDuration] = useState<number>(DEFAULT_DURATION);

  const onAddDuration = () => {
    if (selectedDuration >= MAX_DURATION) {
      return;
    }

    setSelectedDuration(selectedDuration + DEFAULT_STEP);
  };

  const onSubtractDuration = () => {
    if (selectedDuration <= MIN_DURATION) {
      return;
    }

    setSelectedDuration(selectedDuration - DEFAULT_STEP);
  };

  useEffect(() => {
    setSelectedAddOns([{
      addOn: { id: 'duration', name: t('common.duration'), type: AddOnTypeEnum.DRYING_DURATION_MINUTE, price: '0', is_default: true },
      quantity: selectedDuration,
    }]);
  }, [selectedDuration]);

  return (
    <Flex
      vertical
      gap={theme.custom.spacing.large}
      style={{
        width: '100%',
        height: '100%',
        marginBottom: theme.custom.spacing.medium,
      }}
    >
      <Typography.Text >{t('storeConfiguration.selectDryingDuration')}</Typography.Text>

      <Flex justify="space-between" style={{ width: '100%' }}>
        {defaultDuration.map((duration) => (
          <Box
            vertical
            justify="center"
            align="center"
            onClick={() => setSelectedDuration(duration)}
            style={{
              width: 200,
              height: 100,
              border: selectedDuration === duration ? `2px solid ${theme.custom.colors.primary.default}` : 'none',
            }}
          >
            <Typography.Text strong>{duration}</Typography.Text>
            <Typography.Text>{t('common.minutes')}</Typography.Text>
          </Box>
        ))}
      </Flex>

      <Box
        justify="center"
        align="center"
        gap={theme.custom.spacing.large}
        style={{ width: '100%' }}
      >
        <Button
          type="default"
          size="large"
          onClick={onSubtractDuration}
          disabled={selectedDuration <= MIN_DURATION}
        >
          {`- ${DEFAULT_STEP}`}
        </Button>

        <Flex vertical align="center" gap={theme.custom.spacing.xsmall}>
          <Typography.Text
            strong
            style={{
              fontSize: theme.custom.fontSize.xxlarge,
              color: theme.custom.colors.success.default,
            }}
          >{selectedDuration}</Typography.Text>
          <Typography.Text>{t('common.minutes')}</Typography.Text>
        </Flex>

        <Button
          type="default"
          size="large"
          onClick={onAddDuration}
          disabled={selectedDuration >= MAX_DURATION}
        >
          {`+ ${DEFAULT_STEP}`}
        </Button>
      </Box>
    </Flex>
  );
};
