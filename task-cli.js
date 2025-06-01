#!/usr/bin/env node
// import {argv} from "node:process"
const argv = require("node:process")

function main(){
    console.log("hello this is a cli app")
    console.log(process.argv[2])
}

main()