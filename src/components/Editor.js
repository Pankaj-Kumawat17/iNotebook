import React, { useEffect, useRef, useState } from 'react'
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python'
import 'codemirror/mode/clike/clike'
import 'codemirror/theme/material-ocean.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/keymap/sublime'
import ACTIONS from '../Actions';
import axios from 'axios';
import * as qs from 'qs';
// import handleClick from './Codeget';
// const axios = require("axios");
// const qs = require("qs");


// const axios = require('axios');

const Editor = (props) => {
  const { socketRef, roomId, onCodeChange, Mode } = props;
  const editorRef = useRef(null);
  const compileRef = useRef(null);

  const [code, setcode] = useState("")

  const handleClick = async () => {
    console.log("Button was clicked");
    let option = document.getElementById("langSelect").value;
    let input = document.getElementById("inputText").value;
    let output = document.getElementById("outputText");
    let data = qs.stringify({
      language: option,
      version:"latest",
      code: code,
      input: input,
    });
    let config = {
      method: 'POST',
      url: "https://online-code-compiler.p.rapidapi.com/v1/",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '22d14fe088msh17c1c538fae1a60p1034e4jsnc93757d5bc71',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log(response.data);
      output.value = (JSON.stringify(response.data.output));
    } catch (error) {
      console.log(error);
    }

  }


  

  useEffect(() => {

    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById("realTimeEditor"), {
        value: { code },
        mode: { name: "text/x-c++src" },
        theme: 'material-ocean',
        autoCloseTag: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineNumbers: true,
        matchTags: true
      });

      let option = document.getElementById("langSelect").value;
      document.getElementById("langSelect").addEventListener("change", () => {
        if (option === "java") {
          editorRef.current.setOption("mode", "text/x-java");
        }
        else if (option === "cpp17") {
          editorRef.current.setOption("mode", "text/x-c++src");
        }
        else if (option === "python3") {
          editorRef.current.setOption("mode", "text/x-python");
        }
        
      })



      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
            option,
          });
        }

      });




    };
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });

    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    }

  }, [socketRef.current])


  return (
    <>
      <div className="topBar row justify-content-between" >
        <div className="col-auto choice my-auto">
          <label className="visually-hidden" htmlFor="autoSizingSelect">Preference</label>
          <select className="form-select" defaultValue={"Choose"} id="langSelect">
            <option value="cpp17">C++</option>
            <option value="java">Java</option>
            <option value="python3">Python</option>
          </select>
        </div>
      </div>
      <textarea id="realTimeEditor" onChange={(editor, change) => { setcode(editor.getValue()) }}></textarea>
    </>
  )
}

export default Editor