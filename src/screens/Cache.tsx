import React, { FC, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Text } from '../components';
import { colors } from '../styles/colors';
import { getCache } from '../services/cache/cacheService';
import { LocationContext } from '../services/context/LocationProvider';
import { CacheDetails, Coordinates } from '../types/types';

type RootStackParamList = {
  Cache: { key: string };
};

type CacheScreenRouteProp = RouteProp<RootStackParamList, 'Cache'>;

type Props = {
  route: CacheScreenRouteProp;
};

const Cache: FC<Props> = ({
  route: {
    params: { key: cacheKey },
  },
}) => {
  const [cache, setCache] = useState<CacheDetails>();
  const location = useContext(LocationContext) as Coordinates;

  useEffect(() => {
    const init = async () => {
      const data = await getCache(cacheKey, location);
      setCache(data);
    };

    init();
  }, [location, cacheKey]);

  return (
    <SafeAreaView style={styles.container}>
      {!cache ? (
        <Text>Loading</Text>
      ) : (
        <View>
          <Text style={styles.title}>{cache.name}</Text>
          <Text style={styles.description}>{cache.short_description}</Text>
          <Text style={styles.info}>Size: {cache.size2}</Text>
          <Text style={styles.info}>Difficulty: {cache.difficulty}</Text>
          <Text style={styles.info}>
            Recommendations: {cache.recommendations}
          </Text>
          {cache.rating_votes > 0 && (
            <Text style={styles.info}>
              Rating: {cache.rating} from {cache.rating_votes} votes
            </Text>
          )}
          <Text style={styles.info}>Founds: {cache.founds}</Text>
          <Text style={styles.info}>Watchers: {cache.watchers}</Text>
          {cache.images.map(
            image =>
              !image.is_spoiler && (
                <Image
                  key={image.uuid}
                  style={styles.image}
                  source={{
                    uri: image.thumb_url,
                  }}
                />
              ),
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkSecondary,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: colors.accentSecondary,
  },
  description: {
    marginBottom: 30,
    fontSize: 20,
    textAlign: 'center',
  },
  info: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginBottom: 10,
    borderColor: colors.accentSecondary,
    borderWidth: 3,
    borderRadius: 150 / 2,
    resizeMode: 'cover',
  },
});

export default Cache;
