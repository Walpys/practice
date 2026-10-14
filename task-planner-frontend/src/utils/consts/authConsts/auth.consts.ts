export const VALIDATION_RULES = {
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 6,
} as const;

export const VALIDATION_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_MIN: `Username must be at least ${VALIDATION_RULES.USERNAME_MIN_LENGTH} characters`,
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
} as const;