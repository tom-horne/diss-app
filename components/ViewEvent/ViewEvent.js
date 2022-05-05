import React from 'react'
import styled, { css } from 'styled-components';

const StyledEventData = styled.div`
    background-color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px #d0d0d0;
    padding: 10px;
    height: 500px;

    h1{
        margin: 0;
    },
    hr{
        border: none;
        border-top: 2px solid #fd1e61
    }
`;

const ViewEvent = ({ data }) => {

    console.log("ViewEvent", data.data);

  return (
    <StyledEventData>
          <h1>{data.data.attributes.title}</h1>
          <p>Organised by: {data.data.attributes.author.data.attributes.username}</p>
          <hr/>
          <p>{data.data.attributes.description}</p>
    </StyledEventData>
  )
}

export default ViewEvent