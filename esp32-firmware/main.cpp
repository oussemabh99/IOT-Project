#include "DHT.h"
#include <PubSubClient.h>
#include "WiFi.h"
#define DHTPIN 17
#define DHTTYPE DHT22
//DHTTYPE = DHT11, but there are also DHT22 and 21
const char *mqtt_broker = "192.168.100.84";
const int mqtt_port = 1883 ;
const char *topic = "test_topic"; 
const char *ssid="ooredoo-43D324";
const char *password="70862EE5Xm#37" ;
char buffer[64];
DHT dht(DHTPIN, DHTTYPE); // constructor to declare our sensor
WiFiClient espClient;
PubSubClient client(espClient); 
void setup() { 
 //Mise de la vitesse de transmission à 115200; 
 Serial.begin(9600); 
 // Connecting to a Wi-Fi network 
 WiFi.begin(ssid, password); 
 while (WiFi.status() != WL_CONNECTED) { 
 delay(500); 
 Serial.println("Connecting to WiFi.."); 
  } Serial.println("Connected to the Wi-Fi network"); 
  //connexion au broker MQTT  
 client.setServer(mqtt_broker, mqtt_port); 
 while (!client.connected()) { 
 String client_id = "esp32-client-"; 
 client_id += String(WiFi.macAddress()); 
 Serial.printf("The client %s connects to the public MQTT brokern", client_id.c_str()); 
 if (client.connect(client_id.c_str(), "", "")) { 
  Serial.println("Public EMQX MQTT broker connected"); 
  } else { 
  Serial.print("failed with state "); 
  Serial.print(client.state()); 
  delay(2000); 
  } 
  } 
  dht.begin();
  }
 


 
void loop() {
  delay(1000);
  // The DHT11 returns at most one measurement every 1s
  float h = dht.readHumidity();
  //Read the moisture content in %.
  float t = dht.readTemperature();
  //Read the temperature in degrees Celsius
  float f = dht.readTemperature(true);
  // true returns the temperature in Fahrenheit

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed reception");
    return;
    //Returns an error if the ESP32 does not receive any measurements
  }

  Serial.print("Humidite: ");
  Serial.print(h);
  Serial.print("%  Temperature: ");
  Serial.print(t);
  Serial.print("°C, ");
  Serial.print(f);
  Serial.println("°F");
  //client.publish(topic, t.c_str());
  
  int ret = snprintf(buffer, sizeof buffer, "%f", t);
  client.publish(topic,buffer);
}
