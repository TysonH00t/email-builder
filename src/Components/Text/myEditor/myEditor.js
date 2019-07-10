import React, { Component } from "react";
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
//import Editor from "draft-js-plugins-editor";
import addLinkPluginPlugin from './plugins/addLinkPlugins';
import BlockStyleToolbar, { getBlockStyle } from "./blockStyles/BlockStyleToolbar";
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";

class myEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  plugins = {
      addLinkPluginPlugin: addLinkPluginPlugin,
  }

  onChange = editorState => this.setState({ editorState });

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };


  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -')
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
}

onURLChange = e => this.setState({ urlValue: e.target.value });

focus = () => this.refs.editor.focus();

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

  render() {
    return (
      <div>
          <BlockStyleToolbar
    editorState={this.state.editorState}
    onToggle={this.toggleBlockType}
    />
        <button onClick={this.onUnderlineClick}>U</button>
        <button onClick={this.onBoldClick}>
          <b>B</b>
        </button>
        <button onClick={this.onItalicClick}>
          <em>I</em>
        </button>
        <button id="link_url" onClick={this.onAddLink} className="add-link">
					<i className="material-icons">attach_file</i>
		</button>
        <button className="inline styleButton" onClick={this.onAddImage}>
					<i class="material-icons">image</i>
				</button>
        <Editor
        blockStyleFn={getBlockStyle}
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          plugins={this.addLinkPluginPlugin}
          blockRendererFn={mediaBlockRenderer}
          ref="editor"
        />
      </div>
    );
  }
}

export default myEditor;
