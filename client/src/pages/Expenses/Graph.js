import React, { Component } from 'react';
import Chartist from 'chartist';
import API from '../../utils/API';
import chartistpluginaxistitle from 'chartist-plugin-axistitle';
import Typography from 'material-ui/Typography';

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
        data: individualExpense
      }, {
        name: 'series-2',
        data: cumulativeExpense
      }],
    }, {
      height: '350px',
      fullWidth: true,
      chartPadding: {
        top: 40,
        right: 40,
        bottom: 30,
        left: 50
      },
      plugins: [
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: 'Item',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 30
            },
            textAnchor: 'middle'
          },
          axisY: {
            axisTitle: 'Expense USD',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 40
            },
            textAnchor: 'middle',
            flipTitle: true
          }
        })
      ],
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
      <Typography>
        <div className="ct-chart" />
      </Typography>
    );
  }
}
