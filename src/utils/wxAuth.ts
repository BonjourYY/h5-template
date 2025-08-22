import { getUserInfo, getWXAuthCode } from '@/api/oauth2'
import { getToken, setToken } from './token'

export const wxAuth = async () => {
  if (getToken()) {
    return
  }
  const params = new URLSearchParams(window.location.search)
  if (params.get('code')) {
    const data = await getUserInfo(params.get('code'))
    setToken(data.access_token)
  } else {
    const { url } = await getWXAuthCode()
    window.location.href = url
  }
}
