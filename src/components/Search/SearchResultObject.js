import React from 'react';
import '../../styles/SearchResultList.css';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

function SearchResultObject(props) {
    const result = props.result;
    return (
        <div>        
          <Card
          onClick={()=>window.open(result.url, "_blank")}
          hoverable
          style={{
            width: 600,
            marginTop: 16,
            backgroundColor: '#403b3b'
          }}
        >
        <Meta
          avatar = {<Avatar src={`https://ik.imagekit.io/wfx6bvuzj/DecoverLogos/${result.source}.jpeg`} />}
          title = {result.title}
          description = {result.description}
          style={{
            color: '#fff'
          }}
        />
      </Card>
      </div>
    );
}

export default SearchResultObject;