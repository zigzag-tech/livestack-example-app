#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import prompts from "prompts";

const main = async () => {
  const { name, language } = await prompts([
    {
      type: "text",
      name: "name",
      message: "Project name?",
    },
    {
      type: "select",
      name: "language",
      message: "Initialize with JavaScript or TypeScript?",
      choices: [
        { title: "JavaScript", value: "JavaScript" },
        { title: "TypeScript", value: "TypeScript" },
      ],
    },
  ]);

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
