import "./preview.css";
import { useEffect, useRef, useState } from "react";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
    }
  }, [code]);

  const loadHandler = () => {
    iframe.current.contentWindow.postMessage(code, "*");
  };

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        onLoad={loadHandler}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
