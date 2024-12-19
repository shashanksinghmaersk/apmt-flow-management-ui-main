// types/node-env.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: string;
    NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET: string;
    NEXT_PUBLIC_KEYCLOAK_URL: string;
    NEXT_PUBLIC_KEYCLOAK_REALM: string;
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_BASE_WS_URL: string;
  }
}
