FROM ubi8/ubi-minimal:8.3 as BUILD

# shadow-utils is needed for having adduser command
# unzip and curl is needed for deno install script
RUN microdnf install -y shadow-utils unzip curl && \
    microdnf clean all && \
    rm -rf /var/cache/yum && \
    useradd -m deno 

USER deno

RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV DENO_INSTALL="/home/deno/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

WORKDIR /home/deno/

COPY --chown=deno:deno webserver.ts ./

RUN deno fmt --check webserver.ts && \
    deno compile --unstable --allow-net --allow-env webserver.ts

# Prepare final image with compiled application

FROM ubi8/ubi-minimal:8.3 as FINAL

RUN microdnf install -y shadow-utils && \
    useradd -m deno  && \
    microdnf remove -y shadow-utils && \
    microdnf clean all && \
    rm -rf /var/cache/yum

USER deno

WORKDIR /home/deno/

COPY --from=BUILD /home/deno/webserver /home/deno/

CMD ["./webserver"]
