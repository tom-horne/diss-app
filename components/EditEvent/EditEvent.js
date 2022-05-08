import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic'
import { gql } from 'graphql-request';
import Router from 'next/router';
import { useForm, useFieldArray, Controller, FormProvider, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { graphQLClient } from '../../utils/graphql-client';
import Button from '../Button/Button';
import Search from '../Search/Search';
// import MapGL, { FlyToInterpolator } from 'react-map-gl';
// let Geocoder

// if (typeof window !== 'undefined') { 
//   Geocoder = require('react-map-gl-geocoder').default; 
// }
// const Geocoder = dynamic(() => import("react-map-gl-geocoder"), {
//   loading: () => "Loading...",
//   ssr: false
// });
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
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
  min-height: 500px;
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
    const [AllDay, setAllDay] = useState(false)

    const [viewport, setViewport] = useState({
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    });
    const mapRef = useRef();
    const handleViewportChange = useCallback(
      (newViewport) => setViewport(newViewport),
      []
    );
  
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
      (newViewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
        FlyToInterpolator()
  
        return handleViewportChange({
          ...newViewport,
          ...geocoderDefaultOverrides
        });
      },
      [handleViewportChange]
    );
  

    console.log(AllDay);

    const handleChange = (e) => {
      const { checked } = e.target
      setAllDay(checked)
    }

    const methods = useForm({
        defaultValues: {
          ...defaultValues,
            title: defaultValues.data.attributes.title,
            description: defaultValues.data.attributes.description,
            allDay: defaultValues.data.attributes.allDay,
            start: defaultValues.data.attributes.start,
            startTime: defaultValues.data.attributes.startTime,
            end: defaultValues.data.attributes.end,
            endTime: defaultValues.data.attributes.endTime,
            location: defaultValues.data.attributes.location,
            // latitude: defaultValues.data.attributes.location.latitude,
            // longitude: defaultValues.data.attributes.location.longitude,
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
          allDay: defaultValues.data.attributes.allDay,
          start: defaultValues.data.attributes.start,
          startTime: defaultValues.data.attributes.startTime,
          end: defaultValues.data.attributes.end,
          endTime: defaultValues.data.attributes.endTime,
          location: defaultValues.data.attributes.location,
          // latitude: defaultValues.data.attributes.location.latitude,
          // longitude: defaultValues.data.attributes.location.longitude,
        });
        addGoing(following)
      }, [reset, defaultValues]);
    
      const [errorMessage, setErrorMessage] = useState('');
    
    
      const { register, control, handleSubmit, reset, formState, errors } = methods
    
      const onSubmit = handleSubmit(async ({ title, description, start, startTime, end, endTime, location }, data) => {

        console.log("loc", location);

        const parsedLatitude = Number(location.latitude)
        const parsedLongitude = Number(location.longitude)

        console.log("allDay", AllDay);

        if (errorMessage) setErrorMessage('');

        const query = gql`
          mutation UpdateAnEvent($id: ID!, $title: String, $description: String, $AllDay: Boolean, $start: Date, $startTime: Time, $end: Date, $endTime: Time, $parsedLongitude: Float, $parsedLatitude: Float, $Going: [ID]) {
            updateEvent(
              id: $id
                data: {
                    title: $title
                    description: $description
                    allDay: $AllDay
                    start: $start
                    startTime: $startTime
                    end: $end
                    endTime: $endTime
                    location: {
                      latitude: $parsedLatitude
                      longitude: $parsedLongitude
                    }
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
            AllDay,
            start,
            startTime,
            end,
            endTime,
            parsedLatitude,
            parsedLongitude,
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

                        <input
                          type="checkbox"
                          name="allDay"
                          // value="allDay"
                          {...register('allDay')}
                          onChange={e => handleChange(e)}
                        />
                        <label>All Day Event?</label>

                        <div>
                          Start: &nbsp;
                          <input 
                              type="date"
                              id="start" 
                              name="start"
                              style={{marginTop: '10px'}}
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
                          End: &nbsp; &nbsp;
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

                        <div>
                          Location: &nbsp; &nbsp;
                          <br />

                          Latitude:
                          <input 
                              type="text"
                              id="latitude" 
                              name="latitude"
                              step="0.01"
                              {...register('location.latitude', { required: true })}
                          />

                          Longitude
                          <input 
                              type="text"
                              id="longitude" 
                              name="longitude"
                              step="0.01"
                              {...register('location.longitude', { required: true })}
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