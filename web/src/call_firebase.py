import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime 
cred = credentials.Certificate('testapp.json')
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://testapp-f4189-default-rtdb.europe-west1.firebasedatabase.app"
})
ref = db.reference('')
date=datetime.datetime.now()
custom_key='data'
new_reading_ref = ref.child(custom_key).set({
    'temperature':{'value': 23.0,'unit': 'Celsius','timestamp': str(date)},
    'humidité':{'value': 20,'unit': '%','timestamp': str(date)}
})
print(ref.get())