import React from 'react';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';
import { CenteredLayout } from '@shared/components/layouts/CenteredLayout';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const AuthContainer: React.FC<Props> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <CenteredLayout>
      <Box
        vertical
        border
        gap={theme.custom.spacing.xsmall}
        align="center"
        style={{ width: 400, height: 600, ...style }}
      >
        {children}
      </Box>
    </CenteredLayout>
  );
};
