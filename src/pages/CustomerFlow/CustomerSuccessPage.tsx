import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Flex, Image, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { PaymentMessage } from './components/PaymentMessage';
import { Box } from '@shared/components/Box';
import { BaseModal } from '@shared/components/BaseModal';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';

import notifyMessageImage from '@public/customerFlow/notifyMe.png';
import getInvoiceImage from '@public/customerFlow/getInvoice.png';

export const CustomerSuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const navigationButtonStyle = {
    width: 300,
    height: 64,
    borderRadius: theme.custom.radius.full,
    fontSize: theme.custom.fontSize.xxlarge,
  };

  const [searchParams] = useSearchParams();
  const workingType = searchParams.get('workingType') as WorkingTypeEnum;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Auto-reset after 90s of inactivity back to welcome
  useInactivityRedirect({ timeoutMs: 90_000, targetPath: '/customer-flow/welcome' });

  return (
    <DefaultLayout>
      <Flex
        vertical
        align="align"
        justify="flex-start"
        style={{ height: '100%' }}
        gap={theme.custom.spacing.medium}
      >
        <PaymentMessage type="success" title={t('customerFlow.paymentSuccess')} message={t('customerFlow.pleaseNotifyMessage')} />

        <Flex gap={theme.custom.spacing.medium} style={{ width: '100%', height: '100%' }}>
          <Box
            vertical
            border
            justify="center"
            align="center"
            gap={theme.custom.spacing.medium}
            style={{
              width: '100%',
              height: '100%',
              borderColor: theme.custom.colors.warning.default,
              backgroundColor: theme.custom.colors.warning.light,
            }}
          >
            <Image src={notifyMessageImage} alt="success" width={240} height={240} preview={false} />

            <Button
              type="primary"
              size="large"
              style={{
                width: 300, height: 64, borderRadius: theme.custom.radius.full,
                backgroundColor: theme.custom.colors.warning.default,
              }}
              onClick={() => setIsModalOpen(true)}
            >
              {t('common.notifyMessage')}
            </Button>
          </Box>

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
            <Image src={getInvoiceImage} alt="success" width={240} height={240} preview={false} />

            <Button
              type="primary"
              size="large"
              style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
              onClick={() => setIsModalOpen(true)}
            >
              {t('common.getInvoice')}
            </Button>
          </Box>
        </Flex>

        <LeftRightSection
          left={null}
          right={(
            <Button
              type="primary"
              size="large"
              style={navigationButtonStyle}
              onClick={() => navigate('/customer-flow/press-start')}
            >
              {t('common.continue')}
            </Button>
          )}
          align="flex-end"
          style={{ height: 64 }}
        />
      </Flex>

      <BaseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <Flex vertical align="center" justify="center" style={{ width: '100%', height: 'calc(100% - 64px)' }}>
          <Typography.Text>{t('messages.thisFeatureIsComingSoon')}</Typography.Text>
        </Flex>

        <LeftRightSection
          left={(
            <Button
              type="default"
              size="large"
              style={navigationButtonStyle}
              onClick={() => setIsModalOpen(false)}
            >
              {t('common.back')}
            </Button>
          )}
        />

        <LeftRightSection
          right={null}
        />
      </BaseModal>
    </DefaultLayout>
  );
};
