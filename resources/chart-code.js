
// This section is a line chart from chartist.js   https://gionkunz.github.io/chartist-js/examples.html
// To be used in the expense component.
// Here is the cdn to be added to the <head>

  <head>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
    <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
  </head>

// This is the chart code.  The graphed data must come in the form of an array.

var chart = new Chartist.Line('.ct-chart', {
  labels: ['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6'],
  // Naming the series with the series object array notation
  series: [{
    name: 'series-1',
    data: [5, 2, 4, 2, 0, 2]
  }]
}, {
  fullWidth: true,
  series: {
    'series-1': {
      lineSmooth: Chartist.Interpolation.step()
    }
  }
}, [
  // You can even use responsive configuration overrides to
  // customize your series configuration even further!
  ['screen and (max-width: 320px)', {
    series: {
      'series-1': {
        lineSmooth: Chartist.Interpolation.none()
      }
    }
  }]
]);


// End of chart code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++