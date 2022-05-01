import NextAuth from "next-auth"
import Providers from 'next-auth/providers'
import axios from 'axios'

const options = {
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "test@test.com" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI}/api/auth/local`, {
                        identifier: credentials.email,
                        password: credentials.password
                    });
                    if (data) {
                        return data;
                    }
                    else {
                        return null;
                    }
                } catch (e) {
                  const errorMessage = e.response.data.message
                  // Redirecting to the login page with error message          in the URL
                  console.log('caught error', errorMessage);
                    throw new Error(errorMessage + '&email=' + credentials.email)
                    return null;
                }
            }
        })
    ],


    session: {
        jwt: true,
    },

    callbacks: {
        // Getting the JWT token from API response
        jwt: async (token, user, account) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user.jwt;
                token.id = user.user.id;
                token.name = user.user.username;
                token.email = user.user.email;
            }
            return Promise.resolve(token);
        },

        session: async (session, user) => {
            session.jwt = user.jwt;
            session.id = user.id;
            return Promise.resolve(session);
        },
    }
}

export default (req, res) => NextAuth(req, res, options)