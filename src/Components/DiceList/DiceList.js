import React from 'react';

import './DiceList.css';

// importing all the dice images
import d4 from '../../Images/d4.png';
import d6 from '../../Images/d6.png';
import d8 from '../../Images/d8.png';
import d10 from '../../Images/d10.png';
import d12 from '../../Images/d12.png';
import d20 from '../../Images/d20.png';
import d100 from '../../Images/d100.png';

class DiceList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numDice: 1
        }
        this.handleDiceSelection = this.handleDiceSelection.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.lessSlots = this.lessSlots.bind(this);
        this.moreSlots = this.moreSlots.bind(this);
    }

    // function to assign the targeted
    // values based on the type of die
    // selected
    handleDiceSelection(e){     
        this.props.choose(e.target.name, e.target.value);
    }

    // UNIMPLEMENTED
    // handleSubmit() {
    //     this.props.numberOfDice(this.state.numDice);
    //     this.props.buildSlots(this.state.numDice);
    // }

    handleChange(e){
        this.setState({
            numDice: e.target.value
        })
    }

    // two functions that control the
    // limit of dice that the user can
    // add to the dice box, implemented by
    // the two buttons 
    lessSlots() {
        let x = this.state.numDice - 1;

        if (x === 0) {
            return;
        } else {
            this.setState({ numDice: x})
            this.props.numberOfDice(x);
            this.props.buildSlots(x);
        }
    }

    moreSlots() {
        let x = this.state.numDice + 1;

        if (x === 7) {
            return;
        } else {
            this.setState({ numDice: x})
            this.props.numberOfDice(x);
            this.props.buildSlots(x);
        }
    }

    render() {
        return (
            <div className='diceListComponentBox'>
                <div className="diceListTop">
                    <div className="headerContainer">
                        <div className="selectHeader">
                            <h2>Choose your dice</h2>
                        </div>
                    <div className="diceSelection">
                    </div>
                        <ul className="diceList">
                            <li>
                                <div className="diceIcon"><img src={d4} alt="d4"/></div>
                                <button className='d4' value={4} name='d4' 
                                onClick={this.handleDiceSelection}>D4</button>
                            </li>
                            <li>
                                <div className="diceIcon"><img src={d6} alt="d6"/></div>
                                <button className='d6' value={6} name='d6' 
                                onClick={this.handleDiceSelection}>D6</button>
                            </li>
                            <li>
                                <div className="diceIcon"><img src={d8} alt="d8"/></div>
                                <button className='d8' value={8} name='d8' 
                                onClick={this.handleDiceSelection}>D8</button>
                            </li>
                            <li>
                                <div className="diceIcon"><img src={d10} alt="d10"/></div>
                                <button className='d10' value={10} name='d10' 
                                onClick={this.handleDiceSelection}>D10</button>
                            </li>
                            <li>
                                <div className="diceIcon"><img src={d12} alt="d12"/></div>
                                <button className='d12' value={12} name='d12' 
                                onClick={this.handleDiceSelection}>D12</button>
                            </li>
                            <li>
                                <div className="diceIcon"><img src={d20} alt="d20"/></div>
                                <button className='d20' value={20} name='d20' 
                                onClick={this.handleDiceSelection}>D20</button>
                            </li>
                            <li>
                                <div className="diceIcon"><img src={d100} alt="d100"/></div>
                                <button className='d100' value={100} name='d100' 
                                onClick={this.handleDiceSelection}>D100</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='diceSeperator'>
                    <div className="numDiceContainer">
                        <h3>Number of Dice</h3>
                        <div className="formContainer">
                            <div className="numOfDice">
                                <div className="incrementContainer">
                                    <button className="numButton numDice" onClick={this.lessSlots}>-</button>
                                    <div className="numDisplay numDice">
                                        {this.state.numDice}
                                    </div>
                                    <button className="numButton numDice" onClick={this.moreSlots}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default DiceList;