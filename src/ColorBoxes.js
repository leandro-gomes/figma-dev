import React, { Component } from 'react';
import { Box, Flex, Caps, Text } from 'rebass';

class ColorBoxes extends Component {
  convertColor(color) {
    return (
      'rgba(' +
      color.r * 255 +
      ', ' +
      color.g * 255 +
      ', ' +
      color.b * 255 +
      ', ' +
      color.a +
      ')'
    );
  }

  render() {
    const boxes = this.props.colors.map((color, index) => {
      const bg = this.convertColor(color);
      return (
        <Box bg={bg} px={3} pt={3} pb={6} key={index} width={220}>
          <Caps color="#333333">{bg}</Caps>
        </Box>
      );
    });
    return (
      <div>
        <Text color="gray9" fontWeight="bold" fontSize={3} mx={4} my={2}>
          Colors
        </Text>
        <Flex flexWrap="wrap" mx={4}>
          {boxes}
        </Flex>
      </div>
    );
  }
}

export default ColorBoxes;
