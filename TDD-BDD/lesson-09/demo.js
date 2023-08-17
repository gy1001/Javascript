export const generateConfig = () => {
  return {
    server: "http://localhost",
    port: 8081
  }
}
export const generateAppConfig = () => {
  return {
    server: "http://localhost",
    port: 8082,
    time: new Date()
  }
}
