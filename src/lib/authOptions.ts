import { Login } from '@/services/authServices';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions:NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username'},
                password: {label: 'Password'}
            },
            async authorize(credentials, req) {
                const data = {username: credentials?.username, password: credentials?.password}
                try{
                    const res = await Login(data)
                    if(res.ok)
                        return res.json()
                    return res.text().then(text => {throw new Error(text)})
                }catch(error){
                    return null
                }
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