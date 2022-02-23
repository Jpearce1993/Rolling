import React from 'react';
import Animation from '../../util/Animation';

import './Dice.css';

// importing all the dice images
import d4 from '../../Images/d4.png';
import d6 from '../../Images/d6.png';
import d8 from '../../Images/d8.png';
import d10 from '../../Images/d10.png';
import d12 from '../../Images/d12.png';
import d20 from '../../Images/d20.png';
import d100 from '../../Images/d100.png';
import tempImg from '../../Images/tempImg.png';


class Dice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animation: false
        }
        this.imageDisplay = this.imageDisplay.bind(this);
        this.handleRolling = this.handleRolling.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    // method to determine the correct
    // image to display based on the 
    // die type selected
    imageDisplay() {
        let temp;
        let disabled;
        let diceList = [];

        for (let x = 0; x < this.props.diceSlots.length; x++){
            // switch statement choosing the correct
            // imported image based on what the user
            // chooses and returning it for display
            // also triggers the disabled function
            // on the roll button based on die type
            switch(this.props.diceSlots[x]['dice']){
                case 'd4':
                    temp = d4;
                    disabled = false;
                    break;
                case 'd6':
                    temp = d6;
                    disabled = false;
                    break;
                case 'd8':
                    temp = d8;
                    disabled = false;
                    break;
                case 'd10':
                    temp = d10;
                    disabled = false;
                    break;
                case 'd12':
                    temp = d12;
                    disabled = false;
                    break;
                case 'd20':
                    temp = d20;
                    disabled = false;
                    break;        
                case 'd100':
                    temp = d100;
                    disabled = false;
                    break;
                case 'temp':
                    temp = tempImg;
                    disabled = true;
                    break;
                default:
                    break;
            }
            diceList.push({url: temp, disabled: disabled});
        }
        return diceList;
    }

    handleRolling(e){
        // creating a random integer between 
        // 500 and 1500 to give the dice roll
        // animation a more realistic feel
        let rollTime = 0;
        while (rollTime < 750){
            rollTime = Math.floor(Math.random() * 1200);
        }

        // selecting the dice element / correct
        // dice slot based the value of the button
        // clicked
        let y = parseInt(e.target.value);
        let x = document.getElementById(y);

        // assigning the css stylesheet to a variable
        let styleSheet = document.styleSheets[0];

        // creating variables holding the generated keyFrames
        // based on the types of dice being rolled
        let rolling1 = Animation.buildAnimation(this.props.diceSlots[e.target.value]['dice'], 'rolling')
        let rolling2 = Animation.buildAnimation(this.props.diceSlots[e.target.value]['dice'], 'rolling-2')

        // adding those new animations to the css stylesheet
        styleSheet.insertRule(rolling1, styleSheet.cssRules.length);
        styleSheet.insertRule(rolling2, styleSheet.cssRules.length);

        // if statement to determine if the
        // animation has already played and 
        // changes the css animation to a 
        // second identical animation in order
        // to reset the animation at every click
        // rather than every other click
        if (!this.state.animation) {
            this.setState({animation: true})
            x.style.animation = `rolling ${rollTime}ms 1 ease`;
        } else if (this.state.animation) {
            this.setState({animation: false})
            x.style.animation = `rolling-2 ${rollTime}ms 1 ease`;
        }   

        this.props.rolling(this.props.diceSlots[e.target.value]['max'], e.target.value);
    }

    handleRemove(e){
        let value = parseInt(e.target.value);
        this.props.removeSlot(value);
    }

    render() {
        // calling the image path based on the
        // dice selection and assigning to a variable
        let img = this.imageDisplay();
        let diceDisplay;

        // if statement dependent on the 
        // size of the array and changes the
        // number of displayed dice and their
        // classNames depending on the amount
        if (img.length === 1) {
            diceDisplay = (
                <div className="oneDice">
                    <div className='rollingBlock'>
                        <button className='remove' value={0} onClick={this.handleRemove}>X</button>
                        <div className='rollOutcome'>{this.props.diceSlots[0]['rolled']}</div>
                        <div className='dice' style={{ backgroundImage: `url(${img[0].url})`}} id='0'></div>
                        <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={0} disabled={img[0].disabled}>Roll</button></div>
                    </div>
                </div>
            )
        } else if (img.length === 2) {
            diceDisplay = (
                <div className="twoDice">
                        <div className='rollingBlock'>
                            <button className='remove' value={0} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[0]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[0].url})`}} id='0'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={0} disabled={img[0].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={1} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[1]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[1].url})`}} id='1'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={1} disabled={img[1].disabled}>Roll</button></div>
                        </div>
                </div>
            )
        } else if (img.length === 3) {
            diceDisplay = (
                <div className="threeDice"> 
                        <div className='rollingBlock'>
                            <button className='remove' value={0} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[0]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[0].url})`}} id='0'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={0} disabled={img[0].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={1} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[1]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[1].url})`}} id='1'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={1} disabled={img[1].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={2} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[2]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[2].url})`}} id='2'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={2} disabled={img[2].disabled}>Roll</button></div>
                        </div>
                </div>
            )
        } else if (img.length === 4) {
            diceDisplay = (
                <div className="fourDice">
                    <div className="fourSplit">
                        <div className='rollingBlock'>
                            <button className='remove' value={0} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[0]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[0].url})`}} id='0'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={0} disabled={img[0].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={1} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[1]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[1].url})`}} id='1'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={1} disabled={img[1].disabled}>Roll</button></div>
                        </div>
                    </div>
                    <div className="fourSplit">
                        <div className='rollingBlock'>
                            <button className='remove' value={2} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[2]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[2].url})`}} id='2'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={2} disabled={img[2].disabled}>Roll</button></div>
                        </div>                        
                        <div className='rollingBlock'>
                            <button className='remove' value={3} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[3]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[3].url})`}} id='3'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={3} disabled={img[3].disabled}>Roll</button></div>
                        </div>
                    </div>
                </div>
            )
        } else if (img.length === 5) {
            diceDisplay = (
                <div className="fiveDice">
                    <div className="fiveSplit">
                        <div className='rollingBlock'>
                            <button className='remove' value={0} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[0]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[0].url})`}} id='0'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={0} disabled={img[0].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={1} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[1]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[1].url})`}} id='1'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={1} disabled={img[1].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={2} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[2]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[2].url})`}} id='2'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={2} disabled={img[2].disabled}>Roll</button></div>
                        </div>
                    </div>
                    <div className="fiveSplit fiveSecondSplit">
                        <div className='rollingBlock'>
                            <button className='remove' value={3} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[3]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[3].url})`}} id='3'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={3} disabled={img[3].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={4} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[4]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[4].url})`}} id='4'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={4} disabled={img[4].disabled}>Roll</button></div>
                        </div>
                    </div>
                </div>
            )
        } else if (img.length === 6) {
            diceDisplay = (
                <div className="sixDice">
                    <div className="sixSplit">
                        <div className='rollingBlock'>
                            <button className='remove' value={0} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[0]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[0].url})`}} id='0'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={0} disabled={img[0].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={1} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[1]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[1].url})`}} id='1'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={1} disabled={img[1].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={2} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[2]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[2].url})`}} id='2'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={2} disabled={img[2].disabled}>Roll</button></div>
                        </div>
                    </div>
                    <div className="sixSplit">
                        <div className='rollingBlock'>
                            <button className='remove' value={3} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[3]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[3].url})`}} id='3'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={3} disabled={img[3].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={4} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[4]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[4].url})`}} id='4'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={4} disabled={img[4].disabled}>Roll</button></div>
                        </div>
                        <div className='rollingBlock'>
                            <button className='remove' value={5} onClick={this.handleRemove}>X</button>
                            <div className='rollOutcome'>{this.props.diceSlots[5]['rolled']}</div>
                            <div className='dice' style={{ backgroundImage: `url(${img[5].url})`}} id='5'></div>
                            <div className='diceBlock'><button className="rollDice" onClick={this.handleRolling} value={5} disabled={img[5].disabled}>Roll</button></div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='boxContainer'>
                <div className='diceBox'>
                    <div className='rollingBox'>
                        <div className='rollingOverlay'></div>
                        {diceDisplay}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dice;