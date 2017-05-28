import React from 'react';
import styles from './css/App.css';
import Layout from './Layout.js';
import request from 'superagent'
/*
    MONGO DEMO
 */
class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: "Mongo DB Demo"};
  }
  componentDidMount(){
 
  }
  render() {
    return (
      <Layout pageDescription={this.state.description}>
        <div>
          PAGE2
        </div>
      </Layout>
    );
  }
}


export default Page2