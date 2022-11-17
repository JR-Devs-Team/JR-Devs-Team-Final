import React from "react";
import {Helmet} from 'react-helmet';

const MetaData = ({title}) => {
    
  return (
    <Helmet>
        <title>{`${title} - JR-Devs-Team`}</title>
    </Helmet>
  )
}

export default MetaData