export const AuthSessionStatusEnum = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

export type AuthSessionStatusEnum = typeof AuthSessionStatusEnum[keyof typeof AuthSessionStatusEnum];
