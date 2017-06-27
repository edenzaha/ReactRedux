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
    request
      .get("/actions/keycdn/zones")
      .set('Accept', 'application/json')
      .end((err,res) => {
        //MAGIC
        this.setState({data: res.body.data.data.zones[0].id});
      });

  }
  render() {
    return (
      <Layout pageDescription={this.state.description}>
        <div>
          PAGE2 - {this.state.data}
        </div>
      </Layout>
    );
  }
}


export default Page2