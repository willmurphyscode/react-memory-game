import React from 'react';

const card = (props) => (
    <div className={'card ' + (props.faceUp ? 'front' : 'back')} id={props.cardIx}>
        { props.faceUp ? props.face : '?' }
    </div>
)



export default card;