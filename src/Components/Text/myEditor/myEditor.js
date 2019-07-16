// import React, { Component } from "react";
// import { Editor, EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
// //import Editor from "draft-js-plugins-editor";
// import addLinkPluginPlugin from './plugins/addLinkPlugins';
// import BlockStyleToolbar, { getBlockStyle } from "./blockStyles/BlockStyleToolbar";
// import { convertToHTML } from 'draft-convert';
// import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import './myEditor.css'

// class myEditor extends Component {
//   state = {
//     editorState: EditorState.createEmpty()
//   };

//   plugins = {
//       addLinkPluginPlugin: addLinkPluginPlugin,
//   }

//   onChange = editorState => this.setState({ editorState });

//   toggleBlockType = (blockType) => {
//     this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
//     };


//   handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return "handled";
//     }
//     return "not-handled";
//   }

//   onStyleClick = (style) => {
//       this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));

//   }

//   onAddLink = () => {
//     const editorState = this.state.editorState;
//     const selection = editorState.getSelection();
//     const link = window.prompt('Paste the link -')
//     if (!link) {
//       this.onChange(RichUtils.toggleLink(editorState, selection, null));
//       return 'handled';
//     }
//     const content = editorState.getCurrentContent();
//     const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
//     const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
//     const entityKey = contentWithEntity.getLastCreatedEntityKey();
//     this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
// }

// onURLChange = e => this.setState({ urlValue: e.target.value });

// focus = () => this.refs.editor.focus();

// onAddImage = e => {
//     e.preventDefault();
//     const editorState = this.state.editorState;
//     const urlValue = window.prompt("Paste Image Link");
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//         "image",
//         "IMMUTABLE",
//         { src: urlValue }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(
//         editorState,
//         { currentContent: contentStateWithEntity },
//         "create-entity"
//     );
//     this.setState(
//         {
//             editorState: AtomicBlockUtils.insertAtomicBlock(
//                 newEditorState,
//                 entityKey,
//                 " "
//             )
//         },
//         () => {
//             setTimeout(() => this.focus(), 0);
//         }
//     );
// };

//   render() {

//     const html = convertToHTML({
//         styleToHTML: (style) => {
//           if (style === 'BOLD') {
//             return <span style={{color: 'blue'}} />;
//           }
//         },
//         blockToHTML: (block) => {
//           if (block.type === 'PARAGRAPH') {
//             return <p />;
//           }
//         },
//         entityToHTML: (entity, originalText) => {
//           if (entity.type === 'LINK') {
//             return <a href={entity.data.url}>{originalText}</a>;
//           }
//           return originalText;
//         }
//       })(this.state.editorState.getCurrentContent());

//     return (
//       <div>
//           <div className="Toolbar">
//               <BlockStyleToolbar
//         editorState={this.state.editorState}
//         onToggle={this.toggleBlockType}
//         />
//             <div className="Inline-Toolbar">
//                 <button onClick={() => this.onStyleClick('UNDERLINE')}><FontAwesomeIcon icon="underline" /></button>
//                 <button onClick={() => this.onStyleClick('BOLD')}>
//                 <FontAwesomeIcon icon="bold" />
//                 </button>
//                 <button onClick={() => this.onStyleClick('ITALIC')}>
//                 <FontAwesomeIcon icon="italic" />
//                 </button>
//                 <button id="link_url" onClick={this.onAddLink} className="add-link">
//         					<i className="material-icons">attach_file</i>
//         		</button>
//                 <button className="inline styleButton" onClick={this.onAddImage}>
//         					<i class="material-icons">image</i>
//         				</button>
//             </div>
//           </div>
//         <div className="Editor">
//             <Editor
//             blockStyleFn={getBlockStyle}
//               editorState={this.state.editorState}
//               onChange={this.onChange}
//               handleKeyCommand={this.handleKeyCommand}
//               plugins={this.addLinkPluginPlugin}
//               blockRendererFn={mediaBlockRenderer}
//               ref="editor"
//             />
//         </div>
//         {html}
//       </div>
//     );
//   }
// }

// export default myEditor;

import React, { Component } from "react";
import { Editor, EditorState, RichUtils, AtomicBlockUtils, CompositeDecorator } from "draft-js";
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";
import { convertToHTML } from 'draft-convert';
import './myEditor.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class myEditor extends Component {

     decorator = new CompositeDecorator([
        {
          strategy: findLinkEntities,
          component: Link,
        }])
    
        state = {
          editorState: EditorState.createEmpty(this.decorator),
          showURLInput: false,
          urlValue: '',
        };

      focus = () => this.refs.editor.focus();
      onChange = (editorState) => this.setState({editorState});
      onURLChange = (e) => this.setState({urlValue: e.target.value});
    
      promptForLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          const contentState = editorState.getCurrentContent();
          const startKey = editorState.getSelection().getStartKey();
          const startOffset = editorState.getSelection().getStartOffset();
          const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
          const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    
          let url = '';
          if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
          }
    
          this.setState({
            showURLInput: true,
            urlValue: url,
          }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
          });
        }
      }
    
      confirmLink(e) {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',
          {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
          editorState: RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
          setTimeout(() => this.refs.editor.focus(), 0);
        });
      }
    
      onLinkInputKeyDown(e) {
        if (e.which === 13) {
          this._confirmLink(e);
        }
      }
    
      removeLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          this.setState({
            editorState: RichUtils.toggleLink(editorState, selection, null),
          });
        }
      }
    
      render() {

        

        let urlInput;
        if (this.state.showURLInput) {
          urlInput =
            <div>
              <input
                onChange={this.onURLChange}
                ref="url"
                type="text"
                value={this.state.urlValue}
                onKeyDown={this.onLinkInputKeyDown}
                />
              <button onMouseDown={this.confirmLink}>
                Confirm
              </button>
            </div>;
        }
    
        return (
          <div>
            <div style={{marginBottom: 10}}>
              Select some text, then use the buttons to add or remove links
              on the selected text.
            </div>
            <div>
              <button
                onMouseDown={() => this.promptForLink}
                style={{marginRight: 10}}>
                Add Link
              </button>
              <button onMouseDown={this.removeLink}>
                Remove Link
              </button>
            </div>
            {urlInput}
            <div onClick={this.focus}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                placeholder="Enter some text..."
                ref="editor"
                />
            </div>
          </div>
        );
      }
    }
    
    function findLinkEntities(contentBlock, callback, contentState) {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
          );
        },
        callback
      );
    }
    
    const Link = (props) => {
      const {url} = props.contentState.getEntity(props.entityKey).getData();
      return (
        <a href={url}>
          {props.children}
        </a>
      );
    };



















//     state = {
//             editorState: EditorState.createEmpty()
//           };

// focus = () => this.refs.editor.focus();
// onChange = (editorState) => this.setState({editorState});

// handleKeyCommand = (command) => {
//   const {editorState} = this.state;
//   const newState = RichUtils.handleKeyCommand(editorState, command);
//   if (newState) {
//     this.onChange(newState);
//     return true;
//   }
//   return false;
// }
// onTab = (e) => {
//   const maxDepth = 4;
//   this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
// }
// toggleBlockType = (blockType) => {
//   this.onChange(
//     RichUtils.toggleBlockType(
//       this.state.editorState,
//       blockType
//     )
//   );
// }
// toggleInlineStyle = (inlineStyle) => {
//   this.onChange(
//     RichUtils.toggleInlineStyle(
//       this.state.editorState,
//       inlineStyle
//     )
//   );
// }

// onAddImage = e => {
//     e.preventDefault();
//     const editorState = this.state.editorState;
//     const urlValue = window.prompt("Paste Image Link");
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//         "image",
//         "IMMUTABLE",
//         { src: urlValue }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(
//         editorState,
//         { currentContent: contentStateWithEntity },
//         "create-entity"
//     );
//     this.setState(
//         {
//             editorState: AtomicBlockUtils.insertAtomicBlock(
//                 newEditorState,
//                 entityKey,
//                 " "
//             )
//         },
//         () => {
//             setTimeout(() => this.focus(), 0);
//         }
//     );
// };
// promptForLink = (e) => {
//     e.preventDefault();
//     const selection = this.state.editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       const contentState = this.state.editorState.getCurrentContent();
//       const startKey = this.state.editorState.getSelection().getStartKey();
//       const startOffset = this.state.editorState.getSelection().getStartOffset();
//       const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
//       const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

//       let url = '';
//       if (linkKey) {
//         const linkInstance = contentState.getEntity(linkKey);
//         url = linkInstance.getData().url;
//       }

//       this.setState({
//         showURLInput: true,
//         urlValue: url,
//       }, () => {
//         setTimeout(() => this.focus(), 0);
//       });
//     }
//   }

//   onURLChange = e => this.setState({ urlValue: e.target.value });

//   confirmLink = (e) => {
//     e.preventDefault();
//     const {editorState, urlValue} = this.state;
//     const contentState = this.state.editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       'LINK',
//       'MUTABLE',
//       {url: urlValue}
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
//     this.setState({
//       editorState: RichUtils.toggleLink(
//         newEditorState,
//         newEditorState.getSelection(),
//         entityKey
//       ),
//       showURLInput: false,
//       urlValue: '',
//     }, () => {
//       setTimeout(() => this.refs.editor.focus(), 0);
//     });
//   }

//   onLinkInputKeyDown = (e) => {
//     if (e.which === 13) {
//       this._confirmLink(e);
//     }
//   }

//   removeLink = (e) => {
//     e.preventDefault();
//     const selection = this.state.editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       this.setState({
//         editorState: RichUtils.toggleLink(this.state.editorState, selection, null),
//       });
//     }
//   }

//   render() {
//     let urlInput;
//     if (this.state.showURLInput) {
//       urlInput =
//         <div>
//           <input
//             onChange={this.onURLChange}
//             ref="url"
//             type="text"
//             value={this.state.editorState.urlValue}
//             onKeyDown={this.onLinkInputKeyDown}
//             />
//           <button onMouseDown={this.confirmLink}>
//             Confirm
//           </button>
//         </div>;
//     }
//     const html = convertToHTML({
//                 styleToHTML: (style) => {
//                     console.log("style")
//                   if (style === 'BOLD') {
//                     return <span style={{color: 'blue'}} />;
//                   }
//                 },
//                 blockToHTML: (block) => {
//                     console.log(block)
//                   if (block.type === 'PARAGRAPH') {
//                     return {element: <p />, empty: <br />};
//                   }
//                   if (block.type === "atomic") {
//                     return {
//                         start: '',
//                         end: '',
//                 };
//                   }
//                 },
//                 entityToHTML: (entity, originalText) => {
//                     console.log(entity)
//                   if (entity.type === 'LINK') {
//                     return <a href={entity.data.url}>{originalText}</a>;
//                   }
//                   if (entity.type === "image") {
//                       return <img src={entity.data.src} />;
//                   }
//                   return originalText;
//                 }
//               })(this.state.editorState.getCurrentContent());

//     // If the user changes block type before entering any text, we can
//     // either style the placeholder or hide it. Let's just hide it now.
//     let className = 'RichEditor-editor';
//     var contentState = this.state.editorState.getCurrentContent();
//     if (!contentState.hasText()) {
//       if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//         className += ' RichEditor-hidePlaceholder';
//       }
//     }

//     return (
//       <div className="RichEditor-root">
//         <div className="Toolbar">
//             <div className="Header">

//             </div>
//             <div className="Buttons">
//             <div className="Controls">
//                 <BlockStyleControls
//                   editorState={this.state.editorState}
//                   onToggle={this.toggleBlockType}
//                 />
//             </div>
//             <div className='Controls'>
//                 <InlineStyleControls
//                   editorState={this.state.editorState}
//                   onToggle={this.toggleInlineStyle}
//                 />
//             </div>
//             <button className="inline styleButton" onClick={this.onAddImage}>
//             <FontAwesomeIcon icon="images" />
//          				</button>
//                          <button className="inline styleButton" onClick={this.onAddImage}>
//             <FontAwesomeIcon icon="link" />
//          				</button>
//                          <button
//             onMouseDown={this.promptForLink}
//             >
//             Add Link
//           </button>
//           <button onMouseDown={this.removeLink}>
//             Remove Link
//           </button>
//           {urlInput}
//             </div>
//         </div>
//         <div className={className} onClick={this.focus}>
//           <Editor
//             blockStyleFn={getBlockStyle}
//             blockRendererFn={mediaBlockRenderer}
//             customStyleMap={styleMap}
//             editorState={this.state.editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             onChange={this.onChange}
//             onTab={this.onTab}
//             ref="editor"
//             spellCheck={true}
//           />
//         </div>
//         {html}
//       </div>
//     );
//   }
// }

// // Custom overrides for "code" style.
// const styleMap = {
//     CODE: {
//       backgroundColor: 'rgba(0, 0, 0, 0.05)',
//       fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//       fontSize: 16,
//       padding: 2,
//     },
//   };
  
//   function getBlockStyle(block) {
//     switch (block.getType()) {
//       case 'blockquote': return 'RichEditor-blockquote';
//       default: return null;
//     }
//   }
  
//   class StyleButton extends Component {
//     constructor() {
//       super();
//       this.onToggle = (e) => {
//         e.preventDefault();
//         this.props.onToggle(this.props.style);
//       };
//     }
  
//     render() {
//       let className = 'Button';
//       if (this.props.active) {
//         className += ' Button-Active';
//       }
  
//       return (
//         <span className={className} onMouseDown={this.onToggle}>
//           {this.props.label}
//         </span>
//       );
//     }
//   }
  
//   const BLOCK_TYPES = [
//     {label: 'H1', style: 'header-one'},
//     {label: 'H2', style: 'header-two'},
//     {label: 'H3', style: 'header-three'},
//     {label: 'P1', style: 'paragraph'},
//     //{label: 'P2', style: 'paragraph2'},
//     //{label: 'P3', style: 'paragraph3'},
//     {label: <FontAwesomeIcon icon="list-ul" />, style: 'unordered-list-item'},
//     {label: <FontAwesomeIcon icon="list-ol" />, style: 'ordered-list-item'},
//   ];
  
//   const BlockStyleControls = (props) => {
//     const {editorState} = props;
//     const selection = editorState.getSelection();
//     const blockType = editorState
//       .getCurrentContent()
//       .getBlockForKey(selection.getStartKey())
//       .getType();
  
//     return (
//       <div className="RichEditor-controls">
//         {BLOCK_TYPES.map((type, index) =>
//           <StyleButton
//             key={type.label + index}
//             active={type.style === blockType}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//           />
//         )}
//       </div>
//     );
//   };
  
//   var INLINE_STYLES = [
//     {label: <FontAwesomeIcon icon="bold" />, style: 'BOLD'},
//     {label: <FontAwesomeIcon icon="italic" />},
//     {label: <FontAwesomeIcon icon="underline" />, style: 'UNDERLINE'},
//   ];
  
//   const InlineStyleControls = (props) => {
//     var currentStyle = props.editorState.getCurrentInlineStyle();
//     return (
//       <div className="RichEditor-controls">
//         {INLINE_STYLES.map((type, index) =>
//           <StyleButton
//             key={type.label + index}
//             active={currentStyle.has(type.style)}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//           />
//         )}
//       </div>
//     );
//  };

export default myEditor;
