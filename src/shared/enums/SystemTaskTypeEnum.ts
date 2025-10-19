export const SystemTaskTypeEnum = {
  SIGN_IN: 'SIGN_IN',
  VERIFY_FOR_STORE_CONFIGURATION_ACCESS: 'VERIFY_FOR_STORE_CONFIGURATION_ACCESS',
} as const;

export type SystemTaskTypeEnum = typeof SystemTaskTypeEnum[keyof typeof SystemTaskTypeEnum];
