import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { signIn, useSession } from 'next-auth/react'
import { type FC, type PropsWithChildren, useEffect } from 'react'

const CheckSession: FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn().catch(console.error)
    }
  })

  if (status === 'loading') {
    return (
      <Container maxWidth='sm'>
        <p>Loading</p>
      </Container>
    )
  } else if (status === 'unauthenticated') {
    return (
      <Container maxWidth='sm'>
        <Button
          onClick={() => {
            signIn().catch(console.error)
          }}
        >
          Sign In
        </Button>
      </Container>
    )
  } else if (status === 'authenticated') {
    return <>{children}</>
  }
}

export default CheckSession
