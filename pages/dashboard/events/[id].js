import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../../utils/graphql-client';
import Button from '../../../components/Button/Button';
import { useSession, signIn, signOut } from "next-auth/client"
import EditEvent from '../../../components/EditEvent/EditEvent';
import ViewEvent from '../../../components/ViewEvent/ViewEvent';
import {useRouter} from 'next/router'

const Event = () => {

  const [session, loading] = useSession()

    const you = session?.id;
    
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
              title
              createdAt
              author {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
              description
              date
              time
            }
          }
        }
      }
    `;
  
    const { data, error } = useSWR(() => id ? query : null, fetcher);
    console.log(data);
    console.log(error);

    const author = data?.event?.data?.attributes?.author?.data?.id
  
    const deleteARecipe = async (id) => {
      const query = gql`
        mutation CreateAnEvent($id: ID!) {
          deleteEvent(
            id: $id
          ) {
            data {
              id
            }
          }
        }
      `;

      const variables = {
        id,
      };
  
    try {
      await graphQLClient({ query: query, variables: variables });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {data ? (
        <div>
          {you == author ?
            <div>
              <EditEvent defaultValues={data.event} id={id} />
              <Button size="small" onClick={() => deleteARecipe(id)} label="Delete" />
            </div>  
            : <ViewEvent data={data.event} />
          }
        </div>
      ) : (
        <p>Loading</p>
      )}
    </Container>
  )
}

export default Event