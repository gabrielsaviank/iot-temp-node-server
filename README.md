# NodeJS MQTT

This is a simple IOT Temperature sensor with NodeJs, MongoDB and TensorFlow.

For the sensor I used a NodeMCU V3 board with a DS18B20 sensor wired in a Breadboard, but Now I'm swapping to a soldered board
once the Sensor is working correct and I've adjusted the diagram. I'll probably create a Fritzing 
diagram to make things easier.

I'm building a simple React Native Application to pair with this and create some charts perhaps.

* For now the basic routes and controllers are working ok. 

* The Tensor Flow Predictions code needs some adjusts, now we're using all the temps, but later we'll use only the recent ones.
* If you want to train the models more frequently just change the _cron job schedule_ and you're fine. But depends how much data you're generating.


### Warning!

The MQTT Lib only works with _npm install_

### Steps 

* Open the C++ code and change the MQTT server to your settings.
* Upload the CPP code to your NodeMCU.
* Navigate to the project root and Install the libs using _npm i_
* Run the the API using _npm start-server_

### Important Info and Help.

* Since MQTT Lens is Deprecated. You can monitor your MQTT subscriptions using 
[MQTTFX](https://www.hivemq.com/article/mqtt-toolbox-mqtt-fx/)

* The TensorFlow default setup is using the processor, but I'm creating a separated branch to use the GPU. For now
only work on Nvidia GPU'S due to the CUDA Cores, but ROCM is coming.

### The Next Steps

* I'm planning to write the API using Java/Springboot.
