#!/bin/bash
cd /root/model-manage
git pull

screen_name="taskshcedule"
cmd="go run taskschedule.go -f ./etc/taskschedule-api.yaml"
main="taskschedule.go"   #进程名

# kill schedule
echo ps -ef | grep $main | grep -v "grep" | awk -F " " '{print $2}'
ps -ef | grep $main | grep -v "grep" | awk -F " " '{print $2}'|xargs kill -9

# run cmd in screen
screen -x -S $screen_name -p 0 -X stuff "$cmd"
screen -x -S $screen_name -p 0 -X stuff $'\n'
