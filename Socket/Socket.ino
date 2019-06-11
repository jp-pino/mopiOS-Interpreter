#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <SocketIoClient.h>

#define CR 0x0D
#define BUFF_SIZE 100

SocketIoClient webSocket;

char buff[BUFF_SIZE];
char aux = 0;
unsigned char bufferIndex = 1;

void forward(const char * payload, size_t length) {
  Serial.print(payload);
}

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(false);
  buff[0] = '\"';

  WiFi.softAP("mopios", "passpasspass");
  Serial.setDebugOutput(true);
  Serial.setDebugOutput(false);
  while(WiFi.softAPgetStationNum() == 0) {
    delay(100);
  }
  webSocket.on("cmd", forward);
  webSocket.begin("192.168.4.2", 3000);
  
}

void loop() {
  webSocket.loop();
  if (Serial.available()) {
    aux = Serial.read();
    if (aux != CR && bufferIndex < BUFF_SIZE-1) {
      buff[bufferIndex++] = aux;
    } else {
      buff[bufferIndex++] = '\"';
      buff[bufferIndex++] = '\0';
      webSocket.emit("tm4c", buff);
      bufferIndex = 1;
    }
  }
}
