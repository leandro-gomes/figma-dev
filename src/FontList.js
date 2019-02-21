import React, { Component } from 'react';
import { Text } from 'rebass';

class FontList extends Component {
  render() {
    const fonts = this.props.fonts.map((font, index) => {
      return (
        <li key={index}>
          <Text fontSize={font.size} font={font.family}>
            {font.family} ({font.size})
          </Text>
        </li>
      );
    });
    return (
      <div>
        <Text color="gray9" fontWeight="bold" fontSize={3} mx={4} my={2}>
          Fonts
        </Text>
        <ul>{fonts}</ul>
      </div>
    );
  }
}

export default FontList;
