#!/usr/bin/env node
// import {argv} from "node:process"
const argv = require("node:process");
const fs = require("fs")

const CreateTask = () => {
    let allTask = loadTasks();
    console.log(typeof(allTask))
    let newTaskId;
    if (allTask.length == 0) {
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
        status:"in progress",
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
const listDone = () =>{
    let typeOfListing = process.argv[3];
    try{
        let fileContent = fs.readFileSync('task.json', 'utf-8');
        fileContent= JSON.parse(fileContent);
        for (let i  = 0; i  < allTask.length; i ++) {
            if (allTask[i].status == "done") {
                console.log(alltask[i])
            }
        }
        if (taskIndex != -1) {
            allTask.splice(taskIndex,1)
        }else{
            console.log(`Error: task with ID:${taskToDelete} not found. `)
        }
        if (typeOfListing == "list-done") {
            
        }
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

const  loadTasks=  () => {
    try{
        const fileContent = fs.readFileSync('task.json', 'utf-8');
        return JSON.parse(fileContent);
    }catch (error) {
        if (error.code === 'ENOENT') {
            console.log("the is no task's");
            return [];
        }else{
            console.log("Error related to task file: ", error.message);
            return [];
        }
    }
}

const deleteTask = () => {
    let allTask = loadTasks();
    let taskIndex = -1;
    let taskToDelete = process.argv[3]
    for (let i  = 0; i  < allTask.length; i ++) {
        if (allTask[i].id == taskToDelete) {
            taskIndex = i;
        }
    }
    if (taskIndex != -1) {
        allTask.splice(taskIndex,1)
    }else{
        console.log(`Error: task with ID:${taskToDelete} not found. `)
    }

    const updatedJsonString = JSON.stringify(allTask, null, 2);
    fs.writeFileSync('task.json', updatedJsonString, 'utf-8');
}
const updateTask = () => {
    let allTask = loadTasks();
    let taskIndex = -1;
    let taskToUpdate = process.argv[3];
    for (let i  = 0; i  < allTask.length; i ++) {
        if (allTask[i].id == taskToUpdate) {
            taskIndex = i;
        }
    }
    if (taskIndex != -1) {
        allTask[taskIndex].description= process.argv[4];
        allTask[taskIndex].updatedAt= new Date().toISOString();
    }else{
        console.log(`Error: task with ID:${taskToDelete} not found. `)
    }

    const updatedJsonString = JSON.stringify(allTask, null, 2);
    fs.writeFileSync('task.json', updatedJsonString, 'utf-8');

}
const markTask = () => {
    let allTask;
    let markType = process.argv[2];

    try{
        const fileContent = fs.readFileSync('task.json', 'utf-8');
        allTask = JSON.parse(fileContent);
    }catch (error) {
        if (error.code === 'ENOENT') {
            console.log("the is no task's");
            allTask = []
        }else{
            console.log("Error related to task file: ", error.message);
            return;
        }
    }
    let taskIndex = -1;
    let taskToMarkDone = process.argv[3];
    for (let i  = 0; i  < allTask.length; i ++) {
        if (allTask[i].id == taskToMarkDone) {
            taskIndex = i;
        }
    }
    if (taskIndex != -1 && markType == "mark-done") {
        allTask[taskIndex].status= "done";
        allTask[taskIndex].updatedAt= new Date().toISOString();
    }else if(taskIndex != -1 && markType == "mark-in-progress"){
        allTask[taskIndex].status= "in progress";
        allTask[taskIndex].updatedAt= new Date().toISOString();
    }else{
        console.log(`Error: task with ID:${taskToDelete} not found. `)
    }

    const updatedJsonString = JSON.stringify(allTask, null, 2);
    fs.writeFileSync('task.json', updatedJsonString, 'utf-8');

}

if (process.argv[2] == "create") {
    CreateTask();
}
if (process.argv[2] == "delete") {
    deleteTask();
}
if (process.argv[2] == "update") {
    updateTask();
}
if (process.argv[2] == "list-all") {
    listAll();
}
if (process.argv[2] == "list-done") {
    listDone();
}
if (process.argv[2] == "mark-done" ||process.argv[2] == "mark-in-progress") {
    markTask();
}
