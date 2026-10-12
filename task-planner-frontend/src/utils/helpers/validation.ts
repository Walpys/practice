import { VALIDATION_RULES } from "../consts/authConsts/auth.consts";


export const validateUsername = (username: string): boolean => {
  return username.trim().length >= VALIDATION_RULES.USERNAME_MIN_LENGTH;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
};