import { MyContext } from '../..';
import { GraphQLError } from 'graphql';
import {
  LogoutResponse,
  MutationLoginArgs,
  MutationResolvers,
  MutationSignupArgs,
  User,
} from '../../__generated__/resolvers-types';
import { prisma } from '../../db.js';
import { generateToken } from '../../helpers/generateToken.js';
import {
  comparePassword,
  hashPassword,
} from '../../helpers/password-helpers.js';




export const userMutations: MutationResolvers = {
  signup: async (
    _,
    { email, password }: MutationSignupArgs,
    { res }: MyContext
  ): Promise<{ user: User; token: string }> => {
    try {
   
      // verify or validate the presence of email and password
      if (!email || !password) {
        throw new GraphQLError('Email and password are required');
      }

      // check if the user already exists

      const existingUser = await prisma.users.findUnique({
        where: {
          email,
        },
      });


      if (existingUser) {
       
        throw new GraphQLError('Email is already registered');
      }

      // else hash the password using the hashPassword helper function

      const hashedPassword = await hashPassword(password);

      // create the new user

      const newUser = await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });



      // generate JW Token using the id of the new user and attach it to the

      const token = generateToken(newUser.id);


      // set authentication cookie containing the token

      res.cookie('cookie', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 // 1 hour in milliseconds
      });
      return {user: newUser, token};
    } catch (error) {
      if (error instanceof GraphQLError) {
        // GraphQL validation error
        throw error;
      } else if (error.message === 'Email is already registered') {
        // Existing user error
        throw new Error('Email is already registered');
      } else {
        // Other unexpected errors
        throw new Error('Error signing up the user');
      }
    }
  },

  login: async (_, { email, password }: MutationLoginArgs, { res }: MyContext):Promise<{ user: User; token: string }> => {
    try {
      // check that there are inputs, i.e there are no empty values for both fields

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // check if user email exists in the db

      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error(`Invalid credentials`);
      }

      // check if the password exists, i.e verify it

      const validPassword = await comparePassword(password, user.password);

      if (!validPassword) {
        throw new Error(`Invalid Credentials`);
      }

      // if both email and password pass checks, generate token and login the user

      const token = generateToken(user.id);
      res.cookie('cookie', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000 // 1 hour in milliseconds
      });

     



      

      return {user,token};
    } catch (error) {
      throw new Error(error.message)
    }
  },
  logout: async (_, __, { user, res }: MyContext): Promise<LogoutResponse> => {

   

    let userEmail = null
    try {
      if (!user) {
        return {
          success: false,
          email: null
        }
      }



      userEmail = user.email;

      // clear the authentication cookie

      res.clearCookie('cookie');
      
      return {
        success: true,
        email: userEmail,
      };
    } catch (error) {
      console.error(`Error logging out user, ${error}`);
      return {
        success: false,
        email: null,
      };
    }
  },
};
