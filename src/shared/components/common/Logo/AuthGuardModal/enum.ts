export const AuthGuardModalStep = {
  DISPLAY_QR_CODE: 'DISPLAY_QR_CODE',
  WAITING_VERIFICATION_STEP: 'WAITING_VERIFICATION_STEP',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

export type AuthGuardModalStep = typeof AuthGuardModalStep[keyof typeof AuthGuardModalStep];
