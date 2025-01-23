FROM node:23.6.1-alpine
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs ./apps/flowmanagementui/.next/standalone ./

RUN ls -la
RUN ls -la ./apps/flowmanagementui

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/flowmanagementui/server.js"]
