import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';
import { Task, useTask } from '../data/TaskContext'

interface TasksItemProps {
  index: number;
  item: Task
}

export function TaskItem({ index, item }: TasksItemProps) {
  const { handleRemoveTask, handleEditTask, handleToggleTaskDone } = useTask()

  const [isEditingTask, setIsEditingTask] = useState(false)
  const [taskTitle, setTaskTitle] = useState(item.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditingTask(true)
  }

  function handleCancelEditing() {
    setIsEditingTask(false)
  }

  function handleSubmitTaskEdited() {
    handleEditTask(item.id, taskTitle)
    setIsEditingTask(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditingTask) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditingTask])

  function handlePressRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
        { text: "Não" },
        { text: "Sim", onPress: () => handleRemoveTask(id) }
      ]
    );
  }

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => handleToggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon name="check" size={12} color="#FFF" />
            )}
          </View>

          <TextInput 
            style={item.done ? styles.taskTextDone : styles.taskText} 
            value={taskTitle} 
            onChangeText={setTaskTitle}
            editable={isEditingTask}
            onSubmitEditing={handleSubmitTaskEdited}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonArea}>
        {isEditingTask ? (
          <TouchableOpacity onPress={() => handleCancelEditing()}>
            <Icon name="x" size={16} color="#999" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity testID={`trash-${index}`} onPress={() => handleStartEditing()}>
            <Icon name="edit" size={16} color="#66F" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, paddingLeft: 16 }}
          onPress={() => {
            if(!isEditingTask) {
              handlePressRemoveTask(item.id)
            }
          }}
        >
          <Icon name="trash" size={16} color={isEditingTask ? "#999" : "#F66"} />
        </TouchableOpacity>
      </View>

    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      padding: 0,
      color: '#666',
      fontFamily: 'Inter-Medium',
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      padding: 0,
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    buttonArea: {
      display: 'flex',
      flexDirection: 'row'
    }
})