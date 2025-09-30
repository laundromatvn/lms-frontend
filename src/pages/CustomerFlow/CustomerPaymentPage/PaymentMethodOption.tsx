import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  QrCode,
  Card,
} from '@solar-icons/react';

import { Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { PaymentMethodEnum } from '@shared/enums/PaymentMethodEnum';

import { Box } from '@shared/components/Box';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { DynamicTag } from '@shared/components/DynamicTag';

interface Props {
  item: {
    label: string;
    value: PaymentMethodEnum;
  };
  selectedValue: PaymentMethodEnum;
  onSelect: (value: PaymentMethodEnum) => void;
}

export const PaymentMethodOption: React.FC<Props> = ({ item, selectedValue, onSelect }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const isSelected = useMemo(() => selectedValue === item.value, [selectedValue, item.value]);

  const primaryColor = useMemo(() => {
    switch (item.value) {
      case PaymentMethodEnum.QR:
        return theme.custom.colors.success.default;
      case PaymentMethodEnum.CARD:
        return theme.custom.colors.info.default;
    }
  }, [theme, item.value]);

  const lightColor = useMemo(() => {
    switch (item.value) {
      case PaymentMethodEnum.QR:
        return theme.custom.colors.success.light;
      case PaymentMethodEnum.CARD:
        return theme.custom.colors.info.light;
    }
  }, [theme, item.value]);

  const Icon = useMemo(() => {
    switch (item.value) {
      case PaymentMethodEnum.QR:
        return <QrCode weight="BoldDuotone" style={{ color: primaryColor, width: 48, height: 48 }} />;
      case PaymentMethodEnum.CARD:
        return <Card weight="BoldDuotone" style={{ color: primaryColor, width: 48, height: 48 }} />;
    }
  }, [item.value]);

  return (
    <Box
      align="center"
      gap={theme.custom.spacing.medium}
      onClick={() => onSelect(item.value)}
      style={{
        width: '100%',
        cursor: 'pointer',
        backgroundColor: selectedValue === item.value
          ? lightColor
          : theme.custom.colors.background.light,
        border: selectedValue === item.value
          ? `2px solid ${primaryColor}`
          : `2px solid ${theme.custom.colors.neutral[200]}`,
      }}
    >
      <LeftRightSection
        left={<Flex align="center" gap={theme.custom.spacing.small}>
          {Icon}
          <Typography.Text style={{ color: theme.custom.colors.text.primary, fontSize: theme.custom.fontSize.large }}>
            {item.label}
          </Typography.Text>
        </Flex>}
        right={
          isSelected && (
            <Flex align="center" gap={theme.custom.spacing.small} style={{ height: '100%' }}>
              <DynamicTag value={t('common.selected', 'Selected')} color={primaryColor} />
            </Flex>
          )
        }
      />
    </Box>
  );
};
