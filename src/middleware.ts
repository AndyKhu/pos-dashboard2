import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { verifiedToken } from "./services/authServices"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: async({ token }) => {
          if(token){
              const res = await verifiedToken(token.user.token.accessToken)
              if(res.ok)
                  return true
              return false
          }
          return false
      }
    },
  }
)
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)',] }