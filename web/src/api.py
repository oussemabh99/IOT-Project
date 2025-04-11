import requests
import json 
def send_key(key,token):
    url= "https://kubernetes.default.svc.cluster.local/api/v1/namespaces/devops/secrets/secret1"
    headers={
              "Authorization": f"Bearer {token}",
              "Content-Type": "application/merge-patch+json"
               
            }
    data1= {"data":{"key": key}}
    responce=requests.patch(url,headers=headers,json=data1, verify=False)
    return(responce)
