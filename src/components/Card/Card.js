import React from 'react';

class Card extends React.Component {

    constructor() {
        super();
    
        this.state = {
          faceUp: false
        }
    }

    render() {
        return    (
            <div className={'card ' + (this.state.faceUp ? 'front' : 'back')} id={this.props.cardIx}>
                { this.state.faceUp ? 'A' : '?'}
            </div>
        )
    }
}





export default Card;