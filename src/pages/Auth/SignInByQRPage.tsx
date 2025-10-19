import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Divider, Typography, Spin, QRCode, notification, Button, Flex } from 'antd';

import {
  Refresh
} from '@solar-icons/react';

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
const CHECK_AUTH_SESSION_INTERVAL = 2_000; // 2 seconds
const TIMEOUT_INTERVAL = 180_000; // 180 seconds

export const SignInByQRPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [sessionId, setSessionId] = useState<string>('');
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);
  const [countdownMs, setCountdownMs] = useState<number>(TIMEOUT_INTERVAL);

  const pollIntervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

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

  const clearTimers = () => {
    if (pollIntervalRef.current) {
      window.clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  const handleReload = async () => {
    clearTimers();
    setIsTimedOut(false);
    setSessionId('');
    setCountdownMs(TIMEOUT_INTERVAL);
    await handleGenerateAuthSession();
  };

  const formatCountdown = (ms: number): string => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (generateAuthSessionData) {
      console.log("url", `${PORTAL_FRONTEND_URL}/auth/sign-in?session_id=${generateAuthSessionData.id}`);
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
    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (!sessionId) {
      return;
    }
    if (isTimedOut) return;

    let isMounted = true;
    if (!pollIntervalRef.current) {
      pollIntervalRef.current = window.setInterval(async () => {
        if (isTimedOut) return;
        try {
          const session = (await getAuthSession(sessionId)) as GetAuthSessionResponse;
          if (!isMounted) return;
          if (session.status === AuthSessionStatusEnum.IN_PROGRESS || session.status === AuthSessionStatusEnum.SUCCESS) {
            clearTimers();
            navigate(`/auth/waiting-sso-authentication?session_id=${sessionId}`);
          }
        } catch {}
      }, CHECK_AUTH_SESSION_INTERVAL);
    }

    if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        setIsTimedOut(true);
        clearTimers();
      }, TIMEOUT_INTERVAL);
    }

    if (!countdownIntervalRef.current) {
      countdownIntervalRef.current = window.setInterval(() => {
        setCountdownMs(prev => {
          const next = prev - 1_000;
          if (next <= 0) {
            setIsTimedOut(true);
            clearTimers();
            return 0;
          }
          return next;
        });
      }, 1_000);
    }

    return () => {
      isMounted = false;
    };
  }, [sessionId, isTimedOut]);

  return (
    <AuthContainer style={{ cursor: 'default' }}>
      {contextHolder}
      <Typography.Title level={2}>{t('common.signIn')}</Typography.Title>
      <Typography.Text type="secondary">{t('messages.scanQRCodeToSignIn')}</Typography.Text>

      <Divider />

      <Box>
        {generateAuthSessionLoading && <Spin size="large" />}

        {!generateAuthSessionLoading && sessionId && (
          <Flex vertical align="center" justify="center" gap={theme.custom.spacing.medium}>
            <QRCode
              value={`${PORTAL_FRONTEND_URL}/auth/sign-in?session_id=${sessionId}`}
              size={200}
            />
            {!isTimedOut && (
              <Typography.Text type="secondary">
                {t('messages.sessionExpiresIn', { time: formatCountdown(countdownMs) })}
              </Typography.Text>
            )}
            {isTimedOut && (
              <>
                <Typography.Text type="secondary">{t('messages.pleaseTryAgain')}</Typography.Text>
                <Button type="primary" onClick={handleReload} size="large" style={{ width: '100%' }}>
                  <Refresh />
                  {t('common.reload')}
                </Button>
              </>
            )}
          </Flex>
        )}
      </Box>
    </AuthContainer>
  );
};
