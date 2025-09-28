import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import type { AddOnOption } from '../type';
import { AddOnTypeEnum } from '@shared/enums/AddOnTypeEnum';
import { AddOnItem } from './AddOnItem';
import type { AddOn } from '@shared/types/AddOn';

interface Props {
  selectedAddOns: AddOnOption[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<AddOnOption[]>>;
  onSelect: (addOnOption: AddOnOption) => void;
  onRemove: (addOnOption: AddOnOption) => void;
}

export const WashModalContent: React.FC<Props> = ({ selectedAddOns, setSelectedAddOns, onSelect, onRemove }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const addOns = [
    { id: 'water', name: t('common.coldWater'), type: AddOnTypeEnum.COLD_WATER, price: 5000.00, is_default: true },
    { id: 'detergent', name: t('common.detergent'), type: AddOnTypeEnum.DETERGENT, price: 10000.00, is_default: true },
    { id: 'softener', name: t('common.softener'), type: AddOnTypeEnum.SOFTENER, price: 10000.00, is_default: true },
  ];
  
  useEffect(() => {
    setSelectedAddOns(addOns.map((addOn) => ({ addOn: addOn as unknown as AddOn, quantity: 1 })));
  }, []);

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
      <Typography.Text >{t('storeConfiguration.selectMultipleAddOns')}</Typography.Text>

      <Flex vertical gap={theme.custom.spacing.small} style={{ width: '100%', height: '100%' }}>
        {addOns.map((addOn) => (
          <AddOnItem
            addOn={addOn as unknown as AddOn}
            isSelected={selectedAddOns.some((addOnOption) => addOnOption.addOn.id === addOn.id) || addOn.is_default}
            onRemove={(addOn) => onRemove({ addOn, quantity: 1 })}
            onSelect={(addOn) => onSelect({ addOn, quantity: 1 })}
          />
        ))}
      </Flex>
    </Flex>
  );
};
