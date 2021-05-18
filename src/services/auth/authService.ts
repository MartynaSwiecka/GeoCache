import Auth0 from 'react-native-auth0';
import { AUTH_DOMAIN, AUTH_CLIENT_ID } from 'react-native-dotenv';

export default new Auth0({
  domain: AUTH_DOMAIN,
  clientId: AUTH_CLIENT_ID,
});
