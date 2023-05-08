#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

const int oneWireBus = 4;
const char* ssid = "Gabriel";
const char* password = "7758773S";
const char* mqtt_server = "91.121.93.94";

WiFiClient espClient;
PubSubClient client(espClient);


OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // This is to test MQTT stuff to see if its working must message from the client
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
  } else {
    digitalWrite(BUILTIN_LED, HIGH);
  }

}

void reconnect() {
  while (!client.connected()) {
    Serial.print("AlleSys - Attempting MQTT connection...");
    String clientId = "AllesysTemQttClient";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
     
      client.subscribe("device/led");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("AlleSys - try again in 5 seconds");

      delay(5000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  sensors.begin();

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }

  sensors.requestTemperatures(); 
  float temperatureC = sensors.getTempCByIndex(0);

  if(!isnan(temperatureC)){
    char tempStr[10];
    dtostrf(temperatureC, 6, 2, tempStr);
    Serial.println(tempStr);
    client.publish("temp", tempStr);
  }
  
  delay(5000);
  client.loop();
}
