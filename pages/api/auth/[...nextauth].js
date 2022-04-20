import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import { comparePassword } from 'hooks/auth';
import { connectToDatabase } from 'hooks/useMongodb';

export default NextAuth({
  secret: process.env.SECRET,

  session: {
    jwt: true,
  },
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    encryption: false,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return user.status === 'Active';
    },
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.jti = token.jti;
      return session;
    },
  },
  pages: {
    // signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/signin', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  debug: true,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        //const res = await fetch('/your/endpoint', {
        //  method: 'POST',
        //  body: JSON.stringify(credentials),
        //  headers: { 'Content-Type': 'application/json' },
        //});
        const { db } = await connectToDatabase();
        const found = await db.collection('users').findOne({ email: credentials.username });

        if (!found) return null;

        if (!comparePassword(credentials.password, found.password)) return null;
        return { id: found._id.toString(), email: found.email, name: found.name, img: found.img, region: found.region, role: found.role, status: found.status };
      },
    }),
  ],
});
