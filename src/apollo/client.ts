import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://whatsapp-hasura.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "R36MMtRLpsfzUSrPZDVCKXxXxXzB8GMBsG68w8q1Qp7Gj7QmX4hs4t0cgcL7XP1I"
  }
});
