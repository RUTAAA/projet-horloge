import paho.mqtt.client as mqtt

broker = "10.0.200.35"
port = 1883
topic = "test"
username = "admineleve"
password = "ieufdl"

def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Connected with result code {reason_code}")
    client.subscribe(topic)

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

mqttc = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqttc.on_connect = on_connect
mqttc.on_message = on_message

mqttc.username_pw_set(username, password)
mqttc.connect(broker, port, 60)

mqttc.loop_forever()
