import { HTTP } from '..'

export const getWXAuthCode = (): Promise<{ url: string }> => {
  return HTTP.get('oauth2/wechat/code')
}

export const getUserInfo = (code: string | null) => {
  return HTTP.post('admin/wechat', { code })
}

export const getChangGuanAuthCode = (code: string) => {
  return HTTP.post('oauth2/changguan', { code })
}
