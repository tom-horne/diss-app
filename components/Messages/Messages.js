import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useForm, Controller } from 'react-hook-form';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../utils/graphql-client';
import { Container, Row, Col } from 'react-grid-system';
import { useSession, signIn, signOut } from "next-auth/client"
import styled, { css } from 'styled-components';
import Router from 'next/router';
import Button from '../Button/Button';

const Messages = ({ id }) => {

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('refresh');
        }, 3000);
    
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }, [])

    const event = id;

    
    const [session, loading] = useSession()
    const you = session?.id

    const fetcher = async (query) => await graphQLClient({
      query: query,
      variables: {
          id,
      },
    });
    const query = gql`
    query getMessages($id: ID) {
        messages(filters: {event: {id: {eq: $id}}}) {
          data {
            id
            attributes {
              message
              author {
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
      }
    `;
  
    const { data, error } = useSWR(() => id ? query : null, fetcher);
    console.log(data);
    console.log(error);

    const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, register, errors, control, reset } = useForm({
        mode: "onChange"
      });

    const onSubmit = handleSubmit(async ({ message }) => {
        if (errorMessage) setErrorMessage('');
    
    
          const query = gql`
            mutation CreateAMessage($you: ID!, $message: String, $event: ID!) {
                createMessage(
                    data: {
                    message: $message
                    author: $you
                    event: $event
                }
                ) {
                data {
                    id
                }
                }
            }
          `;
          console.log('success');
    
    
        const variables = {
              id,
              you,
              event,
              message
            };
    
        try {
          const data = await graphQLClient({ query: query, variables: variables });
          Router.reload(window.location.pathname)
          reset();
        } catch (error) {
          setErrorMessage(error.message);
        }
      });

  

  return (
      <div>
        <div style={{border: 'solid black 2px'}}>
            {data?.messages?.data.map(message => (
                <div key={message.id}>
                    <h5>{message.attributes.author.data.attributes.username}</h5>
                    <p>{message.attributes.message}</p>
                </div>
            ))}
        </div>
        <form onSubmit={onSubmit}>
            <div>
            <label>Event name</label>
            <input
                type="text"
                name="message"
                placeholder="message"
                {...register('message', { required: true })}
            />


            {/* {errors.name &&  (
                <span role="alert">
                {errors.name.message}
                </span>
            )}
            {errors.description &&  (
                <span role="alert">
                {errors.description.message}
                </span>
            )} */}
            </div>

            <div>
            <Button type="submit" primary size="small" label="post" />
            {/* <button type="submit">Create</button> */}
            </div>
        </form>
      </div>
  )
}

export default Messages