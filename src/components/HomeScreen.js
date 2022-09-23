import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {MqttClient} from '../utils/MqttClient';
export function HomeScreen() {
  const [message, setMessage] = React.useState('');
  const [publishPayload, setPublishPayload] = React.useState('');
  const [publishTopic, setPublishTopic] = React.useState('');
  const [subscribeTopic, setSubscribeTopic] = React.useState('');
  const [isSubscribed, setSubscribed] = React.useState(false);
  const [mqttConnected, setMqttConnected] = React.useState(false);

  React.useEffect(() => {
    MqttClient.onConnect(onSuccess, onConnectionLost);
  }, []);

  const onSuccess = () => {
    console.info('Mqtt Connected');
    setMqttConnected(true);
  };

  const onConnectionLost = () => {
    setMqttConnected(false);
    console.info('Mqtt Fail to connect');
  };

  const onSubscribe = message => {
    setMessage(message);
  };

  function onSubscribeHandler() {
    MqttClient.onSubscribe(subscribeTopic, onSubscribe);
    setSubscribed(true);
  }

  function onPublishHandler() {
    MqttClient.onPublish(publishTopic, publishPayload);
    setPublishPayload('');
  }

  function unSubscribeHandler() {
    MqttClient.unsubscribe(subscribeTopic);
    setSubscribeTopic('');
    setSubscribed(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
          }}>
          {mqttConnected ? 'MQTT connected' : 'Not connected'}
        </Text>
      </View>
      <View style={styles.mainContainer}>
        {!isSubscribed ? (
          <View style={styles.subscribeContainer}>
            <TextInput
              placeholder="Enter topic to Subscribe"
              value={subscribeTopic}
              autoCapitalize={'none'}
              onChangeText={setSubscribeTopic}
              style={styles.inputStyle}
            />
            <Button
              type="solid"
              title="Subscribe"
              onPress={onSubscribeHandler}
              color="#42b883"
              disabled={!subscribeTopic}
            />
          </View>
        ) : (
          <View style={styles.subscribeContainer}>
            <Text
              style={{
                color: 'blue',
                fontWeight: '600',
              }}>
              Subscribed topic: {subscribeTopic}
            </Text>
            <Button
              type="solid"
              title="UnSubscribe"
              onPress={unSubscribeHandler}
              color="#42b883"
            />
          </View>
        )}
      </View>
      <View style={styles.publishContainer}>
        <TextInput
          placeholder="Enter topic to publish"
          value={publishTopic}
          autoCapitalize={'none'}
          onChangeText={setPublishTopic}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Enter Message"
          value={publishPayload}
          autoCapitalize={'none'}
          onChangeText={setPublishPayload}
          style={styles.inputStylePublish}
        />

        <Button
          type="solid"
          title="Publish"
          onPress={onPublishHandler}
          color="#42b883"
          disabled={!(publishTopic && publishPayload)}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {},
  subscribeContainer: {
    marginVertical: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  inputStyle: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  inputStylePublish: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginVertical: 20,
  },
  publishContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  messageContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
