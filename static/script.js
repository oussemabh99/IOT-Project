let temp=document.getElementById('temperature');
let hum =document.getElementById('humidity');
function run() {
    const apiUrl = 'http://127.0.0.1:5000/api';
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();  
      })
      .then(data => {
        console.log(data);
        temp.innerText=data.temperature
        hum.innerText=data.humidity
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  run ;
