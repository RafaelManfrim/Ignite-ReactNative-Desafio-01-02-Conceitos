import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { useTask } from '../data/TaskContext';
import { TaskItem } from './TaskItem';

export function TasksList() {
  const { tasks } = useTask()

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return <TaskItem item={item} index={index} />
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
