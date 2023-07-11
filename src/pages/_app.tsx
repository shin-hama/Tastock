import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import CheckSession from '~/components/Login/CheckSession'

import MuiProvider from '~/providers/MuiProviders'
import { api } from '~/utils/api'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <MuiProvider>
      <SessionProvider session={session}>
        <CheckSession>
          <Component {...pageProps} />
        </CheckSession>
      </SessionProvider>
    </MuiProvider>
  )
}

export default api.withTRPC(MyApp)
