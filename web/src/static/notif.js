function send_api(temp, min, max) {
    const apiUrl = "https://exp.host/--/api/v2/push/send";
    const data = {
      to: "ExponentPushToken[CeBodAAlWtwfJEN5Z1teXV]",
      title: "⚡ Alerte Énergie",
      body: `🔋 Niveau actuel : ${temp}. Plage optimale : ${min} - ${max}.`,
      sound: "default",
      badge: 1,
      priority: "high",
      data: {
        alertType: "energy",
        currentLevel: temp,
        optimalRange: { min, max },
        timestamp: new Date().toISOString()
      },
      androidChannelId: "default",
      icon: "../../assets/iconapp.jpg",
      mutableContent: true,
      categoryId: "energy-alert"
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function run() {
    const apiUrl = `http://webapp/api`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
  
        let temp = responseData.data.temperature.value;
        let min = responseData.config.min;
        let max = responseData.config.max;
  
        if (temp >= min && temp <= max) {
          console.log('working fine');
        } else {
          send_api(temp, min, max);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  run();
  