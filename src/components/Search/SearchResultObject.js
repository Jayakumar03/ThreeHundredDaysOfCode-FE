import React from 'react';
import '../../styles/SearchResultList.css';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

function SearchResultObject(props) {
   
  function getDescription(description) {
    if (description) {
      return atob(description).substring(0, 100);
    }
    return "";
  }

  function getUrl() {
    const result = props.result;
    if (result.type === "USER") {
      return "/profile/" + result.id; 
    }
    return "/problem/" + result.id;
  }

    const result = props.result;
    return (
        <div>        
          <Card
          onClick={()=>window.open(getUrl())}
          hoverable
          style={{
            width: 600,
            marginTop: 16,
            backgroundColor: '#0c0b0d'
          }}
        >
        <Meta
          avatar = {<Avatar src={`https://ik.imagekit.io/wfx6bvuzj/DecoverLogos/${result.source}.jpeg`} />}
          title = {result.title}
          description = {getDescription(result.description)}
          style={{
            color: '#fff'
          }}
        />
      </Card>
      </div>
    );
}

export default SearchResultObject;