import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  SectionList,
  Platform,
} from 'react-native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import { getCaches } from '../services/cache/cacheService';
import { LocationContext } from '../services/context/LocationProvider';
import { Text } from '../components';
import { Coordinates, CachesDataSet } from '../types/types';
import { colors } from '../styles/colors';

const CachesList = () => {
  const [caches, setCaches] = useState<CachesDataSet | undefined>();
  const [radius, setRadius] = useState<string>();
  const location = useContext(LocationContext) as Coordinates;

  useEffect(() => {
    const init = async () => {
      const caches = await getCaches(location, 5000);
      setCaches(caches);
    };
    init();
  }, [location]);

  const onInputValueChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');

    setRadius(onlyNumbers);
  };

  const searchCaches = async () => {
    const caches = await getCaches(location, radius ? +radius : undefined);
    setCaches(caches);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {caches ? (
          <View>
            <Text style={styles.title}>Caches next to you</Text>
            <Text style={styles.description}>
              This is the list of caches within a 10 km radius of you. You can
              change the radius by typing it below and submitting.
            </Text>
            <View style={styles.searchBar}>
              <TextInput
                value={radius}
                onChangeText={onInputValueChange}
                style={styles.input}
                keyboardType="number-pad"
                placeholder="10"
              />
              <Button
                title="Search"
                color={colors.accentPrimary}
                onPress={searchCaches}
              />
            </View>

            <SectionList
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <IoniconsIcons
                    name="pin"
                    color={colors.accentPrimary}
                    size={20}
                  />

                  <Text style={styles.item}>{item.name}</Text>
                </View>
              )}
              sections={Object.keys(caches).map(key => ({
                title: key,
                data: caches[key],
              }))}
              renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
            />
          </View>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.darkSecondary,
  },
  title: {
    marginBottom: 20,
    fontSize: 36,
  },
  description: {
    fontFamily: Platform.OS === 'ios' ? 'Verdana' : 'monospace',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.dark,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: colors.font,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    fontFamily: Platform.OS === 'ios' ? 'Bradley Hand' : 'monospace',
    fontSize: 25,
  },
  sectionHeader: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingLeft: 25,
    backgroundColor: colors.dark,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  item: {
    paddingLeft: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  text: {
    marginBottom: 10,
    fontSize: 20,
  },
});

export default CachesList;
