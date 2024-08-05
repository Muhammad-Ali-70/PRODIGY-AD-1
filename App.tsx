import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState('');
  const [currentExpression, setCurrentExpression] = useState('');

  const handleNumberInput = (num: number) => {
    setDisplayValue(displayValue === '0' ? num.toString() : displayValue + num);
    setCurrentExpression(currentExpression === '0' ? num.toString() : currentExpression + num);
  };

  const handleOperatorInput = (op: string) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue('0');
    setCurrentExpression(currentExpression + ' ' + op + ' ');
  };

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    if (operator === '/' && num2 === 0) {
      setDisplayValue('Error');
      setCurrentExpression('');
    } else {
      const result =
        operator === '+'
          ? num1 + num2
          : operator === '-'
            ? num1 - num2
            : operator === '*'
              ? num1 * num2
              : operator === '/'
                ? num1 / num2
                : displayValue;

      setDisplayValue(result.toString());
      setCurrentExpression(result.toString());
    }

    setOperator(null);
    setFirstValue('');
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
    setCurrentExpression('');
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.resultContainer}>
        <Text style={styles.expressionText}>{currentExpression}</Text>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {[7, 8, 9].map((num) => (
            <TouchableOpacity key={num} style={styles.button} onPress={() => handleNumberInput(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('/')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((num) => (
            <TouchableOpacity key={num} style={styles.button} onPress={() => handleNumberInput(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('*')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {[1, 2, 3].map((num) => (
            <TouchableOpacity key={num} style={styles.button} onPress={() => handleNumberInput(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('-')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>−</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handleNumberInput(0)}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton]} onPress={() => handleOperatorInput('+')}>
            <Text style={[styles.buttonText, styles.operatorButtonText]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handleEqual}>
            <Text style={[styles.buttonText, styles.equalButtonText]}>=</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    marginTop: 30,
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '90%',
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#666666',
    borderRadius: 10,
  },
  displayText: {
    fontSize: 64,
    color: '#ffffff',
  },
  expressionText: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 3,
    width: '90%',
    marginTop: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666666',
    margin: 5,
    padding: 20,
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff',
  },
  zeroButton: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 70,
  },
  operatorButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9500',
    margin: 5,
    padding: 20,
  },
  operatorButtonText: {
    color: '#ffffff',
  },
  equalButton: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9500',
    margin: 5,
    padding: 20,
  },
  equalButtonText: {
    color: '#ffffff',
  },
  clearButton: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3b30',
    marginTop: 10,
    padding: 20,
  },
  clearButtonText: {
    fontSize: 28,
    color: '#ffffff',
  },
});
