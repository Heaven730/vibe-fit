import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Path, Svg } from 'react-native-svg'

import { sp } from '@/constants/Colors'
import { FontFamily } from '@/constants/fonts'
import { spacing } from '@/constants/spacing'
import { fontSize } from '@/constants/typography'

export interface ProfileFormProps {
  fullname: string
  nickname: string
  aboutme: string
  profilepicture: string
  onChangeFullName: (v: string) => void
  onChangeNickName: (v: string) => void
  onChangeAboutMe: (v: string) => void
  onChangeProfilePicture: (uri: string) => void
}

/**
 * ProfileForm — 用户资料填写表单
 *
 * 顶部头像选择（相册），下方三个输入框：Full name、Nick name、About me。
 *
 * Props:
 * - fullname / nickname / aboutme: 当前文本值
 * - profilepicture: 当前头像 URI
 * - onChangeXxx: 各字段变化回调
 */
export function ProfileForm({
  fullname,
  nickname,
  aboutme,
  profilepicture,
  onChangeFullName,
  onChangeNickName,
  onChangeAboutMe,
  onChangeProfilePicture,
}: ProfileFormProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })
    if (!result.canceled && result.assets[0]) {
      onChangeProfilePicture(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Pressable onPress={pickImage} style={styles.avatarCircle}>
          {profilepicture ? (
            <Image source={{ uri: profilepicture }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
        </Pressable>
        <Pressable style={styles.editBadge} onPress={pickImage}>
          <Svg width={14} height={14} viewBox="0 0 24 24">
            <Path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              fill={sp.surface}
            />
          </Svg>
        </Pressable>
      </View>

      <View style={styles.fields}>
        <View style={styles.field}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={onChangeFullName}
            placeholderTextColor="transparent"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Nick name</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={onChangeNickName}
            placeholderTextColor="transparent"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>About me</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={aboutme}
            onChangeText={onChangeAboutMe}
            placeholderTextColor="transparent"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  )
}

const AVATAR_SIZE = 100
const BADGE_SIZE = 26

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing['3xl'],
  },
  avatarWrapper: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  avatarCircle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: sp['surface-muted'],
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: sp.border,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: sp.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fields: {
    width: '100%',
    gap: spacing.xl,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: fontSize.lg,
    fontFamily: FontFamily.PoppinsMedium,
    color: sp.accent,
  },
  input: {
    backgroundColor: sp.surface,
    borderRadius: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    fontSize: fontSize.lg,
    fontFamily: FontFamily.PoppinsRegular,
    color: sp.text,
    shadowColor: sp.border,
    shadowOffset: { width: 0, height: spacing.xs },
    shadowOpacity: 0.2,
    shadowRadius: spacing.sm,
    elevation: 2,
  },
  inputMultiline: {
    minHeight: 80,
  },
})
