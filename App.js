import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');

  const [courseGoals, setCourseGoals] = useState([]);

  const [isAddMode, setIsAddMode] = useState(false);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals(courseGoals => [
      ...courseGoals, 
      { key: Math.random().toString(), value: enteredGoal} 
    ]);
    setIsAddMode(false);
    setEnteredGoal('');
  };

  const removeGoalHandler = goalKey => {
    setCourseGoals(courseGoals => {
      return courseGoals.filter((goal) => goal.key !== goalKey);
    });
  };

  const cancelGoalAdd = () => {
    setIsAddMode(false);
    setEnteredGoal('');
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Item" onPress={() => setIsAddMode(true)}/>
      <Modal visible={isAddMode} animationType="fade">
        <View style={styles.inputContainer}>
          <TextInput 
            color='rgb(15,129,255)'
            placeholder='To-Do...' 
            style={styles.textInput} 
            onChangeText={goalInputHandler}
            value={enteredGoal}
          />
          <View style={styles.buttons}>
            <Button title="CANCEL" color='red' onPress={cancelGoalAdd}/>
            <Button style={styles.addButton} title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <View style={styles.listItem} >
            <View>
              <Text style={{color: 'rgb(15,129,255)', fontSize: 16}}>{itemData.item.value}</Text>
            </View>  
            <TouchableOpacity onPress={removeGoalHandler.bind(this, itemData.item.key)} >
              <View style={styles.complete}>
                <Text style={{textAlign: 'center', fontSize: 14, color: 'rgb(15,129,255)'}}>Complete</Text>
              </View>
            </TouchableOpacity>
          </View> 
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 40
  },
  buttons: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    width: '90%'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textInput: {
    width: '90%', 
    borderColor: 'rgb(15,129,255)', 
    borderWidth: 1, 
    padding: 10,
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#d0e3f7',
    borderColor: '#86bcf5',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  complete: {
    width: 80,
    backgroundColor: 'white',
    borderColor: 'rgb(15,129,255)',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  }
});
