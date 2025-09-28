import React from 'react';

import { Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';

interface Props {
  image: React.ReactNode,
  instruction: string,
}

export const Instruction: React.FC<Props> = ({ image, instruction }) => {
  const theme = useTheme();

  return (
    <Box
      vertical
      border
      justify="space-between"
      align="center"
      style={{
        width: '100%',
        height: '100%',
        borderColor: theme.custom.colors.primary.default,
        backgroundColor: theme.custom.colors.primary.light,
        padding: theme.custom.spacing.medium,
      }}
    >
      {image}
      <Typography.Text
        style={{
          fontSize: theme.custom.fontSize.xlarge,
          fontWeight: theme.custom.fontWeight.medium,
        }}
      >
        {instruction}
      </Typography.Text>
    </Box>
  );
};
