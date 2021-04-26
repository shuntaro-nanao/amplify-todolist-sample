import { configure } from '@/my-aws-exports'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { FC } from 'react'

configure()

export const LoginRequired: FC = ({ children }) => {
  return <AmplifyAuthenticator>{children}</AmplifyAuthenticator>
}