var config = {
  type: 'line',
  data: {
    datasets: [{
      label: place,
      backgroundColor: 'rgba(240, 100, 100, 0.5)',
      borderColor: 'rgba(240, 100, 100, 1)',
      fill: false,
      pointRadius: 0,
      data: dataset,
    }],
  },
  options: {
    responsive: true,
    title:{
      text:'Temperatures'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'linear',
        time: {
          unit: 'day',
          tooltipFormat: 'll HH:mm'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temperature [C]'
        }
      }]
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById("myChart").getContext("2d");
  window.myLine = new Chart(ctx, config);
};
