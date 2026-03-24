import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import storageService from "@/lib/storageService";

import ProgressBar from "@/components/ProgressBar";
import PicturePickerButton from "@/components/PicturePickerButton";
import AvatarPickerModal from "@/components/AvatarPickerModal";
import avatarPlaceholder from "@/assets/images/avatar.png";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";

const BUCKET_NAME = "avatars";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#25671E",
        borderRightColor: "#25671E",
        backgroundColor: "#25671E",
        width: "70%",
        height: 40,
      }}
      contentContainerStyle={{ paddingHorizontal: 5 }}
      text1Style={{
        color: "#fff",
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
      }}
    />
  ),
};

export default function profile() {
  const [fullName, setFullName] = useState<string>("");
  const [showNameEdit, setShowNameEdit] = useState<boolean>(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | any>(avatarPlaceholder);
  const [selectedImage, setSelectedImage] = useState<string | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, updateUser, setRefresh } = useAuth();

  const userData = {
    fullName: user?.user_metadata?.full_name ?? "",
    email: user?.user_metadata?.email ?? "",
    avatarUrl: user?.user_metadata?.avatar_url ?? "",
    avatarFilePath: user?.user_metadata?.avatar_filePath ?? "",
  };

  const handleCamera = async () => {
    const persmissionResult = await ImagePicker.getCameraPermissionsAsync();

    if (!persmissionResult.granted) {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access the camera is required.",
        );
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      setAvatar(selectedImage);
      setShowAvatarEdit(true);
      onModalClose();
    }
  };

  const handleGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      setAvatar(selectedImage);
      setShowAvatarEdit(true);
      onModalClose();
    } else {
      selectedImage(null);
      setShowAvatarEdit(false);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const showToast = (msg: string) => {
    Toast.show({
      type: "success",
      text1: msg,
    });
  };

  const onSave = async () => {
    try {
      setIsLoading(true);

      let new_avatar = selectedImage ? selectedImage : userData.avatarFilePath;
      let new_name =
        fullName !== userData.fullName ? fullName : userData.fullName;

      let filePath: any;

      // If userData, avatarFilePath is empty then upload a new avatar
      if (!userData.avatarFilePath && new_avatar) {
        const newFilePath = `public/avatar${Date.now()}`;
        const { data, error } = await storageService.uploadImage(
          new_avatar,
          newFilePath,
          BUCKET_NAME,
        );
        filePath = data?.path;
      } else if (userData.avatarFilePath) {
        const { data, error } = await storageService.updateImage(
          new_avatar,
          userData.avatarFilePath,
          BUCKET_NAME,
        );
        filePath = data?.path;
      }

      /***
       * If user has changed the avatar the then return the new avatar url else return old avatar url
       ***/
      let avatarUrl = storageService.getImageUrl(BUCKET_NAME, filePath);

      avatarUrl = avatarUrl !== undefined ? avatarUrl : userData.avatarUrl;

      const { success } = await updateUser(new_name, avatarUrl, filePath);

      if (success) {
        if (fullName != userData.fullName) {
          showToast("Full name updated");
        } else if (!success) {
          showToast("Sorry, couldn't updated full name");
        }

        if (selectedImage) {
          showToast("Profile photo updated");
        }

        setAvatar(avatarUrl);
        setRefresh(true);
      }
    } catch (error) {
      console.log("profile :: Error :: ", error);
    } finally {
      setIsLoading(false);
      setShowNameEdit(false);
      setShowAvatarEdit(false);
    }
  };

  useEffect(() => {
    // Set avatar
    if (userData.avatarUrl) {
      setAvatar(userData.avatarUrl);
    }

    setFullName(userData.fullName);
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile picture and Progressbar section */}
      <View
        style={{
          flex: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Image
            source={selectedImage ? selectedImage.uri : avatar}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />

          {isLoading && (
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ProgressBar color="red" size={70} />
            </View>
          )}
        </Pressable>
      </View>
      <Text
        style={[styles.titleLabel, { fontWeight: "400" }]}
        onPress={() => setIsModalVisible(true)}
      >
        Edit
      </Text>

      <View style={styles.userInfoContainer}>
        <Text style={styles.titleLabel}>Name</Text>
        {showNameEdit ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Change your name"
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#e3e1e19c",
                height: 35,
                justifyContent: "center",
              }}
              onPress={() => {
                setShowNameEdit(!showNameEdit);
                setFullName(userData.fullName);
              }}
            >
              <Ionicons name="close-outline" size={24} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ textAlign: "left" }}>{userData.fullName}</Text>
            <TouchableOpacity onPress={() => setShowNameEdit(!showNameEdit)}>
              <Text style={{ textAlign: "right", color: "green" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.titleLabel}>Email</Text>
        <Text>{userData.email}</Text>
      </View>

      {showAvatarEdit || showNameEdit ? (
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : null}

      <AvatarPickerModal isVisible={isModalVisible} onClose={onModalClose}>
        <PicturePickerButton
          iconName="camera-outline"
          label="Camera"
          onClick={handleCamera}
        />
        <PicturePickerButton
          iconName="image-outline"
          label="Gallery"
          onClick={handleGallery}
        />
      </AvatarPickerModal>

      <Toast config={toastConfig} position="bottom" bottomOffset={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    padding: 30,
  },
  userInfoContainer: {
    width: "90%",
    marginTop: 20,
  },
  nameContainer: {
    flex: 0,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
  },
  input: {
    height: 35,
    width: "100%",
    color: "#111111",
    fontSize: 12,
    backgroundColor: "#e3e1e19c",
  },
  titleLabel: {
    marginTop: 15,
    fontWeight: "semibold",
    fontSize: 18,
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "black",
    marginTop: 50,
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
  },
});
