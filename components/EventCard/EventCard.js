import React from 'react'
// import useSWR from 'swr';
// import { gql } from 'graphql-request';
// import { graphQLClient } from '../../utils/graphql-client';
import Link from 'next/link';
import styled from 'styled-components';


const StyledEventCard = styled.div`
    width: 100%;
    /* background: red; */
    max-height: 500px;
    padding: 10px;
    /* border-style: solid; */
    border-radius: 5px;
    margin-top: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    cursor: pointer;
    margin: 2em 0;
`



const EventCard = ({ data }) => {

  return (
    <>
      {data?.usersPermissionsUser?.data?.attributes?.events.data.map(event => (
        <StyledEventCard>
                <Link href="dashboard/events/[id]" as={`dashboard/events/${event.id}`}>
                  <a>
                      <h2>
                      {event.attributes.Title}
                      </h2>
                  </a>
                </Link>
        </StyledEventCard>
      ))}
    </>
  )
}

export default EventCard