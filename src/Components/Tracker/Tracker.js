import React from 'react';
import './Tracker.css';

import CsvReader from '../CSVReader/CSVReader';

// importing all the dice images
import d4 from '../../Images/d4.png';
import d6 from '../../Images/d6.png';
import d8 from '../../Images/d8.png';
import d10 from '../../Images/d10.png';
import d12 from '../../Images/d12.png';
import d20 from '../../Images/d20.png';
import d100 from '../../Images/d100.png';
import multiRoll from '../../Images/multiroll.png';

class Tracker extends React.Component {
    constructor(props){
        super(props);
        this.displayList = this.displayList.bind(this);
    }

    // method that iterates through the
    // built array containing previous rolls
    // and displays each roll and roll number
    displayList(){
        let arr = this.props.history;
        let y = this.props.count;
        let list = [];
        let numDice;
        let temp;
        let img;

        if(y !== 0){
            for (let x = 0; x < arr.length; x++){
                if (arr[x].roll === null) {
                    list.splice(x, 1);
                } else {
                    switch(arr[x].dice){
                        case 'd4':
                            temp = d4;
                            break;
                        case 'd6':
                            temp = d6;
                            break;
                        case 'd8':
                            temp = d8;
                            break;
                        case 'd10':
                            temp = d10;
                            break;
                        case 'd12':
                            temp = d12;
                            break;
                        case 'd20':
                            temp = d20;
                            break;        
                        case 'd100':
                            temp = d100;
                            break;
                        default:
                            break;
                    }

                    img = (
                        <div className='trackerDice' style={{ backgroundImage: `url(${temp})`}}></div>
                    )
                    
                    if (!arr[x].bigRoll){
                        list.unshift(
                            <div className='trackerEntry singleRoll'>
                                {img}
                                <p><span className='rollNumber'>{`Roll ${arr[x].count}:`}</span> <span className='rollOutput'>{arr[x].roll}</span></p>
                            </div>
                        )
                    } else if (arr[x].bigRoll) {
                        try {
                            if (arr[x - 1] === undefined || arr[x - 1].count !== arr[x].count) {
                                list.unshift(                                    
                                <div className='trackerEntry bigRoll total'>
                                    <p><span className='rollOutput'>Total: {arr[x].total}</span></p>
                                </div>
                                )
                            }
                            list.unshift(
                                <div className='trackerEntry bigRoll'>
                                    {img}
                                    <p><span></span><span className='rollOutput'>{arr[x].roll}</span></p>
                                </div>
                            )
                            if (arr[x + 1] === undefined || arr[x + 1].count !== arr[x].count) {
                                if (arr[x].numDice === 1){
                                    numDice = (
                                    <div 
                                        className='trackerDice' 
                                        style={{ backgroundImage: `url(${multiRoll})`}}>
                                            <span className='multiRoll oneSlot'>{arr[x].numDice}</span>
                                    </div>);
                                } else if (arr[x].numDice === 2) {
                                    numDice = (
                                        <div 
                                            className='trackerDice' 
                                            style={{ backgroundImage: `url(${multiRoll})`}}>
                                                <span className='multiRoll twoSlot'>{arr[x].numDice}</span>
                                        </div>);
                                } else if (arr[x].numDice >= 3 && arr[x].numDice <= 6) {
                                    numDice = (
                                        <div 
                                            className='trackerDice' 
                                            style={{ backgroundImage: `url(${multiRoll})`}}>
                                                <span className='multiRoll threeSlot'>{arr[x].numDice}</span>
                                        </div>);
                                } 

                                list.unshift(         
                                <div>                 
                                    <div className='trackerEntry bigRoll'>
                                        {numDice}
                                        <p><span className='rollNumber'>{`Roll ${arr[x].count}:`}</span> <span className='rollOutput'></span></p>
                                    </div>
                                </div>)
                            }
                        } catch(e) {
                            console.log (e)
                        }
                    }
                }
            }
            return list;
        } else if (y === 0){
            return (                    
            <div className='trackerEntry noEntries'>
                <p><span>Ready to Roll</span></p>
            </div>);
        }
    }
   
    render() {

        // hide the scrollbar in tracker
        // until 10 rolls have been made
        let scrollBar;

        if (this.props.history.length < 5) {
            scrollBar = false;
        } else {
            scrollBar = true;
        }

        return (
            <div className="displayContainer">
                <div className="trackerDisplay">
                    <div className="titleContainer">
                        <h3>Roll Tracker</h3>
                    </div>
                    <div className="listContainer" style={{overflow: scrollBar ? '' : 'hidden'}}>
                        <div className="list">
                            <div className='trackerOverlay'></div>
                            <div className='entryHolder'>
                                {this.displayList()}
                            </div>
                        </div>
                    </div>
                    <div className='trackerExtras'>
                        <div className="resetContainer">
                            <button className="reset" onClick={this.props.clear}>Clear</button>
                        </div>
                        <div className="downUpCont">
                            <CsvReader 
                                updateRollHistory={this.props.updateRollHistory}
                                save={this.props.save}    
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tracker;