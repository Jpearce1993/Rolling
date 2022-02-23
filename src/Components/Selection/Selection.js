import React from 'react';
import './Selection.css';

import DiceList from '../DiceList/DiceList';

class Selection extends React.Component{  
    render() {
        return(
            <div className="diceHolder">
                <DiceList 
                    choose={this.props.choose}
                    numberOfDice={this.props.numberOfDice}
                    buildSlots={this.props.buildSlots}    
                />
            </div>
        );
    }
}

export default Selection;