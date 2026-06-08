import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { Avatar } from '@/components/common/avatar'
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
  return (
    <View style={styles.container}>
      <Avatar
        uri={profilepicture}
        editable
        onChangeImage={onChangeProfilePicture}
      />

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing['3xl'],
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
