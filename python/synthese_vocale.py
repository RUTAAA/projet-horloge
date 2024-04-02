# IMPORTS

from gtts import gTTS
import vlc
from mutagen.mp3 import MP3
import time



# FONCTIONS

def genererMP3(text, name, save_location):
    gTTS(text=text, lang="fr").save(save_location + name + ".mp3")
    return name

def lireMP3(name, save_location):
    vlc.MediaPlayer(save_location + name + ".mp3").play()
    time.sleep( MP3(save_location + name + ".mp3").info.length )
