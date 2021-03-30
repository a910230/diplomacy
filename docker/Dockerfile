FROM plugins/base:linux-amd64

LABEL maintainer="a910230 <a910230@gmail.com>" \
  org.label-schema.name="diplomacy" \
  org.label-schema.vendor="a910230" \
  org.label-schema.schema-version="1.0"

EXPOSE 8080

COPY release/server /bin/

ENTRYPOINT ["/bin/solver"]