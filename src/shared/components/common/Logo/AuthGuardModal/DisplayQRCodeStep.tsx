import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, Flex, QRCode } from 'antd';

import { getPortalFrontendUrl } from '@shared/utils/env';

import { useTheme } from '@shared/theme/useTheme';

import { tenantStorage } from '@core/storage/tenantStorage';

import { useVerifyForStoreConfigurationAccessApi } from '@shared/hooks/useVerifyForStoreConfigurationAccessApi';

import { SystemTaskTypeEnum } from '@shared/enums/SystemTaskTypeEnum';
import { Box } from '@shared/components/Box';

interface Props {
  open: boolean;
  timeLeftMs: number;
  onSuccess: (systemTaskId: string) => void;
  onResetTimeout: () => void;
}

export const DisplayQRCodeStep: React.FC<Props> = ({
  open,
  timeLeftMs,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const tenant = tenantStorage.load();

  const {
    verifyForStoreConfigurationAccess,
    loading: verifyForStoreConfigurationAccessLoading,
    data: verifyForStoreConfigurationAccessData,
  } = useVerifyForStoreConfigurationAccessApi<any>();

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const handleVerifyForStoreConfigurationAccess = async () => {
    if (!tenant) return;

    await verifyForStoreConfigurationAccess({ tenant_id: tenant.id });
  }

  useEffect(() => {
    const baseUrl = `${getPortalFrontendUrl()}/auth/sign-in`;
    const systemTaskId = verifyForStoreConfigurationAccessData?.system_task_id ?? '';
    
    if (!systemTaskId) return

    onSuccess(systemTaskId);

    const queryParams = new URLSearchParams();
    queryParams.set('session_id', systemTaskId);
    queryParams.set('action', SystemTaskTypeEnum.VERIFY_FOR_STORE_CONFIGURATION_ACCESS);

    setQrCodeUrl(`${baseUrl}?${queryParams.toString()}`);

    console.log('qrCodeUrl', `${baseUrl}?${queryParams.toString()}`);
  }, [verifyForStoreConfigurationAccessData]);

  useEffect(() => {
    handleVerifyForStoreConfigurationAccess();
  }, [open]);

  return (
    <Box
      vertical
      align="center"
      justify="center"
      style={{
        width: '100%',
        height: '100%',
        gap: 16,
      }}
      gap={theme.custom.spacing.medium}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        {t('modals.authGuard.title')}
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: 'center', margin: 0 }}>
        {t('modals.authGuard.body')}
      </Typography.Paragraph>
      <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
        {t('modals.authGuard.countdown', { seconds: Math.ceil(timeLeftMs / 1000), unit: 's' })}
      </Typography.Text>

      <QRCode
        status={(verifyForStoreConfigurationAccessLoading || timeLeftMs <= 0) ? 'loading' : 'active'}
        value={qrCodeUrl}
        size={200}
      />
    </Box>
  );
};


