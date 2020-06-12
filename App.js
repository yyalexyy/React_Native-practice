import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, DatePickerAndroid } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Retrieving image
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    // Check for permission access
    if (permissionResult.granted == false){
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled == true){
      return;
    }

    setSelectedImage({localUri: pickerResult.uri});
  };

  // Sharing the image
  let openShareDialogAsync = async() => {
      if(!(await Sharing.isAvailableAsync())){
        alert("Uh oh, sharing isn't available on your platform");
        return;
      }

      await Sharing.shareAsync(selectedImage.localUri);
  };

  // Displaying the photo with a button to share the image
  if (selectedImage != null){
    return(
      <View style={styles.container}>
        <Image source={{uri: selectedImage.localUri}} style={styles.thumbnail}/>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Displaying the logo, the text, and a button to select a photo
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>

    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions:{
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button:{
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText:{
    fontSize: 20,
    color: '#fff',
  },
  thumbnail:{
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
});
