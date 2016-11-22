
import React, { PropTypes, Component } from 'react';
import * as d3 from 'd3';

export const DefaultTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  xAccessor: PropTypes.func,
  yAccessor: PropTypes.func,
  selectionAccessor: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  xaxis: PropTypes.object,
  yaxis: PropTypes.object,
  interactive: PropTypes.bool,
  tooltip: PropTypes.bool
};

export const DefaultProps = {
  width: 960,
  height: 500,
  margin: {top: 20, right: 30, bottom: 20, left: 30},
  selectionAccessor: d => d.key,
  xAccessor: d => d.key,
  yAccessor: d => d.value,
  xScale: d3.scaleLinear(),
  yScale: d3.scaleLinear(),
  interactive: true,
  tooltip: false
};

export default class D3ReactBase extends Component {

  static propTypes = DefaultTypes;
  static defaultProps = DefaultProps;

  componentWillMount() {
    if (!this.chartConstructor) {
      throw new Error('Need to set chartConstructor');
    }
    this.chart = new this.chartConstructor(this.props);
    this.chart.willMount();
  }

  componentDidMount() {
    this.chart.selector = this.refs.chart;
    this.chart.tooltipRef = this.refs.tooltip;
    this.chart.props = this.props;
    this.chart.onMount();
  }

  componentDidUpdate() {
    this.chart.props = this.props;
    this.chart.onUpdate();
  }

  componentWillUnmount() {
    this.chart.onUnMount();
    this.chart = null;
  }

  getClassName() {
    return this.props.className ? ' ' + this.props.className : '';
  }

  render() {
    return (
      <div className={ 'panorama' + this.getClassName() }>
        <div ref='chart' className='panorama--chart-container'>
          { this.props.tooltip && <div ref='tooltip' className='panorama--tooltip'></div> }
        </div>
      </div>
    );
  }
}
