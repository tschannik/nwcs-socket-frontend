const { protocol, hostname, port } = window.location;

const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const config = {
  protocol,
  hostname,
  port,
  origin,
};

export default config;
