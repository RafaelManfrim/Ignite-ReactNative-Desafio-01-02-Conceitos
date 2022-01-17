import React from 'react';
import { StatusBar } from 'react-native';
import { TaskContextProvider } from './src/data/TaskContext';
import { Home } from './src/pages/Home';

export default function App() {
  return (
    <TaskContextProvider>
      <StatusBar 
        barStyle="light-content" 
        translucent 
        backgroundColor="transparent" 
      />
      <Home />
    </TaskContextProvider>
  );
}
