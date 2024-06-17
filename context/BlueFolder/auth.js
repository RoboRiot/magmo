// auth.js
import { getSession, withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export function requireAuthentication(gssp) {
  return withApiAuthRequired(async (context) => {
    const session = getSession(context.req, context.res);
    const accessToken = session?.accessToken; // You need to configure token retrieval with Auth0 or your auth provider

    if (!session || !accessToken) {
      return {
        redirect: {
          destination: '/api/auth/login',
          permanent: false,
        },
      };
    }

    return await gssp(context, session, accessToken);
  });
}
