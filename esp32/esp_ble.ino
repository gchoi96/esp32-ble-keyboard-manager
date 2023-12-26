#include <BleKeyboard.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

BleKeyboard bleKeyboard("GCHOI Keyboard", "GCHOI", 100);
char code[10];
void setup()
{
  code[0] = '\0';
  Serial.begin(115200);
  Serial2.begin(9600);
  bleKeyboard.begin();

  Serial.println("Starting BLE work!");
}

void loop()
{
  if (Serial.available() > 0)
  {
    char incomingChar = Serial.read();
    if (incomingChar == 'u')
    {
      int codeNum = atoi(code);
      Serial.println(codeNum);
      if (codeNum == 130)
      {
        bleKeyboard.releaseAll();
      }
      else
      {
        bleKeyboard.release(codeNum);
      }
      code[0] = '\0';
    }
    else if (incomingChar == 'd')
    {
      int codeNum = atoi(code);
      Serial.println(codeNum);
      bleKeyboard.press(codeNum);
      code[0] = '\0';
    }
    else
    {
      uint8_t len = strlen(code);
      code[len] = incomingChar;
      code[len + 1] = '\0';
    }
  }
}