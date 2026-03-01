import { MessageOutline } from "@/assets/icons/MessageIcon";
import { NotificationOutline } from "@/assets/icons/NotificationIcon";
import { Post } from "@/src/types/post";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={styles.postBody}>
          <View style={styles.postMeta}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.time}>{post.time}</Text>
          </View>
          <Text style={styles.postText}>{post.content}</Text>
          <View style={styles.postActions}>
            <Pressable style={styles.actionBtn}>
              <NotificationOutline size={20} color="#888" />
              <Text style={styles.actionCount}>{post.likes}</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <MessageOutline size={20} color="#888" />
              <Text style={styles.actionCount}>{post.comments}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    post: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    postHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      resizeMode: "cover",
    },
    postBody: {
      flex: 1,
      gap: 4,
    },
    postMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    username: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 14,
    },
    time: {
      color: "#888",
      fontSize: 13,
    },
    postText: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 15,
      lineHeight: 22,
    },
    postActions: {
      flexDirection: "row",
      gap: 16,
      marginTop: 4,
    },
    actionBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    actionCount: {
      color: "#888",
      fontSize: 13,
    },
  });
