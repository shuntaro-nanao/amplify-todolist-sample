import { AmplifyUserContext } from '@/store/user'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { AppProps } from 'next/app'
import { FC, useEffect, useState } from 'react'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [user, setUser] = useState<CognitoUser>()

  useEffect(() => {
    return onAuthUIStateChange((_, data) => {
      setUser(data as CognitoUser | undefined)
    })
  }, [])

  return (
    <AmplifyUserContext.Provider value={user}>
      <Component {...pageProps} />
    </AmplifyUserContext.Provider>
  )
}

export default MyApp