# IMPORTS
"""
from gtts import gTTS
import vlc
from mutagen.mp3 import MP3
import time

tts = gTTS('hello')
tts.save('hello.mp3')

"""

import synthese_vocale

synthese_vocale.genererMP3("jambon beurre", "sandwich", "")
synthese_vocale.lireMP3("sandwich", "")