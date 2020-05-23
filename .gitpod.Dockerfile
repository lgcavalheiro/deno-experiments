
FROM gitpod/workspace-full
                    
USER gitpod

RUN curl -fsSL https://deno.land/x/install/install.sh | sh \
    && alias deno="/home/gitpod/.deno/bin/deno" && \
    deno --version