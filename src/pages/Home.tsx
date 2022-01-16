import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask]);
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

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})