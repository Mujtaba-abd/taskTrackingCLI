# taskTrackingCLI

Project URL: https://roadmap.sh/projects/task-tracker

## Geting started 

```shell
# list the commands
task-cli help

# adding tasks
task-cli create "go to the store"

# updating and deleting tasks
task-cli update 1 "go to the store the big one"
task-cli delete 1

# marking task done or in progress
task-cli mark-done 1
task-cli mark-in-progress 1 

# listing all tasks 
task-cli list-all

# listing task by status 
task-cli list-done
task-cli list-in-progress
task-cli list-todo
```
