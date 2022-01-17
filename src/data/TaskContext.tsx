import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Alert } from "react-native";

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskContextData {
    tasks: Task[], 
    setTasks?: Dispatch<SetStateAction<Task[]>>,
    handleAddTask: (newTaskTitle: string) => void, 
    handleEditTask: (taskId: number, newTitle: string) => void, 
    handleToggleTaskDone: (id: number) => void, 
    handleRemoveTask: (id: number) => void
}

interface TaskContextProviderProps {
    children: React.ReactNode
}

const TaskContext = createContext({} as TaskContextData)

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        if(tasks.find(task => task.title === newTaskTitle)) {
          Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome.", [
            { text: "OK" },
          ]);
          return
        }
        const newTask = {
          id: Math.random(),
          title: newTaskTitle,
          done: false
        }
    
        setTasks(oldState => [...oldState, newTask]);
    }
    
    function handleEditTask(taskId: number, newTitle: string) {
        if(tasks.find(task => task.title === newTitle)) {
            Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome.", [
              { text: "OK" },
            ]);
            return
          }
        const taskListModified = tasks.map(task => {
            if(task.id === taskId) {
            task.title = newTitle
            }
            return task
        })
        setTasks(taskListModified)
    }

    function handleToggleTaskDone(id: number) {
        const taskListModified = tasks.map(task => {
            if(task.id === id) {
            task.done = true
            }
            return task
        })
        setTasks(taskListModified)
    }

    function handleRemoveTask(id: number) {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    }

    const providerValue = {
        tasks, 
        handleAddTask, 
        handleEditTask, 
        handleToggleTaskDone, 
        handleRemoveTask
    }

    return (
        <TaskContext.Provider value={providerValue}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => useContext(TaskContext)