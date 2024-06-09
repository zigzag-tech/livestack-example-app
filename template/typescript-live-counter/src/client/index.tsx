import React from "react";
import ReactDOM from "react-dom/client";
import { useInput, useJobBinding, useOutput } from "@livestack/client";
import { INCREMENTER, incrementInput, incrementOutput } from "../common/defs";

function App() {
  const job = useJobBinding({
    specName: INCREMENTER,
  });

  const { last: currCount } = useOutput({
    tag: "default",
    def: incrementOutput,
    job,
  });
  const { feed } = useInput({ tag: "default", def: incrementInput, job });

  return (
    <div className="App">
      <button onClick={() => feed && feed({ action: "increment" })}>
        Click me
      </button>
      <div>{currCount?.data.count || `No count, click the button!`}</div>
      <div>Liveflow visualization (mock URL): </div>
      <a>https://live.dev/p/fw3fef4/vsfoos</a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
