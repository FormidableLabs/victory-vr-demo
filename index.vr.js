import React from 'react';
import {
  AppRegistry,
  Animated,
  asset,
  Box,
  Pano,
  Image,
  Button,
  CylindricalPanel,
  SpotLight,
  Text,
  View,
} from 'react-vr';
import { VictoryBar } from 'victory';

const BASEW = 450;
const BASEH = 300;

class Container extends React.Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          transform: [{ translate: [0, 0, -2] }],
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

class Bar extends React.Component {
  getProportion(y) {
    const pct = y / BASEH;
    return pct * 2;
  }
  getDimensions(x, y) {
    return {
      w: 0.25,
      h: this.getProportion(BASEH - y),
    };
  }
  getLeft(x) {
    const base = BASEW - x;
    const pct = x / BASEW;
    return pct * 3.3;
  }
  render() {
    const { x, y } = this.props;
    const { w, h } = this.getDimensions(x, y);
    const left = this.getLeft(x) - 1.66;
    console.log(left);
    return (
      <Box
        dimWidth={w}
        dimDepth={0.25}
        dimHeight={h}
        lit={true}
        style={{
          color: '#a0da90',
          top: 1 - h / 2,
          transform: [{ translate: [left, 0, 0] }],
        }}
      />
    );
  }
}

export default class victory_vr extends React.Component {
  render() {
    return (
      <View>
        <SpotLight
          intensity={1}
          style={{ transform: [{ translate: [1, 4, 4] }] }}
        />
        <Pano source={asset('lol.jpg')} />
        <VictoryBar
          data={[
            {
              x: 1,
              y: 10,
            },
            {
              x: 2,
              y: 5,
            },
            {
              x: 3,
              y: 2,
            },
            {
              x: 4,
              y: 15,
            },
            {
              x: 5,
              y: 1,
            },
          ]}
          padding={0}
          groupComponent={<View />}
          containerComponent={<Container />}
          dataComponent={<Bar />}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('victory_vr', () => victory_vr);
