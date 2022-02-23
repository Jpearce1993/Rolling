import React from 'react';
import './App.css';

import Selection from '../Selection/Selection';
import Dice from '../Dice/Dice';
import Roll from '../Roll/Roll';
import Tracker from '../Tracker/Tracker';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dice: '',
      max_roll: 20,
      rollList: [],
      diceList: [],
      numOfDice: 1,
      rollCount: 0,
      diceSlots: [
        {
          dice: 'd20',
          max: 20,
          rolled: 0
      }],
      rolled: null,
      rollHistory: [],
      bigRollHistory: [],
    }
    this.chooseDice = this.chooseDice.bind(this);
    this.buildList = this.buildList.bind(this);
    this.clearTracker = this.clearTracker.bind(this);
    this.numberOfDice = this.numberOfDice.bind(this);
    this.buildDiceSlots = this.buildDiceSlots.bind(this);
    this.rolling = this.rolling.bind(this);
    this.rollAllDisplay = this.rollAllDisplay.bind(this);
    this.removeSlot = this.removeSlot.bind(this);
    this.updateRollCount = this.updateRollCount.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.updateRollHistory = this.updateRollHistory.bind(this);
  }

  // sets the state based on what dice was choosen
  // in the DiceList Component nested 
  // in the Selection Component
  chooseDice(dice,max) {
    let y = this.state.diceSlots;

    if (y.length === 1) {
      for(let i = 0; i < y.length; i++){
          y.splice(i, 1, {dice: dice, max: max, rolled: 0})
          break;
      } 
    } else if (y.length > 1){
      for(let i = 0; i < y.length; i++){
        if(y[i]['dice'] === 'temp' ){
          y.splice(i, 1, {dice: dice, max: max, rolled: 0})
          break;
        } else if (i === (y.length - 1) ) {
          y.splice(i, 1, {dice: dice, max: max, rolled: 0})
          break;
        }
      }
    }

    this.setState ({
      dice: dice,
      max_roll: max
    });
  }

  // method that tracks the rolls
  // the user has and builds an
  // array that is passed on to 
  // the Tracker component and 
  // logs all the information
  // in the app state for distribution
  buildList(roll, count, dice, bigRoll, total){
    let histArr = this.state.rollHistory;
    let emptySlotCount = 0;


    // for loop for accurate number
    // of dice displayed in the multiroll
    // icon on the tracker
    for (let i = 0; i < this.state.diceSlots.length; i++) {
      if (this.state.diceSlots[i].dice === 'temp') {
        emptySlotCount++;
      }
    }

    // add the roll and count 
    // to the total roll history
    // as an object
    histArr.push({count: count, roll: roll, dice: dice, bigRoll: bigRoll, 
      total: total, numDice: (this.state.diceSlots.length - emptySlotCount)});

    this.setState({
        rollHistory: histArr
    })
  }

  // method to reset the current
  // displayed list for the
  // dice roll tracker
  clearTracker() {
    this.setState({
      rollHistory: [],
      bigRollHistory: []
    });
  }

  // assigns the number of dice
  // choosen for the current roll
  numberOfDice(amount){
    this.setState({
      numOfDice: amount
    })
  }

  buildDiceSlots(x){
    let y = this.state.diceSlots;

    if (x < y.length) {
      for (let i = y.length; i > x; i--){
        y.pop();
      }

      this.setState({
        diceSlots: y
      })
    } else if (x > y.length) {
      for (let i = y.length; i < x; i++){
        y.push({dice: 'temp', max: 0, rolled: 0});
      }

      this.setState({
        diceSlots: y
      })
    } else {
      return;
    }
  }

  updateRollCount(x){
    this.setState({
      rollCount: (this.state.rollCount + x)
    });
  }

  // method to roll the dice
  // based on random * highest possible
  // number on the die + 1 because the lowest
  // number can only be 1 with the exception of
  // the d100 which has a chance of rolling a 00
  rolling(max,index) {
    let arr = this.state.diceSlots;
    let temp = [];
    let roll = 0;

    // rolls the dice based on the 
    // dice type selected and saves
    // the value to the state
    if (max !== 100){
        roll = (Math.floor(Math.random() * max) + 1);
        this.buildList(roll, this.state.rollCount, 
          this.state.diceSlots[index].dice, false, roll);

        this.setState({
            rolled: roll,
            rollCount: (this.state.rollCount + 1)
        });
    } else if (max === 100) {
        roll = Math.floor(Math.random() * max);
        this.buildList(this.state.rolled, this.state.rollCount, 
          this.state.diceSlots[index].dice, false, roll);

        this.setState({
            rolled: roll,
            rollCount: (this.state.rollCount + 1)
        });
    }

    // iterates through the current
    // state of diceslots and finds the
    // dice that was selected by the user
    // and saves the new rolled value to the
    // state in the selected diceSlot's object
    for (let i = 0; i < arr.length; i++) {
      if (parseInt(index) === i) {
        temp.push({
          dice: this.state.diceSlots[i]['dice'],
          max: max,
          rolled: roll
        })
      } else if (parseInt(index) !== i){
        temp.push(this.state.diceSlots[i])
      }
    }

    this.setState({
      diceSlots: temp
    })
  }

  rollAllDisplay(arr){
    let x = this.state.diceSlots;
    let temp = [];
    let obj;

    // for loop to check the arr parameter
    // if the dice roll was an empty slot or
    // if there was an actual number rolled
    // then displays them 
    for(let i = 0; i < x.length; i++){
      if (x[i].dice === 'temp'){
        obj = {
          dice: x[i].dice,
          max: x[i].max,
          rolled: 0
        }
      } else {
        obj = {
          dice: x[i].dice,
          max: x[i].max,
          rolled: arr[i]
        }
      }
      temp.push(obj);
    }

    this.setState({
      diceSlots: temp
    })
  }

  removeSlot(value) {
    let arr = this.state.diceSlots;
    let temp = [];

    for (let i = 0; i < arr.length; i++) {
      if (value === i) {
        temp.splice(i, 1, {
          dice: 'temp', 
          max: 0, 
          rolled: 0
        })
      } else if (value !== i){
        temp.push(this.state.diceSlots[i])
      }
    }

    this.setState({
      diceSlots: temp
    })
  }

  exportCSV() {
    // if statement to prevent downloading an empty file
    if (this.state.rollHistory.length === 0) {
      window.alert('No current history.')
    } else {
      // timestamp variables for filenames
      let currentdate = new Date(); 
      let datetime = (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

      // header for the csv file
      let header = ['Roll Number', 'Dice Type', 'Roll', 'Multiroll', 'Total', 'Number of Dice'];

      // data variables to hold tracker history
      // for csv file writing
      let data = [];
      let dataEntry;

      // Array holding data objects of 
      // each roll made in the tracker
      for (let i = 0; i < this.state.rollHistory.length; i++){
        dataEntry = {
          count: this.state.rollHistory[i].count, 
          dice: this.state.rollHistory[i].dice, 
          roll: this.state.rollHistory[i].roll,
          bigRoll: this.state.rollHistory[i].bigRoll,
          total: this.state.rollHistory[i].total,
          numDice: this.state.rollHistory[i].numDice
        };

        data.push(dataEntry)
    }

      let a = document.createElement("a");

      // building and downloading the csv file 
      a.href = 'data:attachment/csv,' + header + '\n';

      for (let i = 0; i < data.length; i++) {
        a.href = a.href + '\n' + Object.values(data[i]);
      }

      a.target = "_Blank";
      a.download = `Rolling ${datetime}.csv`;
      document.body.appendChild(a);
      a.click();
    }
  }

  updateRollHistory(update){
    let arr = [];
    let newCount;
    
    // if statement to prevent app crash
    // if no file is selected or if data is
    // undefined
    if (update.length !== 0){

      // for loop to manipulate data into 
      // correct format for tracker
      for (let i = 0; i < update.length; i++){
        let tempBool;
        if (update[i].Multiroll === 'false'){
          tempBool = false;
        } else if (update[i].Multiroll === 'true') {
          tempBool = true;
        }

        let tempObj = {
          count: update[i].RollNumber,
          dice: update[i].DiceType,
          roll: update[i].Roll,
          bigRoll: tempBool,
          total: update[i].Total,
          numDice: update[i].NumberofDice 
        }

        arr.push(tempObj);
      }

      // readjusting count number
      // based on files largest count
      newCount = parseInt(arr[arr.length - 1].count);
      
      // setting the state to update
      // tracker and count number
      this.setState({
        rollHistory: arr,
        rollCount: (newCount + 1)
      });
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <div className="selectionContainer">
            <div className="Selection">
                <Selection 
                  choose={this.chooseDice}
                  numberOfDice={this.numberOfDice}
                  buildSlots={this.buildDiceSlots}
                />
            </div>
          </div>
          <div className="mainContainer">
            <div className="Dice">
              <Dice 
                diceSlots={this.state.diceSlots}
                rolled={this.state.rolled}
                rolling={this.rolling}
                removeSlot={this.removeSlot}
              />
            </div>
            <div>
              <Roll 
                diceSlots={this.state.diceSlots}
                rolling={this.rolling}
                rollAllDisplay={this.rollAllDisplay}
                updateRollCount={this.updateRollCount}
                buildList={this.buildList}
                count={this.state.rollCount}
              />
            </div>
          </div>
          <div className="trackerContainer">
            <Tracker 
                rolls={this.state.rollList}
                count={this.state.rollCount}
                clear={this.clearTracker}
                save={this.exportCSV}
                updateRollHistory={this.updateRollHistory}
                history={this.state.rollHistory}
            />
          </div>
        </div>
      </div>
    )
  }
}


export default App;
