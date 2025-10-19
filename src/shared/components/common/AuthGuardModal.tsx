import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Typography, Flex } from 'antd';

import { BaseModal } from '@shared/components/BaseModal';
import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';

interface Props {
  open: boolean;
  onClose: () => void;
}

const TIMEOUT_MS = 180_000; // 180s

export const AuthGuardModal: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useInactivityRedirect({
    timeoutMs: TIMEOUT_MS,
    targetPath: '/customer-flow/welcome',
    onTimeout: () => onClose(),
  });

  const [seconds, unit] = useMemo(() => {
    return [Math.floor(TIMEOUT_MS / 1000), 's'];
  }, []);

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
        <Flex justify="center" align="center" gap={12} style={{ marginTop: 8 }}>
          <Button type="primary" size="large" onClick={() => { onClose(); navigate('/auth/sign-in'); }}>
            {t('modals.authGuard.signIn')}
          </Button>
          <Button size="large" onClick={() => onClose()}>
            {t('modals.authGuard.cancel')}
          </Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};


