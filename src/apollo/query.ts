import { gql } from "@apollo/client";

export const ACTIVE_USER_MESSAGES = gql`
  query UserMessages {
    users_by_pk(id: "bbe8edfa-89d8-42b7-a2a4-a0d70035527a") {
      name
      image_url
      user_threads {
        thread {
          messages {
            text
          }
        }
      }
    }
  }
`;
