#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import inquirer from "inquirer";

const main = async () => {
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Project name?",
  });

  const { language } = await inquirer.prompt({
    type: "list",
    name: "language",
    message: "Initialize with JavaScript or TypeScript?",
    choices: ["JavaScript", "TypeScript"],
  });

  const destination = path.join(process.cwd(), name);
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "..",
    "template",
    language.toLowerCase()
  );

  fs.cpSync(templateDir, destination, { recursive: true });

  console.log(`Project created at ${destination} using ${language}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
