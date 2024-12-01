#!/usr/bin/env ts-node
import { Command } from "commander";
import { existsSync, mkdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { createDay, padWithZero } from "./utils";

const program = new Command("aoc");

program
  .command("run")
  .description("Run day solution")
  .argument("<day:number>", "Day to run")
  .option("-p, --part <part:number>", "Part of the day solution to run", "1")
  .option(
    "-f, --file <file:string>",
    "Input file. If missing, the day input file is used instead",
    "input.txt"
  )
  .action((day, { part, file }) => {
    const path = `../solutions/${padWithZero(day)}`;
    const { runSolution } = require(path);
    const text = readFileSync(resolve(__dirname, `${path}/${file}`), "utf8");
    console.log("solution: ", runSolution(text, part === "2"));
  });

program
  .command("new")
  .description("Create a new day solution folder")
  .argument("<day:number>", "Day of the solution")
  .action((day) => {
    const path = `../solutions/${padWithZero(day)}`;
    if (existsSync(resolve(__dirname, path))) {
      console.log("Folder already exists");
    } else {
      mkdirSync(resolve(__dirname, path));
      createDay(day);
      console.log("New solution folder created");
    }
  });

program.parse();
