import React, {useEffect} from 'react'
import { Container, Row, Col } from 'react-grid-system';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../../utils/graphql-client';
import Button from '../../../components/Button/Button';
import { useSession, signIn, signOut } from "next-auth/client"
import EditEvent from '../../../components/EditEvent/EditEvent';
import Search from '../../../components/Search/Search';
import ViewEvent from '../../../components/ViewEvent/ViewEvent';
import Messages from '../../../components/Messages/Messages';
import {useRouter} from 'next/router'
import styled from 'styled-components';

const StyledEditEvent = styled.div`
  background-color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px #d0d0d0;
  width: 100%;
  height: 500px;
  padding: 10px;
`;

const Event = () => {

  const [session, loading] = useSession()

  const router = useRouter()

//   useEffect(() => {

//     setTimeout(function() {
//       if (session) {
//         router.push('/')
//       } 
//     }, 3000);
// }, [session])

    const you = session?.id;
    
  // const router = useRouter();
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
              going {
                data {
                  id
                  attributes {
                    username
                  }
                }
              }
            }
          }
        }
        usersPermissionsUsers {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    `;
  
    const { data, error } = useSWR(() => id ? query : null, fetcher);
    // console.log(data);
    // console.log(error);

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

    <Row>

    <Col md={3}>
      {/* Left */}
      <Messages id={id} />
    </Col>

    <Col md={9}>
      {/* Centre */}
      {data ? (
        <div>
          {you == author ?
            <div>
              <EditEvent defaultValues={data.event} id={id} users={data?.usersPermissionsUsers.data} />
              <Button size="small" onClick={() => deleteARecipe(id)} label="Delete" />
            </div>  
            : <ViewEvent data={data.event} />
          }
        </div>
      ) : (
        <p>Loading</p>
      )}
      </Col>

      {/* <Col md={3}>
        Right */}

        {/* <h5>Going</h5> 
        <p>{data?.event?.data?.attributes?.going?.data?.attributes?.username}</p> */}

      {/* </Col> */}
      </Row>
    </Container>
  )
}

export default Event