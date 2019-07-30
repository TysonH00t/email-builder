import React, { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  Modifier
} from "draft-js";
import 'draft-js/dist/Draft.css';
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";
import { convertToHTML } from "draft-convert";
import "./myEditor.css";

import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class myEditor extends Component {
  decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);

  state = {
    editorState: EditorState.createEmpty(this.decorator),
    showURLInput: false,
    urlValue: "",
    alignment: "left"
  };

  focus = () => this.refs.editor.focus();
  onChange = editorState => {
      this.setState({ editorState })
      this.props.onContentUpdate({ editorState })
};
  onURLChange = e => this.setState({ urlValue: e.target.value });

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };
  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };
  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };
  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  onAddImage = e => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        )
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };

  promptForLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState(
        {
          showURLInput: true,
          urlValue: url
        },
        () => {
          setTimeout(() => this.refs.url.focus(), 0);
        }
      );
    }
  };

  confirmLink = e => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showURLInput: false,
        urlValue: ""
      },
      () => {
        setTimeout(() => this.refs.editor.focus(), 0);
      }
    );
  };

  onLinkInputKeyDown = e => {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  };

  removeLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  };

  toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  toggleAlignment = x => {
    if(this.state.alignment === x) {
      this.setState({alignment: 'left'});
    }else {
      this.setState({alignment: x})
    }
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div>
          <input
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown.bind(this)}
          />
          <button onMouseDown={this.confirmLink.bind(this)}>Confirm</button>
        </div>
      );
    }

    // const html = convertToHTML({
    //   styleToHTML: style => {
    //     if (style === "BOLD") {
    //       return <span style={{ color: "blue" }} />;
    //     }
    //   },
    //   blockToHTML: block => {
    //     if (block.type === "PARAGRAPH") {
    //       return { element: <p />, empty: <br /> };
    //     }
    //     if (block.type === "atomic") {
    //       return {
    //         start: "",
    //         end: ""
    //       };
    //     }
    //   },
    //   entityToHTML: (entity, originalText) => {
    //     if (entity.type === "LINK") {
    //       return <a href={entity.data.url}>{originalText}</a>;
    //     }
    //     if (entity.type === "image") {
    //       return <img alt="" src={entity.data.src} />;
    //     }
    //     return originalText;
    //   }
    // })(this.state.editorState.getCurrentContent());

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className="RichEditor-root">
        <div className="Toolbar">
          <div className="Header" />
          <div className="Buttons">
            <div className="Controls">
              <BlockStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleBlockType}
              />
            </div>
            <div className="Controls">
              <InlineStyleControls
                editorState={this.state.editorState}
                onToggle={this.toggleInlineStyle}
              />
            </div>
            <div className="Controls">
            <AlignmentControls
            editorState={this.state.editorState}
            onToggle={this.toggleColor.bind(this)}
            />
            </div>
            <div className="Controls">
              <ColorControls
                  editorState={this.state.editorState}
                  onToggle={this.toggleColor.bind(this)}
                />
            </div>
            <button className="inline styleButton" onClick={this.onAddImage}>
              <FontAwesomeIcon icon="images" />
            </button>
            <button>Button</button>
            <button onMouseDown={this.promptForLink.bind(this)}>
              <strong>+</strong> <FontAwesomeIcon icon="link" />
            </button>
            <button onMouseDown={this.removeLink.bind(this)}>
              - <FontAwesomeIcon icon="link" />
            </button>
            {urlInput}
          </div>
        </div>
        <div className={className} onClick={this.focus}>
          <Editor
            textAlignment={this.state.alignment}
            customStyleMap={colorStyleMap}
            editorState={this.state.editorState}
            blockStyleFn={getBlockStyle}
            blockRendererFn={mediaBlockRenderer}
            //customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};

// const styleMap = {
//   CODE: {
//     backgroundColor: "rgba(0, 0, 0, 0.05)",
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2
//   }
// };

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "Button";
    if (this.props.active) {
      className += " Button-Active";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "P1", style: "paragraph" },
  //{label: 'P2', style: 'paragraph2'},
  //{label: 'P3', style: 'paragraph3'},
  { label: <FontAwesomeIcon icon="list-ul" />, style: "unordered-list-item" },
  { label: <FontAwesomeIcon icon="list-ol" />, style: "ordered-list-item" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type, index) => (
        <StyleButton
          key={type.label + index}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: <FontAwesomeIcon icon="bold" />, style: "BOLD" },
  { label: <FontAwesomeIcon icon="italic" /> },
  { label: <FontAwesomeIcon icon="underline" />, style: "UNDERLINE" },
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, index) => (
        <StyleButton
          key={type.label + index}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};


{/* <StyleButton label={<FontAwesomeIcon icon="align-center" />} onToggle={() => this.toggleAlignment('center')} />
<StyleButton label={<FontAwesomeIcon icon="align-right" />} onToggle={() => this.toggleAlignment('right')} /> */}

var ALIGNMENT_STYLES = [
  { label: <FontAwesomeIcon icon="bold" />, style: "BOLD" },
  { label: <FontAwesomeIcon icon="italic" /> },
  { label: <FontAwesomeIcon icon="underline" />, style: "UNDERLINE" },
];

const AlignmentControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {ALIGNMENT_STYLES.map((type, index) => (
        <StyleButton
          key={type.label + index}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
class ColorStyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let style = {...colorStyleMap[this.props.style]};
    if (this.props.active) {
      style = {...colorStyleMap[this.props.style], background: '#999'};
    } 

    return (
      <span className="Color" style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var COLORS = [
  {label: <FontAwesomeIcon icon="paint-brush" />, style: 'blue'},
  {label: <FontAwesomeIcon icon="paint-brush" />, style: 'white'},
];

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {COLORS.map(type =>
        <ColorStyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  blue: {
    color: '#0078D7',
  },
  white: {
    color: 'white',
  },
};

/**
 * Export.
 */
  
  const mapDispatchToProps = dispatch => {
    return {
      onContentUpdate: (content) => dispatch({type: actionTypes.UPDATE_CONTENT, content: content})
    }
  }
  
  export default connect(null, mapDispatchToProps)(myEditor);