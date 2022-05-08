import React from 'react'
import styled, { css } from 'styled-components';
import Map, { Marker } from 'react-map-gl';

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
`

const ViewEvent = ({ data }) => {

    console.log("ViewEvent", data.data);

  return (
    <div>
          <StyledEventData>
          <h1>{data.data.attributes.title}</h1>
          <p>Organised by: {data.data.attributes.author.data.attributes.username}</p>
          <Line/>
          <p>{data.data.attributes.description}</p>
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



      </StyledEventData>

                <Going>
            <h4>Going:</h4>
            <p>
              {data.data.attributes.going.data.map(person => (
                <p>{person.attributes.username}</p>
              ))}
            </p>
          </Going>
    </div>

  )
}

export default ViewEvent