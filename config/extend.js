export default (config) => {
  config.apiServerUrl = (config.ssl ? 'https://' : 'http://') + config.apiServer
  return config
}
