import { LinearGradient } from 'expo-linear-gradient'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  PanResponder,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

import { useTheme } from '@/hooks/useTheme'
import {
  FloatingBallPosition,
  useFloatingBallStore,
} from '@/store/floatingBallStore'

const BALL_SIZE = 68
const EDGE_MARGIN = 16
const TOP_MARGIN = 12
const BOTTOM_NAV_GUARD = 124

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function SparkIcon({ color }: { color: string }) {
  return (
    <Svg width={31} height={31} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13.52 2.78c.28-.72 1.3-.72 1.58 0l1.36 3.49c.08.2.24.36.44.44l3.49 1.36c.72.28.72 1.3 0 1.58l-3.49 1.36c-.2.08-.36.24-.44.44l-1.36 3.49c-.28.72-1.3.72-1.58 0l-1.36-3.49a.8.8 0 0 0-.44-.44L8.23 9.65c-.72-.28-.72-1.3 0-1.58l3.49-1.36a.8.8 0 0 0 .44-.44l1.36-3.49Z"
        fill={color}
      />
      <Path
        d="M5.12 13.86c.2-.52.94-.52 1.14 0l.72 1.86c.06.15.17.26.32.32l1.86.72c.52.2.52.94 0 1.14l-1.86.72a.6.6 0 0 0-.32.32l-.72 1.86c-.2.52-.94.52-1.14 0l-.72-1.86a.6.6 0 0 0-.32-.32l-1.86-.72c-.52-.2-.52-.94 0-1.14l1.86-.72a.6.6 0 0 0 .32-.32l.72-1.86Z"
        fill={color}
        opacity={0.9}
      />
    </Svg>
  )
}

export function FloatingBall() {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const position = useFloatingBallStore((state) => state.position)
  const setPosition = useFloatingBallStore((state) => state.setPosition)
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const currentPosition = useRef<FloatingBallPosition>({ x: 0, y: 0 })
  const dragStartPosition = useRef<FloatingBallPosition>({ x: 0, y: 0 })

  const bounds = useMemo(() => {
    const minX = EDGE_MARGIN
    const maxX = Math.max(minX, width - BALL_SIZE - EDGE_MARGIN)
    const minY = insets.top + TOP_MARGIN
    const maxY = Math.max(
      minY,
      height - insets.bottom - BOTTOM_NAV_GUARD - BALL_SIZE,
    )

    return { minX, maxX, minY, maxY }
  }, [height, insets.bottom, insets.top, width])

  const clampPosition = useCallback(
    ({ x, y }: FloatingBallPosition): FloatingBallPosition => ({
      x: clamp(x, bounds.minX, bounds.maxX),
      y: clamp(y, bounds.minY, bounds.maxY),
    }),
    [bounds.maxX, bounds.maxY, bounds.minX, bounds.minY],
  )

  const defaultPosition = useMemo(
    () => ({
      x: bounds.maxX,
      y: bounds.maxY,
    }),
    [bounds.maxX, bounds.maxY],
  )

  const moveToPosition = useCallback(
    (nextPosition: FloatingBallPosition, animated = true) => {
      currentPosition.current = nextPosition

      if (!animated) {
        animatedPosition.setValue(nextPosition)
        setPosition(nextPosition.x, nextPosition.y)
        return
      }

      Animated.spring(animatedPosition, {
        toValue: nextPosition,
        useNativeDriver: true,
        friction: 8,
        tension: 90,
      }).start(() => {
        setPosition(nextPosition.x, nextPosition.y)
      })
    },
    [animatedPosition, setPosition],
  )

  const snapToEdge = useCallback(
    (nextPosition: FloatingBallPosition) => {
      const clampedPosition = clampPosition(nextPosition)
      const shouldSnapLeft = clampedPosition.x + BALL_SIZE / 2 < width / 2

      moveToPosition({
        x: shouldSnapLeft ? bounds.minX : bounds.maxX,
        y: clampedPosition.y,
      })
    },
    [bounds.maxX, bounds.minX, clampPosition, moveToPosition, width],
  )

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2,
        onPanResponderGrant: () => {
          animatedPosition.stopAnimation((value) => {
            currentPosition.current = clampPosition(value)
            dragStartPosition.current = currentPosition.current
          })
        },
        onPanResponderMove: (_, gestureState) => {
          const nextPosition = clampPosition({
            x: dragStartPosition.current.x + gestureState.dx,
            y: dragStartPosition.current.y + gestureState.dy,
          })

          currentPosition.current = nextPosition
          animatedPosition.setValue(nextPosition)
        },
        onPanResponderRelease: () => {
          snapToEdge(currentPosition.current)
        },
        onPanResponderTerminate: () => {
          snapToEdge(currentPosition.current)
        },
      }),
    [animatedPosition, clampPosition, snapToEdge],
  )

  useEffect(() => {
    const nextPosition = clampPosition(position ?? defaultPosition)
    const current = currentPosition.current

    if (current.x !== nextPosition.x || current.y !== nextPosition.y) {
      moveToPosition(nextPosition, false)
    }
  }, [clampPosition, defaultPosition, moveToPosition, position])

  return (
    <Animated.View
      {...panResponder.panHandlers}
      accessibilityLabel="Floating shortcut"
      accessibilityRole="button"
      style={[
        styles.container,
        {
          shadowColor: theme.accent,
          transform: animatedPosition.getTranslateTransform(),
        },
      ]}
    >
      <LinearGradient
        colors={['#FFFFFF', theme.accentSoft, theme.accent]}
        locations={[0, 0.48, 1]}
        start={{ x: 0.16, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.highlight} />
        <SparkIcon color={theme.onAccent} />
      </LinearGradient>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    zIndex: 20,
    elevation: 12,
    shadowOpacity: 0.32,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: BALL_SIZE / 2,
  },
  highlight: {
    position: 'absolute',
    top: 7,
    left: 11,
    width: 24,
    height: 13,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.62)',
    transform: [{ rotate: '-24deg' }],
  },
})
