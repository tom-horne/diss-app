import React from 'react'
// import useSWR from 'swr';
// import { gql } from 'graphql-request';
// import { graphQLClient } from '../../utils/graphql-client';
import Link from 'next/link';
import styled from 'styled-components';


export const StyledEventCard = styled.div`
    width: 100%;
    background-color: 'red';
    /* height: 500px; */
    padding: 10px;
    /* border-style: solid; */
    border-radius: 5px;
    margin-top: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    cursor: pointer;


    h2 {
        color: red;
    }
`



const EventCard = ({ data }) => {

  return (
    <>
    <Link href="dashboard/events/[id]" as={`dashboard/events/${data.usersPermissionsUser.id}`}>
        <StyledEventCard>

            {data ? <div>
                {data.usersPermissionsUser.data.attributes.events.data.map(event => (
                        
                    <a>
                        <h2>
                        {event.attributes.Title}
                        </h2>
                    </a>

            ))}
          </div> : <p>loading...</p> }

        </StyledEventCard>
    </Link>
</>
  )
}

export default EventCard