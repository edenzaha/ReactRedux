/*MAIN GAME*/
import React from "react";
import ReactDOM from "react-dom"


const Stars = (props) => {
    const numbersOfStarts = Math.floor((Math.random()*9)) + 1;
    let stars = [];
    for(let i=0;i<numbersOfStarts;i++){
        stars.push(<i key={i} className="fa fa-star"></i>);
    }
    return(
        <div className="col-5">
            {stars}
        </div>
    )
}

const Button = (props) => {
    return(
        <div className="col-2">
            <button>=</button>
        </div>
    )
}

const Answer = (props) => {
    return(
        <div className="col-5">
            ...
        </div>
    )
}

const Numbers = (props) => {
    return (
        <div className="card text-center">
            <div>
                <span>1</span>
                <span className="selected">2</span>
                <span className="used">3</span>
            </div>
        </div>
    )
}
class Game extends React.Component {
    render(){
        return(
            <div className="container gameContainer">
                <h1>Play Nine</h1>
                <hr/>
                <div className="row">
                    <Stars />
                    <Button />
                    <Answer />
                </div>
                <br />
                <Numbers />
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