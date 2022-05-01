import React from 'react'
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../utils/graphql-client';
import { Container, Row, Col } from 'react-grid-system';
import { useSession, signIn, signOut } from "next-auth/client"
import Link from 'next/link';
import EventCard from '../../components/EventCard/EventCard';


const Dashboard = () => {

  const [session, loading] = useSession()

  const id = session?.id;
  const fetcher = async (query) => await graphQLClient({
    query: query,
    variables: {
        id,
    },
  });
  const query = gql`
    query getUserEvents($id: ID) {
      usersPermissionsUser(id: $id) {
        data {
          id
          attributes{
            username
            email
            events {
              data {
                id
                attributes {
                  Title
                }
              }
            }
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
      <Row>

        <Col md={3}>
          Left
        </Col>

        <Col md={6}>
          Centre

          {data ? (
            <EventCard data={data} />
          ) : (
            <p>loading</p>
          )}
        </Col>

        <Col md={3}>
          Right
        </Col>
      </Row>

    </Container>
  )
}

export default Dashboard
