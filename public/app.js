var lineChartConfigFMI = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Kirkkonummi FMI',
        backgroundColor: 'rgba(240, 100, 100, 0.5)',
        borderColor: 'rgba(240, 100, 100, 1)',
        fill: false,
        pointRadius: 0,
        data: fmiDataset1
      },
      {
        label: 'Warehouse',
        backgroundColor: 'rgba(100, 100, 240, 0.5)',
        borderColor: 'rgba(100, 100, 240, 1)',
        fill: false,
        pointRadius: 0,
        data: warehouseDataset
      }
    ]
  },
  options: {
    responsive: true,
    title:{
      text:'Temperature from FMI'
    },
    tooltips: {
      mode: 'nearest',
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

var lineChartConfigWarehouseFreezer = {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Warehouse freezer',
        backgroundColor: 'rgba(100, 240, 100, 0.5)',
        borderColor: 'rgba(100, 240, 100, 1)',
        fill: false,
        pointRadius: 0,
        data: freezerDataset
      }
    ]
  },
  options: {
    responsive: true,
    title:{
      text:'Temperature from our warehouse freezer'
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
        },
        ticks: {
          max: -16,
          min: -22
        }
      }]
    }
  }
};

window.onload = function() {
  var ctx1 = document.getElementById("lineChartFMI").getContext("2d");
  window.myLine1 = new Chart(ctx1, lineChartConfigFMI);

  var ctx2 = document.getElementById("lineChartWarehouseFreezer").getContext("2d");
  window.myLine2 = new Chart(ctx2, lineChartConfigWarehouseFreezer);
};
