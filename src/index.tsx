import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
// import CodeCell from "./components/code-cell";
import { Provider } from "react-redux";
import { store } from "./state";
import TextEditor from "./components/text-editor";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

root.render(<App />);
