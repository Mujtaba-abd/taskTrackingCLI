#!/usr/bin/env node
// import {argv} from "node:process"
const argv = require("node:process");
const fs = require("fs")

const CreateTask = () => {
    let allTask;

    try{
        const fileContent = fs.readFileSync('task.json', 'utf-8');
        allTask = JSON.parse(fileContent);
    }catch (error) {
        if (error.code === 'ENOENT') {
        allTask = [];
        }else{
            console.log("Error related to task file: ", error.message);
            return;
        }
    }
    let newTaskId;
    if (allTask.length === 0) {
        newTaskId = 1;
    }else{
        const maxTaskId = Math.max(...allTask.map(task => task.id));
        newTaskId = maxTaskId+1;
    }
    const newTaskDescription = process.argv[3];
    const now = new Date().toISOString();

    const newTask = {
        id: newTaskId,
        description: newTaskDescription,
        status:"todo",
        createdAt: now,
        updatedAt: now
    }
    allTask.push(newTask);
    const updatedJsonString = JSON.stringify(allTask, null, 2);
    fs.writeFileSync('task.json', updatedJsonString, 'utf-8');
    console.log(`you have added a task successfully (ID: ${newTaskId})`)
    };
    const listAll = () =>{
    try{
        let fileContent = fs.readFileSync('task.json', 'utf-8');
        fileContent= JSON.parse(fileContent);
        console.log(fileContent)
    }catch (error) {
        if (error.code === 'ENOENT') {
            console.log("the is no task's");
        }else{
            console.log("Error related to task file: ", error.message);
            return;
        }
    }

    }

if (process.argv[2] == "create") {
    CreateTask();
}
if (process.argv[2] == "list-all") {
    listAll();
}
