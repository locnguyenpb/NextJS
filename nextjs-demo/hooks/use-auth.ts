import { LoginPayload } from '@/models';
import { authApi } from 'api-client';
import useSWR from 'swr';

export function useAuth(options?: any) {
  const { data: profile, error, mutate } = useSWR('./profile', {
    dedupingInterval: 60 * 60 * 1000, // 1hr
    revalidateOnFocus: false,
    ...options,
  })

  const firstLoading = profile === undefined && error === undefined

  async function login(payload: LoginPayload) {
    await authApi.login(payload);

    await mutate();
  }

  async function logout() {
    await authApi.logout();
    mutate({}, false);
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading
  }
}