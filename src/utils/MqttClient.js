import initialize from '../../MqttLib';

initialize();

class MqttClient {
  constructor() {
    const clientId = 'Test';
    this.client = new Paho.MQTT.Client('127.0.0.1', 9001, clientId);
    this.client.onMessageArrived = this.onMessageArrived;
    this.callbacks = {};
    this.onSuccessHandler = undefined;
    this.onConnectionLostHandler = undefined;
    this.isConnected = false;
  }

  onConnect = (onSuccessHandler, onConnectionLostHandler) => {
    this.onSuccessHandler = onSuccessHandler;
    this.onConnectionLostHandler = onConnectionLostHandler;
    this.client.onConnectionLost = () => {
      this.isConnected = false;
      onConnectionLostHandler();
    };

    this.client.connect({
      timeout: 10,
      onSuccess: () => {
        this.isConnected = true;
        onSuccessHandler();
      },
      useSSL: false,
      onFailure: this.onError,
      reconnect: true,
      keepAliveInterval: 20,
      cleanSession: true,
    });
  };

  onError = ({errorMessage}) => {
    console.info(errorMessage);
    this.isConnected = false;
    Alert.alert('Could not connect to MQTT');
  };

  onMessageArrived = message => {
    const {payloadString, topic} = message;
    this.callbacks[topic](payloadString);
  };

  onPublish = (topic, message) => {
    if (!this.isConnected) {
      console.info('not connected');
      return;
    }
    this.client.publish(topic, message);
  };

  onSubscribe = (topic, callback) => {
    if (!this.isConnected) {
      console.info('not connected');
      return;
    }
    this.callbacks[topic] = callback;
    this.client.subscribe(topic);
  };

  unsubscribe = topic => {
    if (!this.isConnected) {
      console.info('not connected');
      return;
    }

    delete this.callbacks[topic];
    this.client.unsubscribe(topic);
  };
}

let client = new MqttClient();
export {client as MqttClient};
