
FROM gitpod/workspace-full
                    
USER gitpod

RUN cd /tmp \
    && sudo apt-get update \
    && sudo apt-get install -y curl \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && alias deno="/home/gitpod/.deno/bin/deno"