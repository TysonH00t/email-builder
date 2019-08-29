import React, { Component } from 'react';

import { connect } from 'react-redux';

import { convertToHTML } from "draft-convert";

class ConvertToHTML extends Component {
    render() { 
        return ( 
            <div>
                {this.props.Secs.map((section,Sindex) => (
                    this.props.Secs[Sindex].content.map((content,Cindex) => (
          
                      this.props.Secs[Sindex].content[Cindex].content.editorState == undefined ? null : 
                        <p>
                      { convertToHTML({
                        styleToHTML: style => {
                          // if (style === "BOLD") {
                          //   return <strong />;
                          // }
                          // if (style === "ITALIC") {
                          //   return <em />;
                          // }
                          // if (style === "UNDERLINE") {
                          //   return <span style={{ textDecoration: 'underline' }} />;
                          // }
                          if (style === "blue") {
                            return <span style={{ color: '#0078D7' }} />;
                          }
                          if (style === "white") {
                            return <span style={{ color: 'white' }} />;
                          }
                        },
                        blockToHTML: block => {
                          console.log('block' + block.type)
                          if (block.type === "PARAGRAPH") {
                            console.log('paragraph')
                            return { element: <p />, empty: '' };
                          }
                          // if (block.type === "H1") {
                          //   return { element: <h1 />, empty: <br /> };
                          // }
                          // if (block.type === "H2") {
                          //   return { element: <h2 />, empty: <br /> };
                          // }
                          // if (block.type === "H3") {
                          //   return { element: <h3 />, empty: <br /> };
                          // }
                          if (block.type === "unstyled") {
                            return {
                              start: '<p>',
                              end: '</p>'
                            };
                          }
                          if (block.type === "atomic") {
                            return {
                              start: "",
                              end: ""
                            };
                          }
                        },
                        entityToHTML: (entity, originalText) => {
                          console.log(entity)
                          if (entity.type === "LINK") {
                            return <a href={entity.data.url}>{originalText}</a>;
                          }
                          if (entity.type === "image") {
                            return <img alt="" src={entity.data.src} />;
                          }
                          return originalText;
                        }
                      })(this.props.Secs[Sindex].content[Cindex].content.editorState.getCurrentContent())} </p>
                    ))
                    
                    ))}
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
      Secs: state.sections,
    }
  }

  
  export default connect(mapStateToProps)(ConvertToHTML);
