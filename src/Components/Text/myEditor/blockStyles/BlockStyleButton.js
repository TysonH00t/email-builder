import React from "react";
import './BlockStyleButton.css';
class BlockStyleButton extends React.Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = "Button";
    if (this.props.active) {
      className += " Button-Active";
    }

    return (
      <span className={className} onClick={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default BlockStyleButton;
