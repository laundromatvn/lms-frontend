import React, { useState } from 'react';

import { useTheme } from '@shared/hooks/useTheme';

import { Typography } from 'antd';

import { Box } from '@shared/components/Box'

interface Props {
  label: string;
  value: any;
  selectedValue: any;
  onSelect: () => void;
}

export const MachineOption: React.FC<Props> = ({ label, value, selectedValue, onSelect }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      vertical
      border
      gap={theme.custom.spacing.small}
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        backgroundColor: isHovered
          ? theme.custom.colors.background.overlay
          : theme.custom.colors.background.light,
        border: `1px solid ${selectedValue === value 
          ? theme.custom.colors.primary.default 
          : isHovered 
            ? theme.custom.colors.neutral[300] 
            : theme.custom.colors.neutral[200]}`,
        transition: 'background-color 120ms ease, border-color 120ms ease',
        width: '100%',
        minHeight: '128px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography.Text strong>{label}</Typography.Text>

      {selectedValue === value && (
        <Box 
          vertical
          align="center"
          style={{
            backgroundColor: theme.custom.colors.primary.light,
            width: '100%',
          }}>
          <Typography.Text>Selected</Typography.Text>
        </Box>
      )}
    </Box>
  );
};