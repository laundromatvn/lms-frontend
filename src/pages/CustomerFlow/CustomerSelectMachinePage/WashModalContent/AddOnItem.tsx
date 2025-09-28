import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { Box } from '@shared/components/Box';
import { DynamicTag } from '@shared/components/DynamicTag';
import type { AddOn } from '@shared/types/AddOn';
import { formatCurrencyCompact } from '@shared/utils/currency';
import { LeftRightSection } from '@shared/components/LeftRightSection';

import { AddOnIcon } from './AddOnIcon';

interface Props {
  addOn: AddOn;
  isSelected: boolean;
  onSelect: (addOn: AddOn) => void;
  onRemove: (addOn: AddOn) => void;
}

export const AddOnItem: React.FC<Props> = ({ addOn, isSelected, onSelect, onRemove }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      gap={theme.custom.spacing.large}
      border={isSelected}
      style={{
        width: '100%',
        border: isSelected ? `2px solid ${theme.custom.colors.info.default}` : 'none',
      }}
    >
      <LeftRightSection
        left={(
          <Flex align="center" gap={theme.custom.spacing.small}>
            <AddOnIcon addOnType={addOn.type} />

            <Flex vertical gap={theme.custom.spacing.xsmall}>
              <Typography.Text>{addOn.name}</Typography.Text>

              <Typography.Text strong style={{ color: theme.custom.colors.success.default }}>
                <Typography.Text strong style={{ color: theme.custom.colors.success.default, textDecoration: addOn.is_default ? 'line-through' : 'none' }}>
                  {formatCurrencyCompact(addOn.price)}
                </Typography.Text>
                {' -> '}
                {addOn.is_default && <Typography.Text strong style={{ color: theme.custom.colors.success.default }}>
                  {formatCurrencyCompact(0)}
                </Typography.Text>}
              </Typography.Text>
            </Flex>
          </Flex>
        )}
        right={(
          <Flex align="center" gap={theme.custom.spacing.small}>
            {addOn.is_default && <DynamicTag value={t(`common.default`)} />}

            {!addOn.is_default && (
              isSelected ? (
                <Button
                  type="dashed"
                  size="large"
                  onClick={() => onRemove(addOn)}
                  style={{ width: 148 }}
                >
                  {t('common.removeSelection')}
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => onSelect(addOn)}
                  style={{ width: 148 }}
                >
                  {t('common.select')}
                </Button>
              )
            )}
          </Flex>
        )}
      />
    </Box>
  );
};
