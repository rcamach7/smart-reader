import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';

interface UserCredentials {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: UserCredentials) {
        await connectToMongoDB();

        const user = await UserSchema.findOne({
          username: credentials.username,
        });

        return user ? user : null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
