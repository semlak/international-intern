import React, { Component } from 'react';
import Chartist from 'chartist';
import API from '../../utils/API';

export default class extends Component {
  state = {}

  componentDidMount() {
    API.getCurrentUser().then((response) => {
      // console.log("response: ", response);
      const currentUser = response.data.user;
      // console.log("currentUser is: " , currentUser);
      this.setState({ currentUser });
    });
    // this.displayGraph();
  }

  componentWillReceiveProps() {
    this.displayGraph();
    // this.forceUpdate();
  }

  displayGraph = function () {
    const individualExpense = this.props.expenses.map(expense => expense.expAmount);

    const cumulativeExpense = [];
    for (let i = 0; i < individualExpense.length; i++) {
      cumulativeExpense[i] = individualExpense[i] + (i > 0 ? cumulativeExpense[i - 1] : 0);
    }

    const labels = Array(...{ length: (individualExpense.length) + 1 }).map((val, i) => i + 1);

    const chart = new Chartist.Line('.ct-chart', {
      labels,
      // Naming the series with the series object array notation
      series: [{
        name: 'series-1',
        data: individualExpense,
      }, {
        name: 'series-2',
        data: cumulativeExpense,
      }],
    }, {
      fullWidth: true,
      chartPadding: {
        right: 50,
      },
      series: {
        'series-1': {
          showLine: false,
          // lineSmooth: Chartist.Interpolation.simple()
        },
        'series-2': {
          lineSmooth: Chartist.Interpolation.step(),
          showArea: true,
          showPoint: false,
        },
      },
    });
  };

  render() {
    return (
      <div className="ct-chart" />
    );
  }
}
