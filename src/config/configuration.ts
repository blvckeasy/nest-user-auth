interface smsData {
  method: "sendCode" | "verification",
  params: {
    phoneNumber: string
    code?: string
  }
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432
  },
  smsGateway: {
    url: "https://api.sms5.ru/",
    token: process.env.SMS_TOKEN,
    createFetchConfig(method: string, phoneNumber: string, code: string) {
      return {
        method: 'post',
        url: "https://api.sms5.ru/",
        headers: {
          Authorization: `Bearer ${process.env.SMS_TOKEN}`
        },
        data: JSON.stringify({
          method,
          params: {
            phoneNumber,
            code
          }
        })
      }
    }
  },
});