import React from 'react';
import { Link } from 'react-router-dom';


const RoomCard = props => {

  return (
    <article className="chat_card">
      <Link to={`/${props.path}/${props.id}`}>{props.title}</Link>
    </article>
  )
}

export default RoomCard;
