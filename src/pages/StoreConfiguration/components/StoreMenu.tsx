import React, { useMemo, useState } from 'react';

import { Flex } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { type Store } from '@shared/types/store';

import { StoreOption } from './StoreOption';

interface Props {
  stores: Store[];
  selectedStoreId: string | null;
  onSelect: (storeId: string) => void;
}

export const StoreMenu: React.FC<Props> = ({ stores, selectedStoreId, onSelect }) => {
  const theme = useTheme();

  return (
    <Flex vertical gap={theme.custom.spacing.medium} style={{ width: '100%' }}>
      {stores.map((store) => (
        <StoreOption
          store={store}
          selected={selectedStoreId === store.id}
          onSelect={() => onSelect(store.id)}
        />
      ))}
    </Flex>
  );
};
