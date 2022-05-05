import React, { useEffect } from 'react'
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../utils/graphql-client';
import { Container, Row, Col } from 'react-grid-system';
import { useSession, signIn, signOut } from "next-auth/client"
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router'
import Button from '../../components/Button/Button';
import Link from 'next/link';
import EventCard from '../../components/EventCard/EventCard';


const New = styled.div`
  position: absolute;
  right: 1em;
  bottom: 0;
`;

const Dashboard = () => {
  const router = useRouter()

  const [session, loading] = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/')
    } 
}, [session])

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
            createdEvents {
              data {
                id
                attributes {
                  title
                  description
                  author {
                    data {
                      attributes {
                        username
                      }
                    }
                  }
                }
              }
            }
            attending {
              data {
                id
                attributes {
                  title
                  description
                  author {
                    data {
                      attributes {
                        username
                      }
                    }
                  }
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
          {/* Left */}
        </Col>

        <Col md={6}>
          {/* Centre */}

          {data ? (
            <EventCard data={data.usersPermissionsUser.data.attributes.createdEvents} />
          ) : (
            <p>loading</p>
          )}

          {data ? (
            <EventCard data={data.usersPermissionsUser.data.attributes.attending} />
          ) : (
            <p>loading</p>
          )}    
        </Col>

        <Col md={3}>
          {/* Right */}
        </Col>
      </Row>

      {/* <New>
        <Link href="/dashboard/new">
          <a>
            <Button primary size="large" label="Create new event +" />
          </a>
        </Link>
      </New> */}

    </Container>
  )
}

export default Dashboard
