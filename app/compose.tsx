import { usePosts } from "@/src/context/PostContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const defaultAvatar = require("../assets/images/avatar.jpg");

const ItalicIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.239 5.5H15.5l-.239 1H13L10.5 18.5h2.261l-.239 1H8l.239-1H10.5l2.5-13H10.5l.239-1Z"
      fill={color}
    />
  </Svg>
);

const HashtagIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const ImageIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const VideoIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PollIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const QuoteIcon = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type PostType = "default" | "italic" | "poll";

const TOOLBAR_ITEMS = [
  { type: "italic", Icon: ItalicIcon },
  { type: "hashtag", Icon: HashtagIcon },
  { type: "image", Icon: ImageIcon },
  { type: "video", Icon: VideoIcon },
  { type: "quote", Icon: QuoteIcon },
  { type: "poll", Icon: PollIcon },
];

const Compose = () => {
  const isDark = useColorScheme() === "dark";
  const styles = getStyles(isDark);
  const router = useRouter();
  const { addPost } = usePosts();
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<PostType>("default");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const insets = useSafeAreaInsets();

  const handlePost = () => {
    if (!content.trim()) return;
    addPost(content.trim());
    router.back();
  };

  const updatePollOption = (text: string, index: number) => {
    const updated = [...pollOptions];
    updated[index] = text;
    setPollOptions(updated);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) setPollOptions([...pollOptions, ""]);
  };

  const toolbarColor = isDark ? "#FAFAFA" : "#1A1A1A";
  const mutedColor = "#888";

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>New Post</Text>
          <Pressable
            style={[styles.postBtn, !content.trim() && styles.postBtnDisabled]}
            onPress={handlePost}
            disabled={!content.trim()}
          >
            <Text style={styles.postBtnText}>Post</Text>
          </Pressable>
        </View>

        {/* Composer */}
        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.composer}>
            <Image source={defaultAvatar} style={styles.avatar} />

            {/* Right column — username, input, toolbar, poll */}
            <View style={styles.inputArea}>
              <Text style={styles.username}>snowi</Text>

              <TextInput
                style={[
                  styles.input,
                  postType === "italic" && styles.inputItalic,
                ]}
                placeholder="What's on your mind?"
                placeholderTextColor={mutedColor}
                multiline
                autoFocus
                value={content}
                onChangeText={setContent}
              />

              {/* Toolbar sits right below the input */}
              <View style={styles.toolbar}>
                {TOOLBAR_ITEMS.map(({ type, Icon }) => {
                  const isActive = postType === type;
                  return (
                    <Pressable
                      key={type}
                      style={[
                        styles.toolbarBtn,
                        isActive && styles.toolbarBtnActive,
                      ]}
                      onPress={() => {
                        if (type === "italic" || type === "poll") {
                          setPostType(
                            isActive ? "default" : (type as PostType),
                          );
                        }
                      }}
                    >
                      <Icon color={isActive ? toolbarColor : mutedColor} />
                    </Pressable>
                  );
                })}
              </View>

              {/* Poll options below toolbar */}
              {postType === "poll" && (
                <View style={styles.pollContainer}>
                  {pollOptions.map((option, index) => (
                    <TextInput
                      key={index}
                      style={styles.pollOption}
                      placeholder={`Option ${index + 1}`}
                      placeholderTextColor={mutedColor}
                      value={option}
                      onChangeText={(text) => updatePollOption(text, index)}
                    />
                  ))}
                  {pollOptions.length < 4 && (
                    <Pressable
                      style={styles.addOptionBtn}
                      onPress={addPollOption}
                    >
                      <Text style={styles.addOptionText}>+ Add option</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Compose;

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    title: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 16,
    },
    cancel: {
      color: "#888",
      fontSize: 15,
    },
    postBtn: {
      backgroundColor: isDark ? "#FAFAFA" : "#1A1A1A",
      paddingHorizontal: 16,
      paddingVertical: 7,
      borderRadius: 20,
    },
    postBtnDisabled: {
      opacity: 0.4,
    },
    postBtnText: {
      color: isDark ? "#1A1A1A" : "#FAFAFA",
      fontWeight: "600",
      fontSize: 14,
    },
    scroll: {
      flex: 1,
    },
    composer: {
      flexDirection: "row",
      padding: 16,
      gap: 12,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      resizeMode: "cover",
    },
    inputArea: {
      flex: 1,
      gap: 2, // tight gap so username → input → toolbar are close
    },
    username: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontWeight: "600",
      fontSize: 14,
    },
    input: {
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 15,
      lineHeight: 22,
      padding: 0,
      minHeight: 40,
    },
    inputItalic: {
      fontStyle: "italic",
    },
    toolbar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      marginTop: 4,
    },
    toolbarBtn: {
      width: 34,
      height: 34,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    toolbarBtnActive: {
      backgroundColor: isDark ? "#2A2A2A" : "#EFEFEF",
    },
    pollContainer: {
      gap: 8,
      marginTop: 8,
    },
    pollOption: {
      borderWidth: 1,
      borderColor: isDark ? "#2A2A2A" : "#EFEFEF",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: isDark ? "#FAFAFA" : "#1A1A1A",
      fontSize: 14,
    },
    addOptionBtn: {
      paddingVertical: 8,
    },
    addOptionText: {
      color: "#888",
      fontSize: 14,
    },
  });
