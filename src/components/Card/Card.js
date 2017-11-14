import React from 'react';

const card = (props) => (
    <div className={'card ' + (props.faceUp ? 'front' : 'back')} id={props.cardIx}>
        { props.faceUp ? 'A' : '?'}
    </div>
)



export default card;