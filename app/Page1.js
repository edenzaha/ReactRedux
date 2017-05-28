import React from 'react';
import styles from './css/App.css';
import Layout from './Layout.js';
import request from 'superagent'

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ip: '0.0.0.0'};
  }
  componentDidMount(){
    request
      .get("/actions/get/44")
      .set('Accept', 'application/json')
      .end((err,res) => {
        //MAGIC
        this.setState({ip: res.body.ip});
      });
  }
  render() {
    return (
      <Layout>
        <div>
          {this.state.ip} 
        </div>
      </Layout>
    );
  }
}


export default Page1