import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return <TaskItem item={item} index={index} toggleTaskDone={toggleTaskDone} removeTask={removeTask} />
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
