import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const getUserLogin = () => ({
    id: "id-1",
    username: "admin",
    profile: {
      name: "Andy Khu",
      gender: "Male",
      job: "Frontend Developer",
      email: "andykhu02@gmail.com",
      img: "https://github.com/shadcn.png",
    },
    role: {
      id: "idrole",
      name: "admin",
    }
  })

export const authOptions:NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username'},
                password: {label: 'Password'}
            },
            async authorize(credentials, req) {
                if(credentials?.username === 'admin' && credentials.password === 'admin')
                    return getUserLogin()
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user)
                token.user = user
            return token;
        },
        session: async ({session,token}) => {
            if(token)
                session.user = token.user 
            return session
        }
    }
}