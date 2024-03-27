# IMPORTS

import paho.mqtt.client as mqtt
from gtts import gTTS
import vlc
from mutagen.mp3 import MP3
import time



# VARIABLES GLOBALES

broker = "10.0.200.35"
port = 1883
topic = "test"
username = "admineleve"
password = "ieufdl"
save_location = ""



# FONCTIONS

def genererMP3(text, name):
    gTTS(text=text, lang="fr").save(save_location + name + ".mp3")
    return name

def lireMP3(name):
    vlc.MediaPlayer(save_location + name + ".mp3").play()
    time.sleep( MP3(save_location + name + ".mp3").info.length )

def parler(text):
    if text != "":
        lireMP3(genererMP3(text, "test"))

def action(msg):
    if msg.startswith("parler"):
        parler(msg[len(msg.split(":")[0])+1:])

def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Connected with result code {reason_code}")
    client.subscribe(topic)

def on_message(client, userdata, msg):
    action(msg.payload.decode())



# SCRIPT

mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_connect = on_connect
mqttc.on_message = on_message

mqttc.username_pw_set(username, password)
mqttc.connect(broker, port, 60)

mqttc.loop_forever()

# envoyer "parler: la phrase a dire" pour faire parler
# penser a verifier le broker, topic...
