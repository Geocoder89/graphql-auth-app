import { MyContext } from '../..';
import {
  QueryResolvers,
} from '../../__generated__/resolvers-types';
import { generateToken } from '../../helpers/generateToken.js';


export const userQueries: QueryResolvers = {
  me: async (_, __, {user,res,token}: MyContext) => {
  
   
    try {
      
     
    
    if(!user) {
      throw new Error('User not authenticated')
    }

    

      return user
    } catch (error) {
      console.error(`Failed to fetch user ${error}`)
      throw new Error('Failed to fetch User')
    }


 
  },
};
