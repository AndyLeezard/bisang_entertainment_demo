import { ClientSafeProvider, getProviders, getSession } from "next-auth/react"
import Navbar from "../../components/layout/navbar"
import SigninContainer from "../../components/signinContainer"

type SignInProps = {
  providers: ClientSafeProvider[]
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <>
      <div className="available-space">
        <SigninContainer providers={providers} />
      </div>
      <Navbar hideSignin />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: "/" },
    }
  }

  const providers = await getProviders()
  //const csrfToken = await csrfToken(context)
  return {
    props: { providers },
    //csrfToken: csrfToken
  }
}
