/*MAIN GAME*/
import React from "react";
import ReactDOM from "react-dom"
import _ from 'lodash'

const Stars = (props) => {
   
    let stars = [];
 
    return(
        <div className="col-5">
            {_.range(props.numbersOfStars).map(i=>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    )
}

const Button = (props) => {
    let button;
    switch(props.answerIsCorrect){
        case true:
            button = 
            <div className="col-2">
                <button onClick={props.acceptAnswer} className="btn btn-success">
                    <li className="fa fa-check"></li>
                </button>
            </div>
        break;
        case false:
            button = 
            <div className="col-2">
                <button className="btn btn-danger">
                    <li className="fa fa-times"></li>
                </button>
            </div>        
        break;
        default:
            button =         
            <div className="col-2">
                <button onClick={props.checkAnswer} className="btn" disabled={props.selectedNumbers.length==0}>=</button>
            </div>
        break;
    }
    return(
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button disabled={props.redraws==0} onClick={props.redraw}  className="btn btn-warning btn-sm">
                <li className="fa fa-refresh"></li>{props.redraws}
            </button>
        </div>
    )
}

const Answer = (props) => {
    return(
        <div className="col-5">
            {props.selectedNumbers.map((number,i)=> 
                <span onClick={()=> props.unselectNumber(number)} key={i}>{number}</span>
            )}
        </div>
    )
}

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number)>=0){
            return "used"
        }
        if (props.selectedNumbers.indexOf(number)>=0){
            return "selected"
        }
    }
    return (
        <div className="card text-center">
            <div>
               {Numbers.list.map((number, i)=> 
                   <span onClick={()=>props.selectNumber(number)} className={numberClassName(number)} key={i}>{number}</span>
               )}
            </div>
        </div>
    )
}

Numbers.list = _.range(1,10); //should be out of the component as it never changes and will be used by all instances


const DoneFrame = (props) => {
    return (
        <div className="text-center">       
                <h2>{props.doneStatus}</h2>
                <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>           
        </div>
    )
}

 
class Timer extends React.Component {
 
    render(){
        return (
            <div className="timerContainer">
                <b>[{this.props.timerTime/1000}</b> seconds left]
            </div>
        )
    }
}

class Game extends React.Component {
    static randomNumber = () =>  Math.floor(Math.random()*9) + 1;
    static initialState = () =>({
        selectedNumbers :[],
        randomNumbersOfStars : Game.randomNumber(),
        answerIsCorrect:null,
        usedNumbers : [],
        redraws: 5,
        doneStatus:null,
        timer: 3*1000
    });

    state = Game.initialState();

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber)>=0) return;
        this.setState(prevState => ({
            answerIsCorrect:null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    }
    unselectNumber = (clickedNumber) => {
        this.setState(prevState=>({
            answerIsCorrect:null,
            selectedNumbers:prevState.selectedNumbers.filter(number => number !==clickedNumber)}
        ))
    }
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect:prevState.randomNumbersOfStars === prevState.selectedNumbers.reduce((acc,n)=> acc +n,0)
        }))
    }
    onTimeElapsed = () => {
        this.setState({
            doneStatus:"Game Over! No more time"
        })
    }
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers:prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect:null,
            randomNumbersOfStars:Game.randomNumber()
        }),this.updateDoneStatus);
    }
    redraw = () => {
        if (this.state.redraws==0){return;}
        this.setState(prevState => ({           
            selectedNumbers: [],
            answerIsCorrect:null,
            randomNumbersOfStars:Game.randomNumber(),
            redraws:prevState.redraws-1
        }), this.updateDoneStatus)
    }
    possibleSolutions = ({randomNumbersOfStars,usedNumbers}) => {
        const possibleNumbers = _.range(1,10).filter(number=>
        usedNumbers.indexOf(number)===-1)

        return this.possibleCombinationSum(possibleNumbers,randomNumbersOfStars);
    }
    possibleCombinationSum =(arr,n) => {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
            var combinationSum = 0;
            for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    }
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9){
                return {doneStatus:'Done. Nice!'}
            }

            if (prevState.redraws===0 && !this.possibleSolutions(prevState)){
                return {doneStatus:'Game Over!'}
            }
        })
    }
    resetGame =() => {
        this.setState(Game.initialState())
        this.countTime();
    } ;
    
    countTime = () => {
        let self = this;
        let i = setInterval(()=> {            
            this.setState((prevState)=> {
                let curTime = prevState.timer - 1000;  
                if (curTime === 0){
                    //game over                     
                    clearInterval(i);
                    return {timer: 0, doneStatus : "Time Over!"}                    
                }
                return {timer: curTime}
            })
        },1000);//every second
    }
    componentDidMount() {
        this.countTime();
    }
    render(){
    
        const {
            usedNumbers,
            selectedNumbers,
            randomNumbersOfStars,
            answerIsCorrect ,
            redraws,
            doneStatus,
            timer
        } = this.state;        
        let bottomElement;
        if (doneStatus){
           bottomElement = <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} />
        }                        
        else
        {
           bottomElement = <Numbers usedNumbers={usedNumbers} selectNumber={this.selectNumber} selectedNumbers={selectedNumbers} />
        }  
        return(
            <div className="container gameContainer">
                <h1>Play Nine <Timer timerTime={timer} onTimeElapsed={this.onTimeElapsed} /></h1>
                <hr/>
                <div className="row">
                    <Stars numbersOfStars={randomNumbersOfStars} />
                    <Button checkAnswer={this.checkAnswer} 
                            selectedNumbers={selectedNumbers}
                            acceptAnswer={this.acceptAnswer}
                            answerIsCorrect={answerIsCorrect}
                            redraw={this.redraw}
                            redraws={redraws}/>
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={selectedNumbers} />
                </div>
                <br />
                {bottomElement}                                
            </div>
        )
        
    }
}






class GameContainer extends React.Component {
    render(){
        return(
            <div>
                <Game />
            </div>
        )
    }
}

export {GameContainer as Game}