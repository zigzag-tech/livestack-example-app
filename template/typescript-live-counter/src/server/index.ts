import { LiveEnv, JobSpec } from "@livestack/core";
import express from "express";
import ViteExpress from "vite-express";
import { INCREMENTER, incrementInput, incrementOutput } from "../common/defs";
import { initJobBinding } from "@livestack/gateway";
import bodyParser from "body-parser";

async function main() {
  const liveEnv = await LiveEnv.create({
    projectId: "live-counter",
  });

  const incrementSpec = JobSpec.define({
    liveEnv,
    name: INCREMENTER,
    input: incrementInput,
    output: incrementOutput,
  });

  const incrementWorker = incrementSpec.defineWorker({
    processor: async ({ input, output }) => {
      let counter = 0;
      for await (const _ of input) {
        counter += 1;
        await output.emit({
          count: counter,
        });
      }
    },
  });

  const app = express();
  app.use(bodyParser.json());
  const PORT = 3000;
  const server = ViteExpress.listen(app, PORT, () =>
    console.log(`Hello World server listening on http://localhost:${PORT}.`)
  );

  initJobBinding({
    liveEnv,
    httpServer: server,
    allowedSpecsForBinding: [incrementSpec],
  });
}

if (require.main === module) {
  main();
}
