import React from 'react';

import { Image, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';

interface Props {
  imageUrl: string,
  instruction: string,
  style?: React.CSSProperties,
  children?: React.ReactNode,
}

export const Instruction: React.FC<Props> = ({ imageUrl, instruction, style, children }) => {
  const theme = useTheme();

  return (
    <Box
      vertical
      border
      justify="center"
      align="center"
      style={{
        width: '100%',
        height: '100%',
        gap: theme.custom.spacing.medium,
        borderColor: theme.custom.colors.primary.default,
        backgroundColor: theme.custom.colors.primary.light,
        padding: theme.custom.spacing.medium,
        ...style,
      }}
    >
      <Image
        src={imageUrl}
        preview={false}
        style={{ height: 480, objectFit: 'contain' }}
      />

      <Typography.Text
        style={{
          fontSize: theme.custom.fontSize.xxxxlarge,
          fontWeight: theme.custom.fontWeight.medium,
        }}
      >
        {instruction}
      </Typography.Text>

      {children}
    </Box>
  );
};
