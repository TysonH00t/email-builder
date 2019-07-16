import React from "react";
import './HeaderStyleDropdown.css';

class HeaderStyleDropdown extends React.Component {
	onToggle = event => {
		let value = event.target.value;
		this.props.onToggle(value);
	};

	render() {
		return (
			<select className='Dropdown' value={this.props.active} onChange={this.onToggle}>
				{this.props.headerOptions.map(heading => {
					return <option key={heading.label} value={heading.style}>{heading.label}</option>;
				})}
			</select>
		);
	}
}

export default HeaderStyleDropdown;
