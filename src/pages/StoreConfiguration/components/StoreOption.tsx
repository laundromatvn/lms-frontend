import React from 'react';

import { Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { type Store } from '@shared/types/store';

import { Box } from '@shared/components/Box';
import { DynamicTag } from '@shared/components/DynamicTag';

interface Props {
  key?: any;
  store: Store;
  selected: boolean;
  onSelect: () => void;
}

export const StoreOption: React.FC<Props> = ({ key, store, selected, onSelect }) => {
  const theme = useTheme();

  return (
    <Box 
      key={key}
      border
      justify="space-between"
      style={{
        width: '100%',
        border: selected ? `2px solid ${theme.custom.colors.primary.default}` : `1px solid ${theme.custom.colors.neutral[200]}`,
        backgroundColor: selected ? theme.custom.colors.primary.light : theme.custom.colors.background.light,
      }}
      onClick={onSelect}
    >
      <Flex vertical gap={theme.custom.spacing.small}>
        <Typography.Text strong style={{ fontSize: theme.custom.fontSize.large }}>
          {store.name}
        </Typography.Text>
        <Typography.Text style={{ fontSize: theme.custom.fontSize.medium }}>{store.address}</Typography.Text>
      </Flex>

      <Flex>
        <DynamicTag value={store.status} />
      </Flex>
    </Box>
  );
};
