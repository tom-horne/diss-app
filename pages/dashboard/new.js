import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import styled, { css } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/Button/Button';
import { useSession, signIn, signOut } from "next-auth/client"
import { Container, Row, Col } from 'react-grid-system';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { graphQLClient } from '../../utils/graphql-client';

const CreateEventCard = styled.div`
  width: 100%;
  background: white;
  height: 500px;
  padding: 10px;
  /* border-style: solid; */
  border-radius: 5px;
  margin-top: 5px;
  box-shadow: 0 0 5px #d0d0d0;
  margin: 1em 0;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;

  input{
    display: block;
    border: 0;
    border-bottom: solid 2px #fd1e61;
    margin: 0 auto;
    margin-top: 25%;
    font-size: 14pt;
    width: 220px;
  },
  Button{
    align: center;
    display: block;
    margin: 0 auto;
    margin-top: 16px;
  }

`


const New = () => {

    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(() => {
      if (!session) {
        router.push('/')
      } 
  }, [session])


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
      <Row>
        <Col md={3}>

        </Col>
        <Col md={6}>
          <CreateEventCard>
            {/* <h1>New</h1> */}
              <form onSubmit={onSubmit}>
                <div>
                  {/* <label>Event name</label> */}
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter Event Name Here..."
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

                <div className="subButton">
                  <Button type="submit" primary size="small" label="Create" />
                  {/* <button type="submit">Create</button> */}
                </div>
              </form>
          </CreateEventCard>
        </Col>
        <Col md={3}>

        </Col>
      </Row>



    </Container>
  )
}

export default New