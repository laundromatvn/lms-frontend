import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';
import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { Box } from '@shared/components/Box';

import loadClothesImage from '@public/customerFlow/loadClothes.png';

const TIMEOUT_MS = 90_000;

export const CustomerLoadClothesPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const workingType = searchParams.get('workingType') as WorkingTypeEnum;

  useInactivityRedirect({ timeoutMs: TIMEOUT_MS, targetPath: '/customer-flow/welcome' });

  const buttonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
  };

  return (
    <DefaultLayout style={{ alignItems: 'space-between' }}>
      <Flex
        vertical
        align="space-between"
        justify="center"
        gap={theme.custom.spacing.medium}
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <div
          style={{
            backgroundImage: `url(${loadClothesImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '80%',
          }}
        />

        <Box
          vertical
          border
          justify="center"
          align="center"
          style={{
            width: '100%',
            padding: theme.custom.spacing.large,
            borderColor: theme.custom.colors.primary.default,
            backgroundColor: theme.custom.colors.primary.light,
          }}
        >
          <Typography.Text
            style={{
              fontSize: theme.custom.fontSize.xxxxlarge,
              fontWeight: theme.custom.fontWeight.medium,
              color: theme.custom.colors.primary.default,
            }}
          >
            {t('customerFlow.pleaseLoadYourClothesFirst')}
          </Typography.Text>
        </Box>
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={buttonStyle}
            onClick={() => navigate('/customer-flow/welcome')}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={buttonStyle}
            onClick={() => navigate(`/customer-flow/select-machines?workingType=${workingType}`)}
          >
            {t('common.continue')}
          </Button>
        )}
        align="flex-end"
        style={{ height: 64, flexShrink: 0, marginBottom: theme.custom.spacing.medium }}
      />
    </DefaultLayout>
  );
};
