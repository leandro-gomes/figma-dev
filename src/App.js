import React, { Component } from 'react';
import { Provider, Box, Text, Input, Button } from 'rebass';
import theme from './theme/Theme';
import figma from './figmaConfig';
import ColorBoxes from './ColorBoxes';
import FontList from './FontList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://www.figma.com/file/gqeBpkMpBqYvis4XclE9TP0e/Test',
      data: {},
      colors: [],
      fonts: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.analyseUrl = this.analyseUrl.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  analyseUrl() {
    this.setState({ data: 'Loading...', colors: [], fonts: [] });
    const id = this.state.url.substring(
      this.state.url.indexOf('file/') + 5,
      this.state.url.lastIndexOf('/')
    );
    this.getFileData(id);
  }

  getFileData(id) {
    fetch(figma.baseUrl + id, { headers: figma.headers })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response =>
        this.setState({ data: response }, () => {
          this.processData();
        })
      );
  }

  processData() {
    let document = this.state.data.document;

    if (document.type === 'DOCUMENT' && document.children) {
      this.findColors(document.children);
    }
  }

  findColors(data) {
    for (let el of data) {
      if (el.backgroundColor) {
        this.addColor(el.backgroundColor);
      }
      if (el.fills) {
        this.addColor(el.fills[0].color);
      }
      if (el.style) {
        this.addFont(el.style);
      }
      if (el.children) {
        this.findColors(el.children);
      }
    }
  }

  addColor(color) {
    this.setState(prevState => ({
      colors: [...prevState.colors, color],
    }));
  }

  addFont(font) {
    this.setState(prevState => ({
      fonts: [
        ...prevState.fonts,
        { family: font.fontFamily, size: font.fontSize },
      ],
    }));
  }

  render() {
    return (
      <Provider theme={theme}>
        <Box bg="white" p={4}>
          <Text color="gray9" fontWeight="bold" fontSize={4} mb={2}>
            Figma File URL
          </Text>
          <Input value={this.state.url} onChange={this.handleChange} />
          <Button children="Check" mt={3} onClick={this.analyseUrl} />
        </Box>
        <ColorBoxes colors={this.state.colors} />
        <FontList fonts={this.state.fonts} />
      </Provider>
    );
  }
}

export default App;
