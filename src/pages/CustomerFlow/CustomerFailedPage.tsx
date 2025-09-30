import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Flex, Image } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { PaymentMessage } from './components/PaymentMessage';
import { Box } from '@shared/components/Box';

import paymentFailedImage from '@public/customerFlow/paymentFailed.png';

export const CustomerFailedPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const workingType = searchParams.get('workingType') as WorkingTypeEnum;

  return (
    <DefaultLayout>
      <Flex
        vertical
        align="align"
        justify="flex-start"
        style={{ height: '100%' }}
        gap={theme.custom.spacing.medium}
      >
        <PaymentMessage type="failed" title={t('customerFlow.paymentFailed')} message={t('customerFlow.pleaseTryAgain')} />

        <Box
          vertical
          border
          justify="center"
          align="center"
          gap={theme.custom.spacing.medium}
          style={{
            width: '100%',
            height: '100%',
            borderColor: theme.custom.colors.info.default,
            backgroundColor: theme.custom.colors.info.light,
          }}
        >
          <Image src={paymentFailedImage} alt="failed" width={600} height={600} preview={false} />

          <Button
            type="primary"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate('/customer-flow/welcome')}
          >
            {t('common.tryAgain')}
          </Button>
        </Box>
      </Flex>
    </DefaultLayout>
  );
};
