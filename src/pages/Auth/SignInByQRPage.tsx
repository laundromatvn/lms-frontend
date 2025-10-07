import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Divider, Typography, Spin, QRCode, notification } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import {
  useGenerateAuthSessionApi,
} from '@shared/hooks/useGenerateAuthSessionApi';
import {
  useGetAuthSessionApi,
  type GetAuthSessionResponse,
} from '@shared/hooks/useGetAuthSessionApi';

import { Box } from '@shared/components/Box';
import { AuthContainer } from './components';

import { getPortalFrontendUrl } from '@shared/utils/env';
import { AuthSessionStatusEnum } from '@shared/enums/AuthSessionStatusEnum';

const PORTAL_FRONTEND_URL = getPortalFrontendUrl() as string;
const CHECK_AUTH_SESSION_INTERVAL = 2000; // 2 seconds

export const SignInByQRPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [sessionId, setSessionId] = useState<string>('');

  const {
    generateAuthSession,
    loading: generateAuthSessionLoading,
    data: generateAuthSessionData,
    error: generateAuthSessionError,
  } = useGenerateAuthSessionApi();
  const {
    getAuthSession,
  } = useGetAuthSessionApi();

  const handleGenerateAuthSession = async () => {
    await generateAuthSession();
  };

  useEffect(() => {
    if (generateAuthSessionData) {
      setSessionId(generateAuthSessionData.id);
    }
  }, [generateAuthSessionData]);

  useEffect(() => {
    if (generateAuthSessionError) {
      api.error({
        message: t('messages.generateAuthSessionFailed'),
      });
    }
  }, [generateAuthSessionError]);

  useEffect(() => {
    handleGenerateAuthSession();
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    let isMounted = true;
    const intervalId = window.setInterval(async () => {
      try {
        const session = (await getAuthSession(sessionId)) as GetAuthSessionResponse;
        if (!isMounted) return;
        if (session.status === AuthSessionStatusEnum.IN_PROGRESS) {
          window.clearInterval(intervalId);
          navigate(`/auth/waiting-sso-authentication?session_id=${sessionId}`);
        }
      } catch {}
    }, CHECK_AUTH_SESSION_INTERVAL);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [sessionId]);

  return (
    <AuthContainer style={{ cursor: 'default' }}>
      {contextHolder}
      <Typography.Title level={2}>{t('common.signIn')}</Typography.Title>
      <Typography.Text type="secondary">{t('messages.scanQRCodeToSignIn')}</Typography.Text>

      <Divider />

      <Box>
        {generateAuthSessionLoading && <Spin size="large" />}

        {!generateAuthSessionLoading && sessionId && (
          <QRCode
            value={`${PORTAL_FRONTEND_URL}/auth/sign-in?session_id=${sessionId}`}
            size={200}
          />
        )}
      </Box>
    </AuthContainer>
  );
};
