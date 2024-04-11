# IMPORTS

import paho.mqtt.client as pahomqtt
import paho.mqtt.publish as publish
import datetime



# FONCTIONS

def pub(topic, message, broker, port, client_id, username, password):
    publish.single(topic, message, hostname=broker, port=port, client_id=client_id, auth={'username': username, 'password': password})

def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Connected with result code {reason_code}")
    client.subscribe("presence")

def on_message(client, userdata, msg):
    print("Topic: " + msg.topic +"    Message: "+ msg.payload.decode())
    if msg.payload.decode() == "Presence detectee":
        global presence
        presence = datetime.datetime.now().hour*60 + datetime.datetime.now().minute

def sub(topic, broker, port, username, password):
    client = pahomqtt.Client(pahomqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_message = on_message
    client.username_pw_set(username, password)
    client.connect(broker, port, 60)
    client.loop_forever()
