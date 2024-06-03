# IMPORTS

import mqtt
import api
import synthese_vocale
import prise

import requests
import datetime
import time
from threading import Thread
import os
import asyncio
from tapo import ApiClient





# VARIABLES GLOBALES

# pour se connecter au topic sur le broker MQTT
broker = {
    "ip":"10.4.4.5",
    "port":1883,
    "utilisateur":"admineleve",
    "mot_de_passe":"ieufdl",
    "identifiant":"",
    "topic":"presence",
}

# pour la base de données /  l'api
utilisateur = {
    "id":"70",
    "clef_api":"hse4o46fgthl7ieos0uwxbxtzgsjg4juk17vjdkeu674hxwar1fiy9a8",
}

# pour contacter l'API
constantes_api = {
    "ip":"10.4.4.4",
    "port":"5000",
}

# pour contrôler la prise connectée
constantes_prise = {
    "email":"projethorlogesnir@gmail.com",
    "mot_de_passe":"stjolorient0-",
    "ip":"192.168.1.102",
}



#save_location = "/home/admineleve/projet-horloge/python/synthese-vocale/"
save_location = ""
temps_veille = 5
temps_odeur = 1





# SCRIPT

odeur = -1
mqtt.presence = datetime.datetime.now().hour*60 + datetime.datetime.now().minute
previous_now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

# abonnement MQTT pour la détection de présence
# dans un autre thread (en parallèle) pour ne pas bloquer le programme
Thread(target=mqtt.sub, args=( broker["topic"], broker["ip"], broker["port"], broker["utilisateur"], broker["mot_de_passe"] )).start()

while True:

    # récupération des périodes et évènements de l'utilisateur via l'API
    donnees = api.getDonnees( utilisateur["id"], utilisateur["clef_api"], constantes_api["ip"], constantes_api["port"] )

    # maintenant en minutes, exemple: si 12h30 alors 12*60+30 = 750
    now = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

    # s'il y a des données et que c'est la première boucle de la minute
    if donnees != None and now != previous_now:

        # pour chaque ligne (période ou évènement)
        for donnee in donnees:

            # si la période ou l'évènement commence maintenant
            if donnee["debut"] == now:

                # si une précense a été détecté récemment
                if mqtt.presence <= now - temps_veille:
                    # faire la synthèse vocale
                    synthese_vocale.lireMP3( synthese_vocale.genererMP3( donnee["nom"], donnee["nom"], save_location ), save_location )
                
                # si la période ou l'évènement demande une odeur
                if donnee["odeur"] == 1:
                    # noter l'heure à laquelle on active l'odeur
                    odeur = datetime.datetime.now().hour*60 + datetime.datetime.now().minute
                    # puis allumer la prise, pour le diffuseur olfactif
                    asyncio.run(prise.allumer_prise(constantes_prise["email"], constantes_prise["mot_de_passe"], constantes_prise["ip"]))
    
    # si l'odeur est activée depuis suffisamment longtemps
    if odeur <= now - temps_odeur and odeur != -1:
        # éteindre la prise, pour éteindre le diffuseur olfactif
        asyncio.run(prise.eteindre_prise(constantes_prise["email"], constantes_prise["mot_de_passe"], constantes_prise["ip"]))
        # noter que le diffuseur est désactivé
        odeur = -1
    
    # on note la minute à laquelle s'est déroulée cette boucle
    # pour détecter un éventuel changement de minute entre deux boucle
    previous_now = now

    # et on attend 5 secondes, on est pas préssés
    time.sleep(5)
