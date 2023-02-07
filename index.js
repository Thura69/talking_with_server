const Websocket = require('ws');
const express = require("express");
const mqtt = require('mqtt');


//mqttConnectionOptions
const host = '64f045e5514042d9a76cb326c1ab0c7f.s1.eu.hivemq.cloud';
const port = 8883;
const username = 'Meezi';
const password = '78782525';
const client_id = 'thura_69';
const protocol = 'mqtts';



//public options
const pub_topic = 'general';
const pub_options = { qos: 0, retain: false };


//subscribe options
const sub_topic = 'general';
const sub_options = { qos: 0 };

const mqttConnectionOptions = {
    host: host,
    port: port,
    username: username,
    password: password,
    client_id: client_id,
    protocol: protocol,
    reconnectPeriod: 5000,
}

const mqttClient = mqtt.connect(mqttConnectionOptions);


mqttClient.on('connect', async function () {
    console.log('Connection successful');
    mqttClient.subscribe(sub_topic, sub_options, function (err) {
        if (err) {
            console.log("An error occurred while subscribing")
        } else {
            console.log("Subscribed successfully to " + sub_topic.toString())
        }
    });

  
        

    // Delay of 5 seconds
     
});




const wss = new Websocket.Server({
    port: 8887
});



wss.on('connection', function (ws) {
    
     mqttClient.on('message', (topic, message) => {
                   
           
          ws.send(message.toString());
          
      
     })
    
    ws.on('message', function (data) {

        

        
       
      
           mqttClient.publish(pub_topic, data.toString(), pub_options, function (err) {
            if (err) {
                console.log("An error occurred during publish")
            } else {
                console.log("Published successfully to " + pub_topic.toString())
            }
        });
    })


})