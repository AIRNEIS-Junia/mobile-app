import React, {FC, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Margin from '../../../../components/Margin/Margin.tsx';

type Props = {
  images: string[];
};

const ProductDetailImageViewer: FC<Props> = ({images}) => {
  const [active, setActive] = useState(0);

  return (
    <View>
      <Margin>
        <Image
          source={{uri: images[active]}}
          height={300}
          style={{
            objectFit: 'cover',
            width: '100%',
            borderRadius: 15,
            marginBottom: 10,
          }}
        />
      </Margin>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.previewScroll}>
        {images?.map((img, i) => (
          <TouchableOpacity
            key={img}
            onPress={() => {
              setActive(i);
            }}>
            <Image
              source={{uri: img}}
              width={80}
              height={80}
              style={{objectFit: 'cover', borderRadius: 15, marginRight: 5}}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  previewScroll: {
    paddingLeft: 10,
    paddingRight: 5,
  },
});

export default ProductDetailImageViewer;
