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

const MessageBox = styled.div`
    width: 100%;
    height: 500px;
    background-color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    padding: 10px;
    margin-top: 16px;

    hr{
        margin-bottom: 10px;
        border: none;
        border-top: 2px solid #fd1e61
    }
`;

const MessageArea = styled.div`
    position: relative;
    bottom: 0;
    overflow-y: scroll;
    /* overflow: auto; */
    height: 400px;
    background-color: white;
    display: flex;
    flex-direction: column-reverse;
`;

const MessageBubble = styled.div`
    align-items: flex-start;
    background-color: ${props => props.session == props.id ? "#eddada" : "lightblue"};
    color: #000;
    width: 66%;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    float: ${props => props.session == props.id ? "right" : "left"};

    h5{
        margin: 1px;
    }
    p{
        font-size: 0.75em;
    }

`;

const InputAndButton = styled.div`
    /* background-color: tomato; */
    width: 100%;
    border: none;

    input{
        width: 78%;
        border: none;
    }
`;

// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }

const Messages = ({ id }) => {

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('refresh');
    //     }, 3000);
    
    //     return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    //     }, [])

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
        messages(filters: {event: {id: {eq: $id}}}, pagination: { start: 1, limit: 100 }) {
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

        // useForceUpdate
          reset();
        } catch (error) {
          setErrorMessage(error.message);
        }
      });

  

  return (
      <MessageBox>
        <MessageArea>
            <div>
                {data?.messages?.data.map(message => (
                    <MessageBubble key={message.id} session={session?.id} id={message.attributes.author.data.id}>
                            <h5>{message.attributes.author.data.attributes.username}</h5>
                            <p>{message.attributes.message}</p>
                    </MessageBubble>
                ))}
            </div>
        </MessageArea>
        <form onSubmit={onSubmit}>
            <InputAndButton>
                <hr/>
                {/* <label>Event name</label> */}
                <input
                    type="text"
                    name="message"
                    placeholder="Message..."
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
           

                <Button type="submit" primary size="small" label="Send" />
                {/* <button type="submit">Create</button> */}
            </InputAndButton>

        </form>
      </MessageBox>
  )
}

export default Messages