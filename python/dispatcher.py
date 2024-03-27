# IMPORTS

import requests
import datetime
import time
import paho.mqtt.publish as publish



# VARIABLES GLOBALES

id_utilisateur = 1
clef_API = "cn9p5v1j0h7wmfi7dyenz3v2rdzr30l6lug5qk1rq25jq9mucmdwvw5sbm7m"

broker = "10.0.200.35"
port = 1883
topic = "test"
client_id = "ABCD"
username = "admineleve"
password = "ieufdl"



# FONCTIONS

def getDonnees(id_utilisateur, clef_API):
    try:
        r = requests.get(f"http://10.0.200.35:5000/configuration/{id_utilisateur}", headers={"API-Key": clef_API})
        if r.status_code == 200:
            return r.json()
    except:
        return



# SCRIPT

previous_now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

while True:

    donnees = getDonnees(id_utilisateur, clef_API)
    now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

    if donnees != None and now != previous_now:
        for donnee in donnees:
            if donnee["debut"] == now:
                publish.single(topic, "parler: "+donnee["nom"], hostname=broker, port=port, client_id=client_id, auth={'username': username, 'password': password})

    previous_now = now
    time.sleep(5)
