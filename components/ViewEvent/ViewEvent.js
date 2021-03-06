import React from 'react'
import styled, { css } from 'styled-components';
import Map, { Marker } from 'react-map-gl';
import { Container, Row, Col } from 'react-grid-system';

const StyledEventData = styled.div`
    background-color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    padding: 10px;
    min-height: 500px;
    margin-top: 16px;

    h1{
        margin: 0;
    }
`;

const Line = styled.hr`
  border: none;
  border-top: 2px solid #fd1e61;
`;

const Going = styled.div`
  background-color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px #d0d0d0;
  padding: 10px;
  margin-top: 16px;
  min-height: 500px;
  overflow: scroll;
`

const ViewEvent = ({ data }) => {

    console.log("ViewEvent", data.data);

  return (
    <Row>
      <Col md={8}>
      <StyledEventData>
          <h1>{data.data.attributes.title}</h1>
          <p>Organised by: {data.data.attributes.author.data.attributes.username}</p>
          <p>{data.data.attributes.description}</p>
          <Line/>

          <div>
            <p style={{display: 'inline-block'}}>Start Date: &nbsp;</p>
              {data.data.attributes.start} &nbsp; &nbsp; &nbsp; 
            <p style={{display: 'inline-block'}}>End Date: &nbsp; </p>
              {data.data.attributes.end} 
          </div>

          <div>
            <p style={{display: 'inline-block'}}>Start Time: {data.data.attributes.startTime} &nbsp; &nbsp;  </p>
            <p style={{display: 'inline-block'}}>End Time: {data.data.attributes.endTime}</p>
          </div>

          <div style={{ height: '500px'}}>
            {data.data.attributes.location && <Map
              initialViewState={{
                longitude: data.data.attributes.location.longitude,
                latitude: data.data.attributes.location.latitude,
                zoom: 15
              }}
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
              style={{width: '100%', height: '100%'}}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              {/* <Marker style={{ margin: '0 !important' }}longitude={data.data.attributes.location.latitude} latitude={data.data.attributes.location.longitude} /> */}
            </Map>}
          </div>

        </StyledEventData>
      </Col>
      <Col md={4}>
        <Going>
          <h4>Going:</h4>
          <p>
            {data.data.attributes.going.data.map(person => (
              <div>
                <p>{person.attributes.username}</p>
                <hr/>
              </div>
            ))}
          </p>
        </Going>
      </Col>
    </Row>
  )
}

export default ViewEvent