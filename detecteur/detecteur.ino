#include <M5Core2.h> 
#include <WiFi.h> 
#include <PubSubClient.h> 

// Paramètres WiFi et MQTT 
const char* ssid = "pepper_0"; // ID du réseau WiFi 
const char* password = "pepper2020"; // Mot de passe du réseau WiFi 
const char* mqtt_server = "192.168.1.113"; // Adresse IP du broker MQTT 
const int mqtt_port = 1883; // Port utilisé par MQTT 
const char* mqtt_user = "admineleve"; // Nom d'utilisateur du broker MQTT 
const char* mqtt_password = "ieufdl"; // Mot de passe du broker MQTT 
const char* mqtt_topic = "presence"; // Topic MQTT pour la détection de présence 

// Déclaration du client WiFi et MQTT 
WiFiClient espClient; 
PubSubClient client(espClient); 

// Zone de données commune pour le capteur de présence 
volatile int DETECT = 0; 

// Tâche du capteur de présence (radar) 
void detecter_publier(void* pvParameters) { 
    int R = 32; // broche du radar sur G32 
    pinMode(R, INPUT); // Définir la broche en entrée 

    while (1) { // Boucle infinie 
        if (digitalRead(R)) { // Si quelque chose est détecté 
            DETECT = 1; 
            client.publish(mqtt_topic, "Presence detectee"); // Envoi du message au broker MQTT 
            delay(3000); // Attente de 5 secondes avant la prochaine détection 
        } else { 
            DETECT = 0; // Aucune détection 
            delay(200); // Attente de 200 ms avant de vérifier à nouveau 
        } 
    } 
} 

// Tâche de l'écran LCD 
void affichage(void* pvParameters) { 
    char mess[16]; 
    // Paramètres du cercle 
    int R = M5.Lcd.width() / 10; 
    int x = R + 10; 
    int y = R + 10; 
    M5.Lcd.clear(); 
    M5.Lcd.fillCircle(x, y, R, YELLOW); 

    while (1) { 
        M5.Axp.SetLed(1); 
        delay(10); 
        M5.Axp.SetLed(0); 

        if (DETECT) { 
            M5.Lcd.fillCircle(x, y, R, RED); // Si une détection est faite, afficher le cercle en rouge 
        } else { 
            M5.Lcd.fillCircle(x, y, R, GREEN); // Sinon, afficher le cercle en vert 
        } 
        delay(1000); // Attente de 1 seconde 
    } 
} 

// Tâche pour gérer l'affichage de la connexion Wi-Fi et MQTT
void connexion_wifi(void* pvParameters) {
    while (1) {
        // Vérifier la connexion Wi-Fi
        if (WiFi.status() == WL_CONNECTED) {
            // Si la connexion Wi-Fi est réussie, afficher en vert
            M5.Lcd.fillCircle(290, 20, 10, GREEN);
        } else {
            // Sinon, afficher en rouge
            M5.Lcd.fillCircle(290, 20, 10, RED);
        }

        // Vérifier la connexion MQTT
        if (client.connected()) {
            // Si la connexion MQTT est réussie, afficher en bleu
            M5.Lcd.fillCircle(310, 20, 10, BLUE);
        } else {
            // Sinon, afficher en rouge
            M5.Lcd.fillCircle(310, 20, 10, RED);
        }

        delay(1000); // Attente de 1 seconde avant de vérifier à nouveau
    }
}

// Fonction de connexion WiFi 
void setup_wifi() { 
    delay(10); 
    Serial.println(); 
    Serial.print("Connexion à "); 
    Serial.println(ssid); 
    WiFi.begin(ssid, password); 
    while (WiFi.status() != WL_CONNECTED) { 
        delay(500); 
        Serial.print("."); 
    } 
    Serial.println(""); 
    Serial.println("WiFi connecté"); 
    Serial.println("Adresse IP: "); 
    Serial.println(WiFi.localIP()); 
} 

// Fonction de reconnexion MQTT 
void reconnect() { 
    while (!client.connected()) { 
        Serial.print("Tentative de connexion MQTT..."); 
        if (client.connect("ArduinoClient", mqtt_user, mqtt_password)) { 
            Serial.println("connecté"); 
        } else { 
            Serial.print("échec, rc="); 
            Serial.print(client.state()); 
            Serial.println(" réessayer dans 5 secondes"); 
            delay(5000); 
        } 
    } 
} 

void setup() { 
    Serial.begin(115200); 
    M5.begin(); 
    setup_wifi(); 
    client.setServer(mqtt_server, mqtt_port); 
    xTaskCreatePinnedToCore(affichage, "Écran", 2048, NULL, 3, NULL, 0); 
    xTaskCreatePinnedToCore(detecter_publier, "Radar", 4096, NULL, 3, NULL, 0); // Augmentation de la taille de la pile à 4096 
    xTaskCreatePinnedToCore(connexion_wifi, "Connexion", 2048, NULL, 2, NULL, 0); // Ajout de la tâche de connexion
} 

void loop() { 
    if (!client.connected()) { 
        reconnect(); 
    } 
    client.loop(); 
    delay(5000); // Attente de 5 secondes entre chaque publication 
}
