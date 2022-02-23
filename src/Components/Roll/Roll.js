import React from 'react';
import './Roll.css';
import Animation from '../../util/Animation';

class Roll extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allRollsValue: 0    
        }
        this.rollAll = this.rollAll.bind(this);
    }

    rollAll(){
        let x = this.props.diceSlots;
        let maxArr = [];
        let resultsArr = [];
        let total = 0;

        // for loop that pushes the
        // max number to roll and a
        // zero for empty slots
        for (let i = 0; i < x.length; i++) {
            if (x[i].dice !== 'temp') {
                maxArr.push(x[i]['max']); 
            } else {
                maxArr.push(-1);
            }
        }

        this.animateAll();

        // for loop that roll a number
        // based on the dice slots max
        // roll and pushes it to an array
        for (let i = 0; i < maxArr.length; i++){
            if (maxArr[i] === 100) {
                resultsArr.push((Math.floor(Math.random() * maxArr[i])));
            } else if (maxArr[i] === -1) {
                resultsArr.push(0);
            } else {
                resultsArr.push((Math.floor(Math.random() * maxArr[i]) + 1));
            }
        }

        // send all the rolls to
        // the app component to display
        // and update roll count
        this.props.rollAllDisplay(resultsArr);
        this.props.updateRollCount(1);

        // add the total of all 
        // the rolls to be displayed
        for (let i = 0; i < resultsArr.length; i++) {
            total = resultsArr[i] + total;
        }

        // for loop to add the 
        // buildList function
        for (let i = 0; i < x.length; i++) {
            // prevent temp imgs from
            // being add to the tracker
            if (x[i].dice !== 'temp') {
                this.props.buildList(resultsArr[i], this.props.count, x[i].dice, true, total)
            } 
        }
        
        this.setState({
            allRollsValue: total
        });
    }

    animateAll() {
        let rollTime = 0;

        // for loop to iterate through all the dice
        // in the diceslots
        for (let i = 0; i < this.props.diceSlots.length; i++){
            rollTime = 0;
            while (rollTime < 750){
                rollTime = Math.floor(Math.random() * 1200);
            }

            // check the dice slots for a empty slot
            if (this.props.diceSlots[i].dice !== 'temp'){

                // choose the div by the id and assign it to a 
                // variable, as well as assign the stylesheet to a variable
                let x = document.getElementById(i);
                let styleSheet = document.styleSheets[0];

                // creating variables holding the generated keyFrames
                // based on the types of dice being rolled and giving
                // a unique name to the dice rolling animation based on
                // the slot number
                let rolling1 = Animation.buildAnimation(this.props.diceSlots[i]['dice'], `rolling${i}`)
                let rolling2 = Animation.buildAnimation(this.props.diceSlots[i]['dice'], `rolling2_${i}`)

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
                    x.style.animation = `rolling${i} ${rollTime}ms 1 ease`;
                } else if (this.state.animation) {
                    this.setState({animation: false})
                    x.style.animation = `rolling2_${i} ${rollTime}ms 1 ease`;
                }
            }  
        }
    }

    render() {
        return(
            <div className="rollContainer">
                <button className="rollDice" onClick={this.rollAll}>Roll All</button>
                <div className="numberContainer">
                    <h3>Total Dice Value: <span>{this.state.allRollsValue}</span></h3>
                </div>
            </div>
        );
    }
}

export default Roll;
