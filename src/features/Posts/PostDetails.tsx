import React, {FC} from 'react';
import {StyleSheet, Linking} from 'react-native';
import {
  Container,
  Header,
  Left,
  Text,
  Button,
  Title,
  Body,
  Content,
} from 'native-base';
import axios from 'axios';

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
  const [data, setData] = React.useState<any>();

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
      console.log('err', error);
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
        <Content style={{padding: 7}}>
          <Text>
            <Text style={{fontWeight: '700'}}>ID - </Text>
            {data?.id}
          </Text>
          <Text>
            <Text style={{fontWeight: '700'}}>Name - </Text>
            {data?.name}
          </Text>
          <Text
            style={{color: '#039af4'}}
            onPress={() => Linking.openURL(data?.nasa_jpl_url)}>
            <Text style={{fontWeight: '700'}}>Url - </Text>
            {data?.nasa_jpl_url}
          </Text>
        </Content>
      ) : (
        <Text style={{padding: 10}}>
          {Status.rejected === status
            ? `No Asteroid found with this id --> ${id}`
            : 'Finding Asteroid Details...'}
        </Text>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
