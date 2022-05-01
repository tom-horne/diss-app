import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../../utils/graphql-client';
import { useSession, signIn, signOut } from "next-auth/client"
import {useRouter} from 'next/router'

const Event = () => {
    
    const router = useRouter();
    const { id } = router.query;

    const fetcher = async (query) => await graphQLClient({
      query: query,
      variables: {
          id,
      },
    });
    const query = gql`
      query getEvent($id: ID) {
        event(id: $id) {
          data {
            id
            attributes {
              Title
              createdAt
            }
          }
        }
      }
    `;
  
    const { data, error } = useSWR(() => id ? query : null, fetcher);
    console.log(data);
    console.log(error);
  

  return (
    <Container>
      {data ? (
        <h1>{data.event.data.attributes.Title}</h1>
      ) : (
        <p>Loading</p>
      )}
    </Container>
  )
}

export default Event