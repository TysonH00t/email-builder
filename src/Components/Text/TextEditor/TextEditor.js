import { Editor } from "slate-react";

import "./TextEditor.css";

import React from "react";
//import InitialValue from "./InitialValue";
import { isKeyHotkey } from "is-hotkey";

//import Redux and font awesome
import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Define the default node type.
 *
 */

const DEFAULT_NODE = "paragraph";

/**
 * Define hotkey matchers.
 *
 */

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");

/**
 * The rich text example.
 *
 */

class Text extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   */

  // state = {
  //   value: Value.fromJSON(InitialValue)
  // };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   */

  hasMark = type => {
    const { value } = this.props.content;
    return value.activeMarks.some(mark => mark.type === type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   */

  hasBlock = type => {
    const { value } = this.props.content;
    return value.blocks.some(node => node.type === type);
  };

  /**
   * Store a reference to the `editor`.
   *
   */

  ref = editor => {
    this.editor = editor;
  };

  /**
   * Render.
   *
   */

  render() {
    return (
      <>
        <div className="toolbar">
          {this.renderMarkButton("bold", <FontAwesomeIcon icon="bold" />)}
          {this.renderMarkButton("italic", <FontAwesomeIcon icon="italic" />)}
          {this.renderMarkButton(
            "underlined",
            <FontAwesomeIcon icon="underline" />
          )}
          {this.renderBlockButton(
            "numbered-list",
            <FontAwesomeIcon icon="list-ol" />
          )}
          {this.renderBlockButton(
            "bulleted-list",
            <FontAwesomeIcon icon="list-ul" />
          )}
        </div>
        <Editor
          className="editor"
          spellCheck
          autoFocus
          placeholder="Enter some rich text..."
          ref={this.ref}
          value={this.props.content.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    let foreground = "grey";
    if (isActive === true) {
      foreground = "black";
    } else {
      foreground = "grey";
    }
    return (
      <button
      className="button"
        style={{ color: foreground }}
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {icon}
      </button>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   */

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.props.content;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }
    let foreground = "grey";
    if (isActive === true) {
      foreground = "black";
    } else {
      foreground = "grey";
    }

    return (
      <button
        className="button"
        style={{ color: foreground }}
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        {icon}
      </button>
    );
  };

  /**
   * Render a Slate node.
   *
   */

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  /**
   * Render a Slate mark.
   *
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  /**
   * On change, save the new `value`.
   *
   */

  onChange = ({ value }) => {
    //this.setState({ value });
    this.props.onContentUpdate({ value });
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   */

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   */

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };
}

/**
 * Export.
 */

const mapStateToProps = state => {
  return {
    content: state.currentText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContentUpdate: (content) => dispatch({type: actionTypes.UPDATE_CONTENT, content: content})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Text);
