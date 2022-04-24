import React from 'react'
import {useRouter} from 'next/router'

const Event = () => {
    
    const router = useRouter();
    const { id } = router.query;
    console.log(router);

  return (
    <div>{id}</div>
  )
}

export default Event