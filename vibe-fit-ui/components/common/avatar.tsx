import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'

import { useTheme } from '@/hooks/useTheme'

export interface AvatarProps {
  uri: string
  size?: number
  editable?: boolean
  badgeSize?: number
  onChangeImage?: (uri: string) => void
}

export function Avatar({
  uri,
  size = 100,
  editable = false,
  badgeSize = 26,
  onChangeImage,
}: AvatarProps) {
  const { theme } = useTheme()

  const pickImage = async () => {
    if (!editable || !onChangeImage) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      onChangeImage(result.assets[0].uri)
    }
  }

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Pressable
        onPress={pickImage}
        disabled={!editable}
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.surfaceMuted,
          },
        ]}
      >
        {uri ? (
          <Image source={{ uri }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.placeholder,
              { backgroundColor: theme.borderMuted },
            ]}
          />
        )}
      </Pressable>

      {editable && (
        <Pressable
          style={[
            styles.editBadge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: theme.accent,
            },
          ]}
          onPress={pickImage}
        >
          <Svg width={14} height={14} viewBox="0 0 24 24">
            <Path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
              fill={theme.onAccent}
            />
          </Svg>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  circle: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
