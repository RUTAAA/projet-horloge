# IMPORTS

import mqtt
import api
import synthese_vocale

import requests
import datetime
import time
from threading import Thread



# VARIABLES GLOBALES

id_utilisateur = 1
clef_API = "cn9p5v1j0h7wmfi7dyenz3v2rdzr30l6lug5qk1rq25jq9mucmdwvw5sbm7m"

broker = "10.0.200.35"
port = 1883
topic = "test"
client_id = "ABCD"
username = "admineleve"
password = "ieufdl"

save_location = "/home/admineleve/projet-horloge/python/synthese-vocale/"

presence = 0



# SCRIPT

Thread(target=mqtt.sub,args=("", broker, port, username, password)).start()

previous_now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

while True:

    donnees = api.getDonnees(id_utilisateur, clef_API)
    now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

    if donnees != None and now != previous_now:
        for donnee in donnees:
            if donnee["debut"] == now:
                if presence > now-10:
                    synthese_vocale.lireMP3( synthese_vocale.genererMP3(phrase, nom, save_location), save_location )

    previous_now = now
    time.sleep(5)
