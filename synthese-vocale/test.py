from gtts import gTTS
import playsound

def text_to_speech(text):
    # Initialize gTTS with the text to convert
    speech = gTTS(text)

    # Save the audio file to a temporary file
    speech_file = 'speech.mp3'
    speech.save(speech_file)

    # Play the audio file
    playsound.playsound('speech.mp3', True)

text_to_speech("Bonjour je suis Lucas")
