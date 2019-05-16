import React, {Component} from "react";
import './Content.css';

class Content extends Component {

  state = {
    decideShowing: false
  }

  decide = () => {
    this.setState({decideShowing: true});
  }

  render() {

    let decider = <h4>Click to add content</h4>

    if (this.state.decideShowing === true) {
      decider = (
        <>
      <button className="tile">Text</button>
      <button className="tile">Image</button>
      </>);
    }

    return (
      <div onClick={this.decide} className="content">
      {decider}
    </div>
    )
  }


  
};

export default Content;
