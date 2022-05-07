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

const StyledEditEvent = styled.div`
  background-color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px #d0d0d0;
  width: 100%;
  height: 500px;
  padding: 10px;

  hr{
      border: none;
      border-top: 2px solid #fd1e61;
  },
  button{
      margin-top: 16px;
      margin-left: 0;
  }
`;

const Description = styled.textarea`
  width: 100%;
  height: 100px;
  border: none;
  font-size: 1em;
  resize: none;
`;

const EditEvent = ({ defaultValues, id, users }) => {

    const [Going, addGoing] = useState([])

    const methods = useForm({
        defaultValues: {
          ...defaultValues,
            title: defaultValues.data.attributes.title,
            description: defaultValues.data.attributes.description,
            start: defaultValues.data.attributes.start,
            startTime: defaultValues.data.attributes.startTime,
            end: defaultValues.data.attributes.end,
            endTime: defaultValues.data.attributes.endTime,
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
          start: defaultValues.data.attributes.start,
          startTime: defaultValues.data.attributes.startTime,
          end: defaultValues.data.attributes.end,
          endTime: defaultValues.data.attributes.endTime,
        });
        addGoing(following)
      }, [reset, defaultValues]);
    
      const [errorMessage, setErrorMessage] = useState('');
    
    
      const { register, control, handleSubmit, reset, formState, errors } = methods
    
      const onSubmit = handleSubmit(async ({ title, description, start, startTime, end, endTime }, data) => {

        if (errorMessage) setErrorMessage('');

        const query = gql`
        mutation UpdateAnEvent($id: ID!, $title: String, $description: String, $start: Date, $startTime: Time, $end: Date, $endTime: Time, $Going: [ID]) {
            updateEvent(
              id: $id
                data: {
                    title: $title
                    description: $description
                    start: $start
                    startTime: $startTime
                    end: $end
                    endTime: $endTime
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
            start,
            startTime,
            end,
            endTime,
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

      }


  return (
      <Row>
            <Col md={8}>
            {/* <Container> */}
                <StyledEditEvent>
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
                        <hr style={{}}/>

                        <div>
                          Start
                          <input 
                              type="date"
                              id="start" 
                              name="start"
                              {...register('start', { required: true })}
                          />

                          <input 
                              type="time"
                              id="startTime" 
                              name="startTime"
                              step="1"
                              {...register('startTime', { required: true })}
                          />
                        </div>

                        <div>
                          End
                          <input 
                              type="date"
                              id="end" 
                              name="end"
                              {...register('end', { required: true })}
                          />

                          <input 
                              type="time"
                              id="endTime" 
                              name="endTime"
                              step="1"
                              {...register('endTime', { required: true })}
                          />
                        </div>


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
                </StyledEditEvent>
                {/* </Container> */}
            </Col>
            <Col md={4}>
                {/* <Container> */}
                <StyledEditEvent>
            <h4>Going</h4>
                {defaultValues?.data?.attributes?.going?.data.map(goer => (
                    <div>
                        <p>{goer.attributes.username}</p>
                        <hr />
                    </div>
                ))}
            
                <Search users={users} selectionHandler={selectionHandler} selected={Going} />
                </StyledEditEvent>
            {/* </Container> */}
            </Col>
        </Row>
                

  )
}

export default EditEvent