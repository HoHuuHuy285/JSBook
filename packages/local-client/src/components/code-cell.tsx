import "./code-cell.css";
import "./preview.css";
import { useEffect, useRef } from "react";
import CodeEditor from "./code-editor";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
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

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const iframeRef = useRef<any>();
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // Trigger build with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => clearTimeout(timer);
  }, [cell.content, cell.id, createBundle]);

  // Handle iframe update
  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = html;

    const timer = setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(bundle?.code || "", "*");
    }, 50); // slight delay after srcdoc reset

    return () => clearTimeout(timer);
  }, [bundle?.code]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <div
          className="progress-wrapper"
          style={{ flex: 1, position: "relative" }}
        >
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <>
              <iframe
                title="preview"
                ref={iframeRef}
                sandbox="allow-scripts"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
              {bundle.err && <div className="preview-error">{bundle.err}</div>}
            </>
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
