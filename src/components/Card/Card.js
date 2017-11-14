import React from 'react';

class Card extends React.Component {

    constructor() {
        super();
    
        this.state = {
          faceUp: false
        }
    }

    render() {
        //console.log(this.state);
        return    (
            <div className={'card ' + (this.props.faceUp ? 'front' : 'back')} id={this.props.cardIx}>
                { this.props.faceUp ? 'A' : '?'}
            </div>
        )
    }
}





export default Card;