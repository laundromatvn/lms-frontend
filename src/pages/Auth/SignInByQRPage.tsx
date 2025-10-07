import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Divider, Typography, Spin, QRCode, notification } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import {
  useGenerateAuthSessionApi,
  type GenerateAuthSessionResponse,
} from '@shared/hooks/useGenerateAuthSessionApi';
import {
  useGetAuthSessionApi,
  type GetAuthSessionResponse,
} from '@shared/hooks/useGetAuthSessionApi';

import { Box } from '@shared/components/Box';
import { AuthContainer } from './components';

import { getPortalFrontendUrl } from '@shared/utils/env';

const PORTAL_FRONTEND_URL = getPortalFrontendUrl() as string;

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
    loading: getAuthSessionLoading,
    data: getAuthSessionData,
    error: getAuthSessionError,
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
    handleGenerateAuthSession();
  }, []);

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
