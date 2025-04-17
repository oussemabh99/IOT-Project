import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime 
cred = credentials.Certificate("testapp.json")
def intialise():
    firebase_admin.initialize_app(cred, {"databaseURL": "https://testapp-f4189-default-rtdb.europe-west1.firebasedatabase.app"})

def set_values (cred,value):
   
    ref = db.reference('')
    date=datetime.datetime.now()
    custom_key='data'
    new_reading_ref = ref.child(custom_key).set({'temperature':{'value': str(value) ,'unit': 'Celsius','timestamp': str(date)},'humidité':{'value': 20,'unit': '%','timestamp': str(date)}
})
def get_values():  
    ref = db.reference('')
    return(ref.get())
