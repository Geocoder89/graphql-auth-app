import {gql} from '@apollo/client'


export const SIGN_UP_MUTATION = gql`

mutation($email: String!, $password: String!) {
  signup(email: $email, password: $password) {
    user {
      email
      id
    }
    token
  }
}


`