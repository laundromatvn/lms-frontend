import React, { useEffect, useRef, useState } from 'react';
import { data, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Divider, Typography, Flex, Button, notification } from 'antd';

import {
  EmojiFunnySquare,
  SadSquare
} from '@solar-icons/react';

import { useTheme } from '@shared/theme/useTheme';

import { ACCESS_TOKEN_TTL_SECONDS, REFRESH_TOKEN_TTL_SECONDS } from '@core/constant';
import { type TokenBundle } from '@core/auth/tokenManager';

import { AuthSessionStatusEnum } from '@shared/enums/AuthSessionStatusEnum';
import { tokenManager } from '@core/auth/tokenManager';
import { oneTimeTokenStorage } from '@core/storage/oneTimeTokenStorage';

import {
  useGetAuthSessionApi,
} from '@shared/hooks/useGetAuthSessionApi';
import {
  useSignInByOneTimeAccessTokenApi,
} from '@shared/hooks/useSignInByOneTimeAccessTokenApi';
import {
  useGetLMSProfileApi,
  type GetMeResponse,
} from '@shared/hooks/useGetLMSProfile';
import { tenantStorage } from '@core/storage/tenantStorage';
import { profileStorage } from '@core/storage/profileStorage';

import { Box } from '@shared/components/Box';
import { AuthContainer } from './components';


const CHECK_AUTH_SESSION_INTERVAL = 2_000; // ms
const TIMEOUT_INTERVAL = 180_000; // ms

export const WaitingSSOAuthenticationPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

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
  const {
    signInByOneTimeAccessToken,
    loading: signInByOneTimeAccessTokenLoading,
    data: signInByOneTimeAccessTokenData,
    error: signInByOneTimeAccessTokenError,
  } = useSignInByOneTimeAccessTokenApi();
  const {
    getLMSProfile,
    data: getLMSProfileData,
    error: getLMSProfileError,
  } = useGetLMSProfileApi<GetMeResponse>();

  const handleSignInByOneTimeAccessToken = () => {
    const token = oneTimeTokenStorage.load();
    if (!token) return;

    signInByOneTimeAccessToken({ oneTimeAccessToken: token });
  };
  
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
    if (!getAuthSessionData) return;

    setAuthSessionStatus(getAuthSessionData.status);
    
    if (getAuthSessionData.status === AuthSessionStatusEnum.SUCCESS) {
      const token = getAuthSessionData.data as string | null;
      if (typeof token === 'string' && token.length > 0) {
        oneTimeTokenStorage.save(token);
        handleSignInByOneTimeAccessToken();
      }
    }
  }, [getAuthSessionData]);

  useEffect(() => {
    if (signInByOneTimeAccessTokenData) {
      const bundle: TokenBundle = {
        accessToken: (signInByOneTimeAccessTokenData as any).access_token,
        refreshToken: (signInByOneTimeAccessTokenData as any).refresh_token,
        accessTokenExp: Date.now() + ACCESS_TOKEN_TTL_SECONDS * 1000,
        refreshTokenExp: Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000,
      }
      tokenManager.setTokens(bundle)
      getLMSProfile()
    }
  }, [signInByOneTimeAccessTokenData]);

  useEffect(() => {
    if (!getLMSProfileData) return;

    try {
      profileStorage.save(getLMSProfileData)
      tenantStorage.save(getLMSProfileData.tenant)
    } catch (e) {
    }

    navigate('/store-configuration/stores')
  }, [getLMSProfileData])

  useEffect(() => {
    if (signInByOneTimeAccessTokenError) {
      api.error({
        message: t('messages.signInByOneTimeAccessTokenFailed'),
      });
    }
  }, [signInByOneTimeAccessTokenError]);  

  useEffect(() => {
    if (getLMSProfileError) {
      api.error({
        message: t('messages.fetchLMSProfileFailed'),
      });
    }
  }, [getLMSProfileError]);

  return (
    <AuthContainer style={{ cursor: 'default' }}>
      {contextHolder}

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
              onClick={() => navigate('/auth/sign-in')}
              size="large"
            >{t('common.signInByQR')}</Button>
          </Flex>
        )}
      </Box>
    </AuthContainer>
  );
};
