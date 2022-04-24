import React from 'react'
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../utils/graphql-client';
import { Container, Row, Col } from 'react-grid-system';
import Link from 'next/link';


const Dashboard = () => {

  const id = 1;
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
      Dashboard
      {data ? <div>
        {data.usersPermissionsUser.data.attributes.events.data.map(event => (
          <Link href="dashboard/events/[id]" as={`dashboard/events/${id}`}>
            <a>
              <h2>
                {event.attributes.Title}
              </h2>
            </a>

          </Link>

        ))}
      </div> : <p>loading...</p> }
      

    </Container>
  )
}

export default Dashboard
