const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const userClientService = {
  async getSession() {
    const res = await fetch(`${AUTH_URL}/session`, {
      credentials: "include", // send cookies automatically
    });

    if (!res.ok) return null;

    return res.json();
  },
};
