import { z } from 'zod';

export interface SubscriptionState {
  step: 1 | 2;
  email: string;
  error: string | null;
  success: boolean;
}

export const initialState: SubscriptionState = {
  step: 1,
  email: '',
  error: null,
  success: false,
};

const emailSchema = z.email();

export async function subscribeAction(
  previousState: SubscriptionState,
  formData: FormData,
): Promise<SubscriptionState> {
  if (formData.get('intent') === 'back') {
    return { ...initialState, email: previousState.email };
  }

  if (previousState.success) return previousState;

  if (previousState.step === 1) {
    const value = formData.get('email');
    const email = typeof value === 'string' ? value.trim() : '';

    if (!emailSchema.safeParse(email).success) {
      return {
        ...initialState,
        email,
        error: email ? 'Введите корректный email' : 'Введите email',
      };
    }

    return { step: 2, email, error: null, success: false };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ...previousState, error: null, success: true };
}
