import React, { useState, useEffect } from 'react';
import { gql } from 'graphql-request';
import Router from 'next/router';
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { graphQLClient } from '../../utils/graphql-client';
import Button from '../Button/Button';
import Search from '../Search/Search';
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

const EditEvent = ({ defaultValues, id, users }) => {

    const [Going, addGoing] = useState([])

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

      const following = defaultValues?.data?.attributes?.going?.data.map(function (obj) {
        return parseInt(obj.id);
      });
    
      useEffect(() => {
        reset({
          ...defaultValues,
          title: defaultValues.data.attributes.title,
          description: defaultValues.data.attributes.description,
          date: defaultValues.data.attributes.date,
          time: defaultValues.data.attributes.time,
        });
        addGoing(following)
      }, [reset, defaultValues]);
    
      const [errorMessage, setErrorMessage] = useState('');
    
    
      const { register, control, handleSubmit, reset, formState, errors } = methods
    
      const onSubmit = handleSubmit(async ({ title, description, date, time }, data) => {

        console.log("final Going", Going);

        if (errorMessage) setErrorMessage('');

        const query = gql`
        mutation UpdateAnEvent($id: ID!, $title: String, $description: String, $date: Date, $time: Time, $Going: [ID]) {
            updateEvent(
              id: $id
                data: {
                    title: $title
                    description: $description
                    date: $date
                    time: $time
                    going: $Going
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
            time,
            Going
        };

        try {
        await graphQLClient({ query: query, variables: variables });
        Router.push('/');
        } catch (error) {
        console.error('error', error);
        setErrorMessage(error.message);
        }
    });


    const selectionHandler = async (person) => {

        if (Going.some(e => e == person)) {
            const newArr = Going.filter(people => Number(person) != people);
            addGoing(newArr);
    
        } else {
            console.log('this');
            let newObj = parseInt(person)
            await addGoing(oldArray => [...oldArray, newObj]);
        }

        console.log(Going);
      }

      console.log(defaultValues?.data?.attributes?.going?.data);


  return (
    <Container>
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit}>
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
                            step="1"
                            {...register('time', { required: true })}
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
                            )}
                            {errorMessage && 
                            <p>{errorMessage}</p>
                            } */}

                        <div>
                            <Button primary type="submit" size="small" label="Save" />
                        </div>

                    </form>
                </FormProvider>
        {/* <Col md={3} offset={3}> */}
            <h5>Going</h5>
            {defaultValues?.data?.attributes?.going?.data.map(goer => (
                <div>
                    <p>{goer.attributes.username}</p>
                    <hr />
                </div>
            ))}
         
            <Search users={users} selectionHandler={selectionHandler} selected={Going} />

        {/* </Col> */}
    </Container>
  )
}

export default EditEvent