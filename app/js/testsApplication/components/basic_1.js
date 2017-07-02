 import React from "react";

 class Button extends React.Component {   
  handleClick = () => {
  	this.props.onClickFunc(this.props.incrementValue);
  }
 	render(){
  	return(
    	<button onClick={this.handleClick}>
        +{this.props.incrementValue}
      </button>
    )
  }
}

const Result = (props) => {
	return (
  	<div>{props.counter}</div>
  )
}

class Basic1_App extends React.Component {
  state = {counter : 0};
  
  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
    	counter:prevState.counter + incrementValue
    }))
  }
  
	render(){
  	return (
    	<div>
        <Button incrementValue={1} onClickFunc={this.incrementCounter} />
        <Button incrementValue={5} onClickFunc={this.incrementCounter} />
        <Button incrementValue={10} onClickFunc={this.incrementCounter} />
        <Result counter={this.state.counter} />
      </div>
    )
  }
}


class BasicRenderer extends React.Component {
    render(){
        return (
            <div id='kaka'>
                <this.props.compName />
            </div>
        )
    }
}


export {BasicRenderer, Basic1_App}
//ReactDOM.render(<App  />,mountNode);