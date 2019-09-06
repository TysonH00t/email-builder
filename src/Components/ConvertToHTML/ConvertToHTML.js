import React, { Component } from "react";

import { connect } from "react-redux";

import { convertToHTML } from "draft-convert";

class ConvertToHTML extends Component {
  render() {

    let innerText = ('' + this.props.Secs.map((section, Sindex) =>
    '<td> <div align=center> <table cellspacing=0 cellpadding=0> <tr> <td width=640> <table border=0 cellspacing=0 cellpadding=0 width=100% style="background: ' + this.props.Secs[Sindex].backgroundColor + ';"> <tr> <td width=640> <table border=0 cellspacing=0 cellpadding=0 align=left width=640> <tr>' +
    this.props.Secs[Sindex].content.map((content, Cindex) =>
  
    this.props.Secs[Sindex].content[Cindex].content.editorState == undefined ? null : ('<td width=' +
        + (this.props.Secs[Sindex].content[Cindex].margin ? this.props.Secs[Sindex].width[Cindex] : (this.props.Secs[Sindex].width[Cindex] - 50)).toString() 
       + ' valign=middle align=left style="padding: ' 
        + (this.props.Secs[Sindex].content[Cindex].margin ? "0" : "25px" )
       + ';">' +
        (convertToHTML({
          styleToHTML: style => {
            if (style === "BOLD") {
              return <strong />;
            }
            if (style === "ITALIC") {
              return <em />;
            }
            if (style === "UNDERLINE") {
              return <span style={{ textDecoration: 'underline' }} />;
            }
            if (style === "blue") {
              return <span style={{ color: "#0078D7" }} />;
            }
            if (style === "white") {
              return <span style={{ color: "white" }} />;
            }
          },
          blockToHTML: block => {
            if (block.type === "header-one") {
              return {
                start:
                  '<h1 style="margin: 0px; font-size:37px; font-family: &#39;Segoe UI&#39; ; color: #505050;text-align: ' +
                  this.props.Secs[Sindex].content[Cindex].alignment +
                  ';">',
                end: "</h1>",
                empty: ""
              };
            }
            if (block.type === "header-two") {
              return {
                start:
                  '<h2 style="margin: 0px; font-size:28px; font-family: &#39;Segoe UI&#39; ; color: #505050;text-align: ' +
                  this.props.Secs[Sindex].content[Cindex].alignment +
                  ';">',
                end: "</h2>",
                empty: ""
              };
            }
            if (block.type === "header-three") {
              return {
                start:
                  '<h3 style="margin: 0px; font-size:20px; font-family: &#39;Segoe UI&#39; ; color: #505050;text-align: ' +
                  this.props.Secs[Sindex].content[Cindex].alignment +
                  ';">',
                end: "</h3>",
                empty: ""
              };
            }
            if (block.type === "paragraph") {
              return {
                start:
                  '<p style="margin: 0px; font-size:16px; font-family: &#39;Segoe UI&#39; ; color: #505050;text-align: ' +
                  this.props.Secs[Sindex].content[Cindex].alignment +
                  ';">',
                end: "</p>",
                empty: ""
              };
            }
            if (block.type === "unordered-list-item") {
              return {
                start:
                  '<li style="margin: 0px; font-size:16px; font-family: &#39;Segoe UI&#39; ; color: #505050;">',
                end: "</li>",
                empty: "",
                nest: <ul />
              };
            }
            if (block.type === "ordered-list-item") {
                return {
                  start:
                    '<li style="margin: 0px; font-size:16px; font-family: &#39;Segoe UI&#39; ; color: #505050;">',
                  end: "</li>",
                  empty: "",
                  nest: <ol />
                };
              }
            if (block.type === "unstyled") {
              return {
                start:
                  '<p style="margin: 0px; font-size:16px; font-family: &#39;Segoe UI&#39; ; color: #505050;text-align:' +
                  this.props.Secs[Sindex].content[Cindex].alignment +
                  '">',
                end: "</p>",
                empty: ""
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
            if (entity.type === "LINK") {
              return <a href={entity.data.url}>{originalText}</a>;
            }
            if (entity.type === "image") {
              return <img alt="" src={entity.data.src} />;
            }
            return originalText;
          }
        })(
          this.props.Secs[Sindex].content[
            Cindex
          ].content.editorState.getCurrentContent()
        )) 
        +
        '</td>'
    )
  ).join('') + '</tr> </table> </td> </tr>      </table> </td> </tr> </table>      </div> </td> </tr>'
).join(''));

    let text = ('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"    "http://www.w3.org/TR/html4/loose.dtd"> <html> <head>    <meta name="viewport" content="width=device-width, initial-scale=1,    maximum-scale=1, user-scalable=0" /> <meta    http-equiv="Content-Type" content="text/html; charset=UTF-8" />    <style> /* Font Definitions */ @font-face { font-family:    "Cambria Math"; panose-1: 2 4 5 3 5 4 6 3 2 4; mso-font-charset: 0;    mso-generic-font-family: roman; mso-font-pitch: variable;    mso-font-signature: 3 0 0 0 1 0;  } @font-face { font-family:    Calibri; panose-1: 2 15 5 2 2 2 4 3 2 4; mso-font-charset: 0;    mso-generic-font-family: swiss; mso-font-pitch: variable;    mso-font-signature: -536859905 -1073732485 9 0 511 0;  } @font-face    { font-family: "Segoe UI"; panose-1: 2 11 5 2 4 2 4 2 2 3;    mso-font-charset: 0; mso-generic-font-family: swiss; mso-font-pitch:    variable; mso-font-signature: -469750017 -1073683329 9 0 511 0;  }    @font-face { font-family: "Segoe UI Light"; panose-1: 2 11 5 2 4 2    4 2 2 3; mso-font-charset: 0; mso-generic-font-family: swiss;    mso-font-pitch: variable; mso-font-signature: -469750017 -1073683329 9 0    511 0;  } /* Style Definitions */ /* @media screen and    (max-width:600px) { table { width: 100% !important; border: 0    !important;  } td { width: 100% !important;  } .main td    { width: 100% !important; height: auto !important; padding-top: 0px    !important;  } .mainHead td { display: block !important;  }    .mainHead img { height: auto !important; max-width: 640px    !important; width: 100% !important;  } .borderRight {    border-right: #0078D7 10px solid !important;  }  } */    p.MsoNormal, li.MsoNormal, div.MsoNormal { mso-style-unhide: no;    mso-style-qformat: yes; mso-style-parent: ""; margin: 0in;    mso-pagination: widow-orphan; font-size: 12.0pt; mso-fareast-font-family: Calibri; mso-fareast-theme-font:    minor-latin;  } a:link, span.MsoHyperlink { mso-style-noshow:    yes; mso-style-priority: 99; color: #0078D1; text-decoration: underline;    text-underline: single;  } a:visited, span.MsoHyperlinkFollowed    { mso-style-noshow: yes; mso-style-priority: 99; color: #0078D1;    text-decoration: underline; text-underline: single;  } p {    mso-style-noshow: yes; mso-style-priority: 99; mso-margin-top-alt: auto;    margin-right: 0in; mso-margin-bottom-alt: auto; margin-left: 0in;    mso-pagination: widow-orphan; font-size: 12.0pt; mso-fareast-font-family: Calibri; mso-fareast-theme-font:    minor-latin;  } p.msonormal0, li.msonormal0, div.msonormal0 {    mso-style-name: msonormal; mso-style-noshow: yes; mso-style-priority:    99; mso-style-unhide: no; mso-margin-top-alt: auto; margin-right: 0in;    mso-margin-bottom-alt: auto; margin-left: 0in; mso-pagination:    widow-orphan; font-size: 12.0pt;     mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin;     } span.EmailStyle19 { mso-style-type: personal-compose;    mso-style-noshow: yes; mso-style-unhide: no;     mso-no-proof: yes;  } .MsoChpDefault { mso-style-type:    export-only; mso-default-props: yes; font-size: 10.0pt;    mso-ansi-font-size: 10.0pt; mso-bidi-font-size: 10.0pt;  } @page    WordSection1 { size: 8.5in 11.0in; margin: 0in 0in 0in 0in;    mso-header-margin: 0in; mso-footer-margin: 0in; mso-paper-source: 0;     } div.WordSection1 { page: WordSection1;  } table {    border-collapse: collapse; border: 0; margin: 0; padding: 0;    vertical-align: middle;  } </style> <!--[if gte mso 10]>    <style> /* Style Definitions */ table.MsoNormalTable    {mso-style-name:"Table Normal"; mso-tstyle-rowband-size:0;    mso-tstyle-colband-size:0; mso-style-noshow:yes; mso-style-priority:99;    mso-style-parent:""; mso-padding-alt:0in 0pt 0in 0pt;    mso-para-margin:0in; mso-para-margin-bottom:.0pt;    mso-pagination:widow-orphan; font-size:10.0pt; border: 0;  } .ExternalClass{    width:100%;  } .ExternalClass, .ExternalClass p, .ExternalClass    span, .ExternalClass font, .ExternalClass td, .ExternalClass div{    line-height: 100%;  } table{ mso-table-lspace:0pt;    mso-table-rspace:0pt; border-collapse: collapse; border: 0; margin: 0;    padding: 0;  } table td { border-collapse: collapse; margin: 0;    padding: 0; border: 0;  } img{ -ms-interpolation-mode:bicubic;     } .button { border: none !important; padding: none !important;     } .cell { width: 123px !important;  } </style>    <![endif]--> <!--[if gte mso 9]><xml>    <o:shapedefaults v:ext="edit" spidmax="1026"/>    </xml><![endif]--> <!--[if gte mso 9]><xml>    <o:shapelayout v:ext="edit"> <o:idmap v:ext="edit"    data="1"/> </o:shapelayout></xml><![endif]-->    </head> <body style="margin: 0px !important; padding: 0px    !important;" bgcolor="#E3E3E3" lang=EN-US link="#0078D1"    vlink="#0078D1"> <custom name="opencounter" type="tracking">    <div class=WordSection1> <table border=0 cellspacing=0    cellpadding=0 width="100%" style="width:100.0%;background:#E3E3E3;"><tr> <td> <div align=center> <table cellspacing=0 cellpadding=0> <tr> <td width=640> <table border=0 cellspacing=0 cellpadding=0 width=100% style="background: white;"> <tr> <td width=640> <table border=0 cellspacing=0 cellpadding=0 align=left width=640> <tr>' + innerText + '</tr> </table> </td> </tr>      </table> </td> </tr> </table>      </div> </td> </tr></div></table> </div> </body> </html>')

    return (


        <button style={{marginTop: '50px'}} onClick={() => {navigator.clipboard.writeText(text)}}>Copy code to clipboard</button>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    Secs: state.sections
  };
};

export default connect(mapStateToProps)(ConvertToHTML);
