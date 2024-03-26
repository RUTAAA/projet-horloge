from gtts import gTTS
from playsound import playsound

save_location = ""

def genererMP3(text, name):
    gTTS(text=text, lang="fr").save(save_location + name + ".mp3")
    return name

def lireMP3(name):
    playsound(save_location + name + ".mp3")


"""
filename = input("Nom du fichier (sans extension): ") + ".mp3"
text = input("Phrase a dire: ")
language = "fr"

tts = gTTS(text=text, lang=language)
tts.save(filename)

playsound(filename)
"""

nom = input("Nom du fichier (sans extension): ")
phrase = input("Phrase a dire: ")
lireMP3(genererMP3(phrase, nom))
