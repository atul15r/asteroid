import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  Input,
  Header,
  Button,
  Container,
  Title,
  Body,
  Content,
  View,
} from 'native-base';
import axios from 'axios';

const Status = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};
const nasaApiKey = 'hLRfeCa4PCLoFSWyMsGh49F2IREUdpUl0zbnhz6w';

type Props = {
  navigation: any;
};

export const Posts: FC<Props> = ({navigation}) => {
  const [posts, setPosts] = useState<any>([]);
  const [status, setStatus] = useState(Status.idle);
  const [id, setId] = useState('');

  const apiCall = async () => {
    console.log('api called for page no #');
    setStatus(Status.pending);
    try {
      const res = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${nasaApiKey}`,
      );

      if (res?.data) {
        // console.log(
        //   'response got for page no #',
        //   res.data.near_earth_objects[0].id,
        //   res.data.near_earth_objects.length,
        // );
        setPosts(res.data.near_earth_objects);
        setStatus(Status.resolved);
      }
    } catch (error) {
      // console.log('err', error);
      setStatus(Status.rejected);
    }
  };

  const navigate = () => {
    navigation.navigate('PostDetails', {id: id});
  };

  React.useEffect(() => {
    let isMount = true;
    if (isMount) apiCall();
    return () => {
      isMount = false;
    };
  }, []);

  React.useEffect(() => {
    return () => {
      setId('');
    };
  }, []);
  //

  const randomAsteroidDetails = () => {
    const id = posts[Math.floor(Math.random() * posts.length)]?.id;
    navigation.navigate('PostDetails', {id: id});
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>Search Asteroid By Id</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          // flexDirection: 'row',
          paddingTop: 10,
          paddingHorizontal: 5,
        }}>
        <Input
          placeholder="Enter Asteroid Id"
          onChangeText={(e: string) => setId(e)}
          value={id}
        />
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingTop: 10,
            paddingHorizontal: 5,
          }}>
          <Button onPress={navigate} light={!id}>
            <Text style={{color: id ? '#fff' : '#ccc'}}>Submit</Text>
          </Button>

          <Button onPress={randomAsteroidDetails} light={!posts.length}>
            <Text style={{color: posts.length ? '#fff' : '#ccc'}}>
              Random Asteroid details
            </Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    width: 100,
    elevation: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 8,
    top: 10,
    right: 10,
  },
});
