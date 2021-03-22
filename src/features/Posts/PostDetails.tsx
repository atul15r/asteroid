import React, {FC} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Container, Header, Left, Text, Button, Title, Body} from 'native-base';
import axios from 'axios';

// @ts-ignore
import JSONTree from 'react-native-json-tree';
type Props = {
  navigation: any;
  route: any;
};

export const PostDetails: FC<Props> = ({navigation, route}) => {
  const {id} = route.params;

  const Status = {
    idle: 'idle',
    pending: 'pending',
    rejected: 'rejected',
    resolved: 'resolved',
  };

  const [status, setStatus] = React.useState(Status.idle);

  const nasaApiKey = 'hLRfeCa4PCLoFSWyMsGh49F2IREUdpUl0zbnhz6w';
  const [data, setData] = React.useState();

  const apiCall = async () => {
    console.log('api called for page no #');
    setStatus(Status.pending);
    try {
      const res = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${nasaApiKey}`,
      );

      if (res?.data) {
        setData(res.data);
        setStatus(Status.resolved);
      }
    } catch (error) {
      // console.log('err', error);
      setStatus(Status.rejected);
    }
  };

  React.useEffect(() => {
    apiCall();
  }, []);

  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text style={{color: '#fff', textTransform: 'capitalize'}}>
              back
            </Text>
          </Button>
        </Left>
        <Body>
          <Title>Asteroid Details</Title>
        </Body>
      </Header>
      {Status.resolved === status ? (
        <ScrollView>
          <JSONTree data={data} />
        </ScrollView>
      ) : (
        <Text style={{padding: 10}}>Finding Asteroid Details...</Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
