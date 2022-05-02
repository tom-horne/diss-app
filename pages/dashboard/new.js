import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import styled, { css } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/Button/Button';
import { useSession, signIn, signOut } from "next-auth/client"
import { Container, Row, Col } from 'react-grid-system';

import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../utils/graphql-client';

const New = () => {

    const [session, loading] = useSession()


  const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, register, errors, control } = useForm({
        mode: "onChange"
      });

    const id = session?.id

    const onSubmit = handleSubmit(async ({ title }) => {
        if (errorMessage) setErrorMessage('');
    
    
          const query = gql`
            mutation CreateAnEvent($id: ID!, $title: String) {
                createEvent(
                    data: {
                    title: $title
                    author: $id
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
              title,
            };
    
        try {
          const data = await graphQLClient({ query: query, variables: variables });
          Router.push(`/dashboard/events/${data.createEvent.data.id}`);
        } catch (error) {
          setErrorMessage(error.message);
        }
      });


  return (
    <Container>
        <h1>New</h1>
        <form onSubmit={onSubmit}>
              <div>
                <label>Event name</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Event name"
                  {...register('title', { required: true })}
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
                <Button type="submit" primary size="small" label="Create" />
                {/* <button type="submit">Create</button> */}
              </div>
            </form>
    </Container>
  )
}

export default New