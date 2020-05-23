
FROM gitpod/workspace-full
                    
USER gitpod

RUN cd /tmp \
    && apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && alias deno="/home/gitpod/.deno/bin/deno" && \
    deno --version