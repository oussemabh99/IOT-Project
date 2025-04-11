function hautTemp(){
    const apiUrl = "https://exp.host/--/api/v2/push/send";
const data = {
    "to": "ExponentPushToken[9QwYAoAcByS592GM6iB_VA]",
    "title":"hello",
    "body": "world"
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
export {hautTemp}