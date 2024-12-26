import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';

const RangeSlider = ({
  label,
  values,
  onValuesChange,
  min,
  max,
  step,
  formatLabel,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <MultiSlider
      values={values}
      onValuesChange={onValuesChange}
      min={min}
      max={max}
      step={step}
      sliderLength={280}
    />
    <Text style={styles.valueText}>
      {formatLabel(values[0], values[1])}
    </Text>
  </View>
);

RangeSlider.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  onValuesChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  formatLabel: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  valueText: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default RangeSlider;
