#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import { Command } from "commander";

const templates = [
  "typescript-speech-app",
  "typescript-backend-only",
  "typescript-setup-only",
  "typescript-live-counter",
];
const templateDefault = "typescript-setup-only";

const main = async () => {
  let projectDir: string | null = null;
  let template: string = templateDefault;

  const program = new Command();
  program
    .command("create-livestack")
    .argument("<project-directory>")
    .usage("<project-directory> [options]")
    .option(
      "--template [path-to-template]",
      `specify a template for the created project: ${templates.join(", ")}`,
      templateDefault
    )
    .action((projectDirName, options) => {
      projectDir = projectDirName;

      if (!templates.includes(options.template)) {
        console.error(
          `Invalid template. Using default template: ${templateDefault}`
        );
      } else {
        template = options.template;
      }
    })
    .parse(process.argv);

  if (!projectDir) {
    console.error("Project directory is required");
    return;
  }
  
  const destination = path.join(process.cwd(), projectDir);
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    "template",
    template
  );

  fs.cpSync(templateDir, destination, { recursive: true });

  console.log(`Project created at ${destination} using template ${template}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
