import paho.mqtt.publish as publish

broker = "10.0.200.35"
port = 1883
topic = "test"
client_id = "ABCD"
username = "admineleve"
password = "ieufdl"

message = "Hello, MQTT!"

publish.single(topic, message, hostname=broker, port=port, client_id=client_id, auth={'username': username, 'password': password})
