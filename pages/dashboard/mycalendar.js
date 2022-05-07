import React from 'react'
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { useSession, signIn, signOut } from "next-auth/client"
import { graphQLClient } from '../../utils/graphql-client';
import moment from 'moment'
import {
    Calendar,
    Views,
    DateLocalizer,
    momentLocalizer,
  } from 'react-big-calendar'
  import 'react-big-calendar/lib/css/react-big-calendar.css'
  import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';

  const CalendarCard = styled.div`
    background-color: white;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    width: 90%;
    margin-left: 5%;
    margin-top: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    `;

  const now = new Date()

  const localizer = momentLocalizer(moment)

const Mycalendar = () => {

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
            createdEvents {
              data {
                id
                attributes {
                  title
                  description
                  start
                  startTime
                  end
                  endTime
                  allDay
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
                  start
                  startTime
                  end
                  endTime
                  allDay
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

  // const myevents = data?.usersPermissionsUser?.data?.attributes?.createdEvents?.data

  // const invitedEvents = data?.usersPermissionsUser?.data?.attributes?.attending?.data

  // const allEvents = data?.usersPermissionsUser?.data?.attributes?.createdEvents?.data.concat(data?.usersPermissionsUser?.data?.attributes?.attending?.data)

  const newEvents = data?.usersPermissionsUser?.data?.attributes?.createdEvents?.data.concat(data?.usersPermissionsUser?.data?.attributes?.attending?.data).map(( event ) => ({
    title: event.attributes.title,
    allDay: event.attributes.allDay,
    start: new Date(event.attributes.start + ' ' + event.attributes.startTime),
    end: new Date(event.attributes.end + ' ' + event.attributes.endTime),
  }));

  // console.log("events", events);
  console.log("newEvents", newEvents);


  return (
    <CalendarCard>
      <Container>
        {data && <Calendar
            localizer={localizer}
            events={newEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />}
      </Container>
    </CalendarCard>

  )
}

export default Mycalendar