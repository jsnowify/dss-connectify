import { StyleSheet, Text, useColorScheme, View } from "react-native";

const Profile = () => {
  const scheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: scheme === "dark" ? "#1A1A1A" : "#FAFAFA",
    },
    text: {
      color: scheme === "dark" ? "#FAFAFA" : "#1A1A1A",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};

export default Profile;
