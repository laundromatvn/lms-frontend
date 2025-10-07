import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Divider, Typography, Flex, Button } from 'antd';

import {
  EmojiFunnySquare,
  SadSquare
} from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import {
  useGetAuthSessionApi,
} from '@shared/hooks/useGetAuthSessionApi';

import { Box } from '@shared/components/Box';
import { AuthContainer } from './components';

import { AuthSessionStatusEnum } from '@shared/enums/AuthSessionStatusEnum';

const CHECK_AUTH_SESSION_INTERVAL = 2_000; // ms
const TIMEOUT_INTERVAL = 180_000; // ms

export const WaitingSSOAuthenticationPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState<number>(TIMEOUT_INTERVAL);
  const [authSessionStatus, setAuthSessionStatus] = useState<AuthSessionStatusEnum>(AuthSessionStatusEnum.IN_PROGRESS);

  const pollIntervalRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const countdownRef = useRef<number>(countdown);
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  const {
    getAuthSession,
    data: getAuthSessionData,
  } = useGetAuthSessionApi();
  
  useEffect(() => {
    if (!sessionId) return;
    if (authSessionStatus !== AuthSessionStatusEnum.IN_PROGRESS) return;
    if (pollIntervalRef.current) return;

    let isMounted = true;
    pollIntervalRef.current = window.setInterval(async () => {
      if (countdownRef.current <= 0) {
        // Stop polling if timed out
        if (pollIntervalRef.current) {
          window.clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        return;
      }

      try {
        await getAuthSession(sessionId);
        if (!isMounted) return;
      } catch {
        setAuthSessionStatus(AuthSessionStatusEnum.FAILED);
        setCountdown(0);
      }
    }, CHECK_AUTH_SESSION_INTERVAL);

    return () => {
      isMounted = false;
      if (pollIntervalRef.current) {
        window.clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [sessionId, authSessionStatus]);

  useEffect(() => {
    if (!sessionId) return;
    if (authSessionStatus !== AuthSessionStatusEnum.IN_PROGRESS) return;
    if (timeoutRef.current) return;

    timeoutRef.current = window.setTimeout(() => {
      setAuthSessionStatus(AuthSessionStatusEnum.FAILED);
      setCountdown(0);
    }, TIMEOUT_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [sessionId, authSessionStatus]);

  useEffect(() => {
    if (authSessionStatus !== AuthSessionStatusEnum.IN_PROGRESS) return;
    if (countdown <= 0) return;
    if (countdownIntervalRef.current) return;

    countdownIntervalRef.current = window.setInterval(() => {
      setCountdown(prev => {
        const next = prev - 1000;
        if (next <= 0) {
          setAuthSessionStatus(AuthSessionStatusEnum.FAILED);
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) {
        window.clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [authSessionStatus, countdown]);

  useEffect(() => {
    if (authSessionStatus === AuthSessionStatusEnum.IN_PROGRESS) return;

    if (pollIntervalRef.current) {
      window.clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [authSessionStatus]);

  useEffect(() => {
    if (authSessionStatus !== AuthSessionStatusEnum.IN_PROGRESS) return;
    if (countdown <= 0) return;

    if (getAuthSessionData) {
      setAuthSessionStatus(getAuthSessionData.status);
    }
  }, [getAuthSessionData]);

  return (
    <AuthContainer style={{ cursor: 'default' }}>
      <Typography.Title level={2}>{t('common.signIn')}</Typography.Title>
      <Typography.Text type="secondary">{t('messages.pleaseSignInOnPortal')}</Typography.Text>

      <Divider />

      <Box>
        {authSessionStatus === AuthSessionStatusEnum.IN_PROGRESS && (
          <Flex vertical align="center" justify="center" gap={theme.custom.spacing.medium}>
            <EmojiFunnySquare color={theme.custom.colors.warning.default} weight='BoldDuotone' width={96} height={96} />
            <Typography.Text type="secondary">{t('messages.pleaseWaitABitWeAreProcessingYourRequest')}</Typography.Text>
            <Typography.Text type="secondary">
              {t('messages.sessionExpiresIn', { time: `${Math.ceil(countdown / 1000)}s` })}
            </Typography.Text>
          </Flex>
        )}

        {authSessionStatus === AuthSessionStatusEnum.FAILED && (
          <Flex vertical align="center" justify="center" gap={theme.custom.spacing.medium}>
            <SadSquare color={theme.custom.colors.danger.default} weight='BoldDuotone' width={96} height={96} />
            <Typography.Text type="danger">{t('messages.pleaseTryAgain')}</Typography.Text>
            <Button
              type="primary"
              onClick={() => navigate('/auth/sign-in-by-qr')}
              size="large"
            >{t('common.signInByQR')}</Button>
          </Flex>
        )}
      </Box>
    </AuthContainer>
  );
};
