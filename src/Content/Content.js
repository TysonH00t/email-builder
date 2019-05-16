import React, {Component} from "react";
import './Content.css';
import Text from '../Components/Text/Text';

class Content extends Component {

  state = {
    contentShow: ''
  }

  content = () => {
    this.setState({contentShow: "contentShow"});
  }

  render() {

    let contentDecider;

    switch (this.state.contentShow) {
      case "contentShow" :
      contentDecider = (
        <div className="content">
      <button onClick={() => this.setState({contentShow: 'text'})} className="tile">Text</button>
      <button className="tile">Image</button>
      </div>);
      break;
      case "text" :
      contentDecider = <Text />;
      break;
      case "image" :
      contentDecider = <h4>Image</h4>
      break;
      default : contentDecider = <div onClick={() => this.setState({contentShow: 'contentShow'})} className="content"><h4>Click to add content</h4></div>;
      break;
    }

    // if (this.state.contentShow === true) {
    //   contentDecider = (
    //     <>
    //   <button className="tile">Text</button>
    //   <button className="tile">Image</button>
    //   </>);
    // }

    return (
      <>
      {contentDecider}
      </>
    )
  }


  
};

export default Content;
