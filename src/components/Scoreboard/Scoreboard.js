import React from 'react';

import '../../App.css';


class Scoreboard extends React.Component {
    render(props) {
        return(<div className="scoreboard">
            <div className="inner-scoreboard">
                <span className="scoreboard-title">Total clicks</span>
                <div className="scoreboard-item">
                    {this.props.totalClicks}
                </div>
            </div>
        </div>);
    }
}

export default Scoreboard;