import React from 'react'
import Link from 'next/link';
import styled from 'styled-components';


const StyledEventCard = styled.div`
    width: 100%;
    background: white;
    max-height: 500px;
    padding: 10px;
    /* border-style: solid; */
    border-radius: 5px;
    margin-top: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    cursor: pointer;
    margin: 1em 0;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

    hr{
      border: 0;
      border-bottom: 2px solid #fd1e61;
    },
`



const EventCard = ({ data }) => {

  // console.log("EVENtDATA", data);

  return (
    <>
      {data?.data.map(event => (
        <Link href="dashboard/events/[id]" as={`dashboard/events/${event.id}`} key={event.id}>
          <a>
            <StyledEventCard>
              <h3>
              {event.attributes.title}
              </h3>
              <h5>
              Created by: 
              </h5>
              <hr/>
              <p>
              {event.attributes.description}
              </p>
            </StyledEventCard>
          </a>
        </Link>
      ))}
    </>
  )
}

export default EventCard