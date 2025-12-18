let token: string | null = null;
const listeners = new Set<() => void>();

export const tokenStore = {
  setToken: (newToken: string) => {
    token = newToken;
    listeners.forEach((listener) => listener());
  },
  getSnapshot: () => token,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
