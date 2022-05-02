import React, { useState, useEffect } from 'react';
import { gql } from 'graphql-request';
import Router from 'next/router';
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { graphQLClient } from '../../utils/graphql-client';
import Button from '../Button/Button';
import { Container, Row, Col } from 'react-grid-system';

const Name = styled.input`
  width: 100%;
  border: none;
  font-size: 2em;
`;

const Description = styled.textarea`
  width: 100%;
  border: none;
  font-size: 2em;
`;

const EditEvent = ({ defaultValues, id }) => {

    const methods = useForm({
        defaultValues: {
          ...defaultValues,
            title: defaultValues.data.attributes.title,
            description: defaultValues.data.attributes.description,
            date: defaultValues.data.attributes.date,
            time: defaultValues.data.attributes.time,
        },
        mode: "onChange",
      });
    
      useEffect(() => {
        reset({
          ...defaultValues,
          title: defaultValues.data.attributes.title,
          description: defaultValues.data.attributes.description,
          date: defaultValues.data.attributes.date,
          time: defaultValues.data.attributes.time,
        });
      }, [reset, defaultValues]);
    
      const [errorMessage, setErrorMessage] = useState('');
      const [recipeImage, changeRecipeImage] = useState();
    
    
      const { register, control, handleSubmit, reset, formState, errors } = methods
    
      const onSubmit = handleSubmit(async ({ title, description, date, time }, data) => {

        if (errorMessage) setErrorMessage('');

        const newTime = `${time}:00`

        const query = gql`
        mutation UpdateAnEvent($id: ID!, $title: String, $description: String, $date: Date, $newTime: Time) {
            updateEvent(
              id: $id
                data: {
                    title: $title
                    description: $description
                    date: $date
                    time: $newTime
              }
            ) {
              data {
                id
              }
            }
          }
        `;

        const variables = {
            id,
            title,
            description,
            date,
            newTime
        };

        try {
        await graphQLClient({ query: query, variables: variables });
        Router.push('/');
        } catch (error) {
        console.error('error', error);
        setErrorMessage(error.message);
        }
    });


  return (
    <Container>
        <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
            <Row>
              <Col md={10}>
                <Name
                  type="text"
                  name="title"
                  placeholder="Event name"
                  {...register('title', { required: true })}
                />

                <Description
                  type="text"
                  name="description"
                  placeholder="description"
                  {...register('description', { required: true })}
                />

                <input 
                    type="date"
                    id="date" 
                    name="date"
                    {...register('date', { required: true })}
                />

                <input 
                    type="time"
                    id="time" 
                    name="time"
                    {...register('time', { required: true })}
                />
                
              </Col>
            </Row>


            {/* {errors.name &&  (
              <span role="alert">
                {errors.name.message}
              </span>
            )}
            {errors.description &&  (
              <span role="alert">
                {errors.description.message}
              </span>
            )}
            {errorMessage && 
              <p>{errorMessage}</p>
            } */}
          <div>
            <Button primary type="submit" size="small" label="Save" />
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}

export default EditEvent