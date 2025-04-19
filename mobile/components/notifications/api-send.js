function hautTemp(token,temp,min,max){
    const apiUrl = "https://exp.host/--/api/v2/push/send";
    const data = {
      to: token,
      title: "⚡ Alerte Énergie",
      body: `🔋 Niveau actuel : ${temp}. Plage optimale : ${min} - ${max}.`,
      sound: "default", // Son par défaut
      badge: 1,         // Badge sur l'icône de l'application (iOS)
      priority: "high", // Priorité haute (Android)
      data: {
        alertType: "energy",
        currentLevel: temp,
        optimalRange: { min, max },
        timestamp: new Date().toISOString()
      },
      androidChannelId: "default", // Doit être créé côté app
      icon: "../../assets/iconapp.jpg", // Icône personnalisée (mettre un lien HTTPS pour Android)
      mutableContent: true, // Permet de modifier la notification côté client (iOS rich push)
      categoryId: "energy-alert", // Pour gérer des actions personnalisées (iOS/Android)
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
    console.log (JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error

('Error:', error);
  });
}
function send_key(key, server) {
  const apiUrl = `${server}/notifications`;
  const data = { key };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      console.log("Response:", JSON.stringify(data, null, 2));
      return true;
    })
    .catch(error => {
      console.error('Error:', error);
      return false;
    });
}

export {hautTemp,send_key}