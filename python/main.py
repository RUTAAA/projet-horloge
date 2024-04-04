# IMPORTS

import mqtt
import api
import synthese_vocale

import requests
import datetime
import time
from threading import Thread
import os



# VARIABLES GLOBALES

temps_veille = 5
temps_odeur = 5

id_utilisateur = 1
clef_API = "cehb78icef2as5tlcqs6vryfpbvmdndbme72j8daubjdj9nvfzi4dv0flf"

broker = "10.0.200.35"
port = 1883
topic = "test"
client_id = "ABCD"
username = "admineleve"
password = "ieufdl"

#save_location = "/home/admineleve/projet-horloge/python/synthese-vocale/"
save_location = ""

odeur = datetime.datetime.now().hour*60 + datetime.datetime.now().minute
presence = datetime.datetime.now().hour*60 + datetime.datetime.now().minute



# SCRIPT

Thread(target=mqtt.sub,args=("", broker, port, username, password)).start()

previous_now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

while True:

    donnees = api.getDonnees(id_utilisateur, clef_API)
    now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

    if donnees != None and now != previous_now:
        for donnee in donnees:
            if donnee["debut"] == now:
                if presence > now - temps_veille:
                    synthese_vocale.lireMP3( synthese_vocale.genererMP3(donnee["nom"], donnee["nom"], save_location), save_location )
                if donnee["odeur"] == 1:
                    odeur = datetime.datetime.now().hour*60 + datetime.datetime.now().minute
                    os.system("kasa --host 192.168.1.100 --username projethorlogesnir@gmail.com --password stjolorient0- on")

    if odeur < now - temps_odeur and odeur != -1:
        os.system("kasa --host 192.168.1.100 --username projethorlogesnir@gmail.com --password stjolorient0- off")
        odeur = -1
    
    previous_now = now
    time.sleep(5)
