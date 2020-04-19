import React from "react";
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw,EditorState,ContentState  } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "./index.less"
class RichTextEditor extends React.Component{
	constructor(props) {
	  super(props);
	  this.state={
	  	editorState:EditorState.createEmpty()
	  }
	}
	onEditorStateChange=(editorState)=>{
    this.setState({
      editorState,
    });
  };
  uploadImageCallBack=()=>{

  }
  gethtml=()=>{
  	const { editorState } = this.state;
    const htmlformat=draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return htmlformat;
  }
  // const html = '<p>Hey this <strong>editor</strong> rocks</p>';
  //   const contentBlock = htmlToDraft(html);
  //   if (contentBlock) {
  //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //     const editorState = EditorState.createWithContent(contentState);
  //     this.state = {
  //       editorState,
  //     };
  //   }
    // value={}
	render(){
		const { editorState } = this.state;
      
		return(
        <div>
        <Editor
  toolbar
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
   toolbar={{
    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
  }}
/>
        </div>
     
			)
	}
}
export default RichTextEditor