import React from 'react'
import styled, { css } from 'styled-components';

const ViewEvent = ({ data }) => {

    console.log("ViewEvent", data.data);

  return (
    <div>
          <h1>{data.data.attributes.title}</h1>
          <br />
          <p>Organised by: {data.data.attributes.author.data.attributes.username}</p>
          <br />
          <p>{data.data.attributes.description}</p>
          <br />
    </div>
  )
}

export default ViewEvent