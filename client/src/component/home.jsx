import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const CSS_MODE = 'css';
const JS_MODE = 'javascript';
const HTML_MODE = 'html';

const defaultValueCSS = `/* CSS goes here */`;
const defaultValueJS = `/* JavaScript goes here */`;
const defaultValueHTML = `<!DOCTYPE html>\n<html>\n  <head>\n  </head>\n  <body>\n  </body>\n</html>\n`;

const CSS_LANGUAGE = 'css';
const JS_LANGUAGE = 'javascript';
const HTML_LANGUAGE = 'html';

export default function Home(){
  const [cssValue, setCssValue] = React.useState(defaultValueCSS);
  const [jsValue, setJsValue] = React.useState(defaultValueJS);
  const [htmlValue, setHtmlValue] = React.useState(defaultValueHTML);
  const [consoleOutput, setConsoleOutput] = React.useState([]); // State to store console output

  const handleCssChange = (value) => {
    setCssValue(value);
  };

  const handleJsChange = (value) => {
    setJsValue(value);
  };

  const handleHtmlChange = (value) => {
    setHtmlValue(value);
  };

  const handleRunCode = () => {
    try {
      const iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      const iframeDocument = iframe.contentDocument;
      
      // Write HTML content into the iframe
      iframeDocument.open();
      iframeDocument.write(htmlValue);
      iframeDocument.close();

      // Inject CSS and JS into the iframe
      const styleTag = iframeDocument.createElement('style');
      styleTag.innerHTML = cssValue;
      iframeDocument.head.appendChild(styleTag);

      const scriptTag = iframeDocument.createElement('script');
      scriptTag.innerHTML = jsValue;
      iframeDocument.body.appendChild(scriptTag);

      // Listen for console messages from the iframe
      iframe.contentWindow.console.log = (...args) => {
        setConsoleOutput(prevOutput => [...prevOutput, args]);
      };

      // Clean up the iframe
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>CSS Editor</h2>
        <MonacoEditor
          height="50vh"
          language={CSS_LANGUAGE}
          value={cssValue}
          onChange={handleCssChange}
        />
      </div>
      <div>
        <h2>JavaScript Editor</h2>
        <MonacoEditor
          height="50vh"
          language={JS_LANGUAGE}
          value={jsValue}
          onChange={handleJsChange}
        />
      </div>
      <div>
        <h2>HTML Editor</h2>
        <MonacoEditor
          height="50vh"
          language={HTML_LANGUAGE}
          value={htmlValue}
          onChange={handleHtmlChange}
        />
      </div>
      <button onClick={handleRunCode}>Run Code</button> {/* Button to run the code */}
      <div>
        <h2>Console Output</h2>
        <div>
          {consoleOutput.map((log, index) => (
            <div key={index}>{JSON.stringify(log)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
