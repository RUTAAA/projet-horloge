import paho.mqtt.publish as publish

broker = "broker.emqx.io"
port = 1883
topic = "bts/test"
client_id = "ABCD"
username = ""
password = ""

message = "Hello, MQTT!"

# publish.single(topic, message, hostname=broker, port=port, client_id=client_id, auth={'username': username, 'password': password})
publish.single(topic, message, hostname=broker, port=port, client_id=client_id)
