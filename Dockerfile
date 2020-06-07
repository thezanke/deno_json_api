FROM registry.access.redhat.com/ubi8/ubi:latest as development
RUN yum --disableplugin=subscription-manager -y install unzip
ENV DENO_INSTALL="/usr/local/deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"
WORKDIR /app
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
COPY src src

FROM development
CMD deno run --allow-http src/serve.ts
