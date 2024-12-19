import axios from 'axios';
import dotenv from 'dotenv';
import Http from 'http';
import { dotEnvFilePath } from '../../config';

dotenv.config({ path: dotEnvFilePath });

export async function getAccessToken() {
  let accessToken: string | undefined;
  let accessTokenError: string | undefined;

  const data = new URLSearchParams();
  data.append('username', 'fmp-test-sso-local');
  data.append('password', 'Test@123');
  data.append('grant_type', 'password');
  data.append('client_id', 'flow-management-ui');

  try {
    const response = await axios.post(
      'https://fes-cdt-tc1-tpc5.lab.apmthybridcloud.net/keycloak/realms/flow-management/protocol/openid-connect/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'insomnia/2023.5.8',
          'Upgrade-Insecure-Requests': '1',
        },
        httpAgent: new Http.Agent({ keepAlive: true }),
      },
    );

    accessToken = response.data.access_token;
  } catch (error) {
    accessTokenError = `Error fetching access token: ${error}`;
  }

  return { accessToken, accessTokenError };
}
