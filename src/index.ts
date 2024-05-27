#!/usr/bin/env ts-node

import path from "path";
import fs from "fs-extra";
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
  const templateDir = path.join(
    __dirname,
    "..",
    "template",
    language.toLowerCase()
  );

  fs.copySync(templateDir, destination);

  console.log(`Project created at ${destination} using ${language}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
