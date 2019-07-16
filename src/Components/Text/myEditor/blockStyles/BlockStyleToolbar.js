import React, { Component }from "react";
import { EditorState, Editor, RichUtils, AtomicBlockUtils } from "draft-js";
import BlockStyleButton from "./BlockStyleButton";
import HeaderStyleDropdown from "./HeaderStyleDropdown";
import './BlockStyleToolbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BLOCK_TYPES = [
	{ label: <FontAwesomeIcon icon="list-ul" />, style: "unordered-list-item" },
    { label: <FontAwesomeIcon icon="list-ol" />, style: "ordered-list-item" },
];

export const HEADER_TYPES = [
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" },
	{ label: "P", style: "paragraph" },
];

export function getBlockStyle(block) {
	console.log("run")
	switch (block.getType()) {
		default:
			return null;
	}
}


class BlockStyleToolbar extends Component {
	render() {
		const { editorState } = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<div className="Block-Toolbar">
				<div className="Header">
                    <HeaderStyleDropdown
                    					headerOptions={HEADER_TYPES}
                    					active={blockType}
                    					onToggle={this.props.onToggle}
                    				/>
                </div>
<div className="Button-Spacing">
				{BLOCK_TYPES.map((type, index) => {
					return (
						<BlockStyleButton
							active={type.style === blockType}
							label={type.label}
							onToggle={this.props.onToggle}
							style={type.style}
							key={type.label + index}
							type={type}
						/>
					);
				})}
                </div>
			</div>
		);
	}
}

export default BlockStyleToolbar;
