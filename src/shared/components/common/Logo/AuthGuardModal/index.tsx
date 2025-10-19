import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Flex, theme } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { useGetSystemTaskApi } from '@shared/hooks/useGetSystemTaskApi';

import { useInactivityRedirect } from '@shared/hooks/useInactivityRedirect';
import { BaseModal } from '@shared/components/BaseModal';
import { SystemTaskStatusEnum } from '@shared/enums/SystemTaskStatusEnum';

import { AuthGuardModalStep } from './enum';

import { DisplayQRCodeStep } from './DisplayQRCodeStep';
import { WaitingVerificationStep } from './WaitingVerificationStep';
import { SuccessStep } from './SuccessStep';
import { FailedStep } from './FailedStep';
import LeftRightSection from '@shared/components/LeftRightSection';


interface Props {
  open: boolean;
  onClose: () => void;
}

const TIMEOUT_MS = 180_000;

export const AuthGuardModal: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [remainingMs, setRemainingMs] = useState<number>(TIMEOUT_MS);
  const [step, setStep] = useState<AuthGuardModalStep>(AuthGuardModalStep.DISPLAY_QR_CODE);
  const [systemTaskId, setSystemTaskId] = useState<string>('');

  const { getSystemTask } = useGetSystemTaskApi();

  useEffect(() => {
    if (!open || !systemTaskId) return;

    const id = window.setInterval(async () => {
      try {
        const task = await getSystemTask(systemTaskId);
        if (task.status === SystemTaskStatusEnum.IN_PROGRESS) {
          setStep(AuthGuardModalStep.WAITING_VERIFICATION_STEP);
        } else if (task.status === SystemTaskStatusEnum.SUCCESS) {
          setStep(AuthGuardModalStep.SUCCESS);
        } else if (task.status === SystemTaskStatusEnum.FAILED) {
          setStep(AuthGuardModalStep.FAILED);
        }
      } catch (_) {
        // ignore transient errors while polling
      }
    }, 2000);

    return () => window.clearInterval(id);
  }, [open, systemTaskId, getSystemTask]);

  useInactivityRedirect({
    timeoutMs: TIMEOUT_MS,
    targetPath: '/customer-flow/welcome',
    onTimeout: () => onClose(),
  });

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

  return (
    <BaseModal
      isModalOpen={open}
      setIsModalOpen={() => onClose()}
    >
      <Flex vertical style={{ width: '100%', height: 'calc(100% - 64px)' }}>
        {step === AuthGuardModalStep.DISPLAY_QR_CODE && (
          <DisplayQRCodeStep
            open={open}
            timeLeftMs={remainingMs}
            onSuccess={(systemTaskId: string) => setSystemTaskId(systemTaskId)}
            onResetTimeout={() => setRemainingMs(TIMEOUT_MS)}
          />
        )}

        {step === AuthGuardModalStep.WAITING_VERIFICATION_STEP && (
          <WaitingVerificationStep
            remainingMs={remainingMs}
          />
        )}

        {step === AuthGuardModalStep.SUCCESS && (
          <SuccessStep onClose={onClose} />
        )}

        {step === AuthGuardModalStep.FAILED && (
          <FailedStep onClose={onClose} />
        )}

        <LeftRightSection
          left={(
            <Button
              type="default"
              size="large"
              style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
              onClick={() => onClose()}
            >
              {t('common.back')}
            </Button>
          )}
          right={null}
        />
      </Flex>
    </BaseModal>
  );
};


