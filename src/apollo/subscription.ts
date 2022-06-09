import { gql } from "@apollo/client";

export const ACTIVE_USER = gql`
  subscription active_user {
    active_user: users_by_pk(id: "bbe8edfa-89d8-42b7-a2a4-a0d70035527a") {
      id
      name
      image_url
      threads: user_threads {
        thread {
          id
          name
          private
          members: thread_users {
            user {
              id
              name
            }
          }
        }
      }
    }
  }
`;
