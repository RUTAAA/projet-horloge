from gtts import gTTS
import vlc
from mutagen.mp3 import MP3
import time


save_location = "/home/admineleve/projet-horloge/python/synthese-vocale/"

def genererMP3(text, name):
    gTTS(text=text, lang="fr").save(save_location + name + ".mp3")
    return name

def lireMP3(name):
    vlc.MediaPlayer(save_location + name + ".mp3").play()
    time.sleep( MP3(save_location + name + ".mp3").info.length )
    



nom = input("Nom du fichier (sans extension): ")
phrase = input("Phrase a dire: ")
lireMP3(genererMP3(phrase, nom))
