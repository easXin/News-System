import React,{useEffect, useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewEditor(props) {
  const [editorState,setEditorState] = useState("")  
  return (
    
    <div>
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(editorState)=>setEditorState(editorState)}
            onBlur={()=>{
                // console.log()

                props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            }}
        />
    </div>
  )
}
