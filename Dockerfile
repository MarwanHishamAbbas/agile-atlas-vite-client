FROM node:22-bookworm-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app 

COPY package*.json ./

RUN pnpm install

COPY . .

CMD [ "pnpm", "dev", "--", "--host"]