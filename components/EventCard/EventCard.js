import React from 'react'
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
      {data?.data.map(event => (
        <Link href="dashboard/events/[id]" as={`dashboard/events/${event.id}`}>
          <a>
            <StyledEventCard>
              <h2>
              {event.attributes.title}
              </h2>
            </StyledEventCard>
          </a>
        </Link>
      ))}
    </>
  )
}

export default EventCard