import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserSchema } from '@/schemas/index';
import { connectToMongoDB } from '@/services/mongobd';
import * as bcrypt from 'bcrypt';

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
        try {
          await connectToMongoDB();

          const user = await UserSchema.findOne({
            username: credentials.username,
          });

          if (user) {
            const match = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (match) {
              const { password, ...userWithoutPassword } = user;
              return userWithoutPassword;
            }
          }
        } catch (error) {
          console.error('Login error:', error);
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
