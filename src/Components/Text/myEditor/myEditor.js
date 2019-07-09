import React, {Component} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

class myEditor extends Component {

    state = {
        editorState: EditorState.createEmpty(),
    }

    onChange = (editorState) => this.setState({editorState});

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }

      onBoldClick() {
          this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
      }

    render () {
        return (
<div>
    <button onClick={this.onBoldClick.bind(this)}>Bold</button>
    <Editor
    editorState={this.state.editorState} 
    onChange={this.onChange} 
    handleKeyCommand={this.handleKeyCommand}
    />
</div>
        );
    }
}

export default myEditor;

