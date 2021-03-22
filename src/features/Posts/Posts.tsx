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
} from 'native-base';
// import axios from 'axios';

const Status = {
  idle: 'idle',
  pending: 'pending',
  rejected: 'rejected',
  resolved: 'resolved',
};

type Props = {
  navigation: any;
};

export const Posts: FC<Props> = ({navigation}) => {
  // const [posts, setPosts] = useState<any>([]);
  const [status, setStatus] = useState(Status.idle);
  const [id, setId] = useState('');

  // const nasaApiKey = 'hLRfeCa4PCLoFSWyMsGh49F2IREUdpUl0zbnhz6w';

  // const apiCall = async () => {
  //   console.log('api called for page no #');
  //   setStatus(Status.pending);
  //   try {
  //     const res = await axios.get(
  //       `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${nasaApiKey}`,
  //     );

  //     if (res?.data) {
  //       // console.log(
  //       //   'response got for page no #',
  //       //   res.data.near_earth_objects[0].id,
  //       //   res.data.near_earth_objects.length,
  //       // );
  //       setPosts(res.data.near_earth_objects);
  //       setStatus(Status.resolved);
  //     }
  //   } catch (error) {
  //     // console.log('err', error);
  //     setStatus(Status.rejected);
  //   }
  // };

  const navigate = () => {
    navigation.navigate('PostDetails', {id: id});
  };

  // useEffect(() => {
  //   let isMount = true;
  //   if (isMount) apiCall();
  //   return () => {
  //     isMount = false;
  //   };
  // }, []);

  React.useEffect(() => {
    return () => {
      setId('');
    };
  }, []);

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
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 10,
          paddingHorizontal: 5,
        }}>
        <Input
          placeholder="Enter Asteroid Id"
          onChangeText={(e: string) => setId(e)}
          value={id}
        />
        <Button onPress={navigate} light={!id}>
          <Text style={{color: id ? '#fff' : '#ccc'}}>Submit</Text>
        </Button>
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
