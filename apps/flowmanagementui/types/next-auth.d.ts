// Import the base types from next-auth
import 'next-auth';
import { JWT } from 'next-auth/jwt';

// Extend the Session type
declare module 'next-auth' {
  /**
   * Extends the built-in session types to include the accessToken attribute,
   * which isn't part of the original Session type from next-auth.
   */
  interface Session {
    token?: JWT;
  }
}
