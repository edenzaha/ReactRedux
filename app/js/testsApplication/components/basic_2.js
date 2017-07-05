import React from "react";
import ReactDOM from "react-dom"
import axios from "axios"

 const Card = (props) => {
     return (
         <div style={{margin:"1em"}}>
             <img width="75" src={props.avatar_url} />
             <div style={{display:'inline-block', marginLeft:10, height:80, verticalAlign:"top"}}>
                 <div style={{fontSize:'1.24em', fontWeight:"bold"}}>
                     {props.name}
                </div>
                 <div>{props.company}</div>
             </div>
         </div>
     )
 }
 
 const CardList = (props) => {
     return (
         <div>
             {props.cards.map(card=> <Card key {...card} />)}             
         </div>
     )
 }

class Form extends React.Component {
    state = {userName:""}
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submit", this.state.userName);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
        .then(resp => {
            this.props.onSubmit(resp.data);
            this.setState({userName: ""})
        })
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.userName} onChange={(event)=> this.setState({userName:event.target.value})} type="text" placeholder="Github username" />
                <button type="submit">Add card</button>
            </form>
        )
    }
}

class CardsApp extends React.Component {
    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards:prevState.cards.concat(cardInfo)
        }))
        //console.log(cardInfo);
    }
    state = {cards: []}
    render(){
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />
            </div>            
        )
    }
}

export {CardsApp}
 //ReactDOM.render(<CardsApp />,document.getElementById("app"))