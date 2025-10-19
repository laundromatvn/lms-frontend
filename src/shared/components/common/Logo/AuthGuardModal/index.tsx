import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography, Flex, QRCode } from 'antd';

import { getPortalFrontendUrl } from '@shared/utils/env';

import { tenantStorage } from '@core/storage/tenantStorage';

import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';
import {
  useVerifyForStoreConfigurationAccessApi
} from '@shared/hooks/useVerifyForStoreConfigurationAccessApi'; 

import { SystemTaskTypeEnum } from '@shared/enums/SystemTaskTypeEnum';

import { BaseModal } from '@shared/components/BaseModal';


interface Props {
  open: boolean;
  onClose: () => void;
}

const TIMEOUT_MS = 180_000;

export const AuthGuardModal: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  
  const tenant = tenantStorage.load();

  const [remainingMs, setRemainingMs] = useState<number>(TIMEOUT_MS);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useInactivityRedirect({
    timeoutMs: TIMEOUT_MS,
    targetPath: '/customer-flow/welcome',
    onTimeout: () => onClose(),
  });
  const {
    verifyForStoreConfigurationAccess,
    loading: verifyForStoreConfigurationAccessLoading,
    data: verifyForStoreConfigurationAccessData,
  } = useVerifyForStoreConfigurationAccessApi();

  const handleVerifyForStoreConfigurationAccess = async () => {
    if (!tenant) return;

    await verifyForStoreConfigurationAccess({
      tenant_id: tenant.id,
    });
  };

  const buildQRCodeUrl = () => {
    const baseUrl = `${getPortalFrontendUrl()}/auth/sign-in`;
    const queryParams = new URLSearchParams();
    const systemTaskId = verifyForStoreConfigurationAccessData?.system_task_id ?? '';

    if (!systemTaskId) return baseUrl;

    queryParams.set('session_id', systemTaskId);
    queryParams.set('action', SystemTaskTypeEnum.VERIFY_FOR_STORE_CONFIGURATION_ACCESS);

    console.log("url", `${baseUrl}?${queryParams.toString()}`);

    return `${baseUrl}?${queryParams.toString()}`;
  };

  useEffect(() => {
    setQrCodeUrl(buildQRCodeUrl());
  }, [verifyForStoreConfigurationAccessData]);

  useEffect(() => {
    if (!open) return;
    setRemainingMs(TIMEOUT_MS);
    const id = window.setInterval(() => {
      setRemainingMs(prev => {
        const next = prev - 1000;
        return next <= 0 ? 0 : next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [open]);

  useEffect(() => {
    handleVerifyForStoreConfigurationAccess();
  }, []);

  const [seconds, unit] = useMemo(() => {
    return [Math.ceil(remainingMs / 1000), 's'];
  }, [remainingMs]);

  return (
    <BaseModal isModalOpen={open} setIsModalOpen={() => onClose()}>
      <Flex vertical align="center" justify="center" style={{ height: '100%', gap: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {t('modals.authGuard.title')}
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: 'center', margin: 0 }}>
          {t('modals.authGuard.body')}
        </Typography.Paragraph>
        <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
          {t('modals.authGuard.countdown', { seconds, unit })}
        </Typography.Text>

        <QRCode
          status={(
            verifyForStoreConfigurationAccessLoading || TIMEOUT_MS - remainingMs <= 0
          ) ? 'loading' : 'active'}
          value={qrCodeUrl}
          size={200}
        />
      </Flex>
    </BaseModal>
  );
};


