const ctx = document.getElementById('myChart');
var labelsTab = [];
var dataTab = [];
const apiUrl = `${window.location.origin}/api`;
function managetable(tab,value){
  if (tab[tab.length-1]!=value)
  {
    if (tab.length>10)
        {
            tab.shift();
        }
        tab.push(value);
        console.log(tab);
  }
    
}
function run () {
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  
    })
    .then(data => {
      console.log(data);
      managetable(labelsTab,data.data.temperature.timestamp)
      managetable(dataTab,data.data.temperature.value)
    })
    .catch(error => {
      console.error('Error:', error);
    });
      
     
      myChart.data.labels = labelsTab;
      myChart.data.datasets[0].data = dataTab;
      myChart.update();
}         
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelsTab,
      datasets: [{
        label: '# of Votes',
        data: dataTab,
        borderWidth: 1
      }]
    },
    options: {
        animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
        },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
    
                
setInterval(run, 30000);