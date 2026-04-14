import { Text, TouchableOpacity, View } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

// ─── 类型 ─────────────────────────────────────────────────────────────────────

export interface Activity {
  id: string
  title: string
  time: string
  done: boolean
}

export interface ActivitiesItemProps {
  /** 活动数据列表 */
  activities: Activity[]
  /** 点击"See all"回调 */
  onSeeAll?: () => void
}

// ─── 卡片图标 ─────────────────────────────────────────────────────────────────

function IconActivity() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={4}
        width={18}
        height={18}
        rx={3}
        stroke="#FFFFFF"
        strokeWidth={1.8}
      />
      <Path
        d="M3 9h18"
        stroke="#FFFFFF"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Path
        d="M8 13h4M8 16h8"
        stroke="#FFFFFF"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  )
}

function IconChevron() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke="#9D8FFF"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

// ─── 组件 ─────────────────────────────────────────────────────────────────────

/**
 * 活动列表区块
 * 包含"Today's Activities"标题栏与逐条活动卡片，
 * 奇偶行使用不同紫色背景交替展示。
 */
export function ActivitiesItem({ activities, onSeeAll }: ActivitiesItemProps) {
  return (
    <>
      {/* 活动标题 */}
      <View className="flex-row items-center justify-between px-6 mb-3">
        <Text
          className="text-sp-text font-poppins-bold"
          style={{ fontSize: 16 }}
        >
          Today's Activities
        </Text>
        {/* <TouchableOpacity onPress={onSeeAll}>
          <Text
            className="text-sp-accent font-poppins-medium"
            style={{ fontSize: 13 }}
          >
            See all
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* 活动卡片列表 */}
      <View className="px-4 gap-3">
        {activities.map((item, index) => (
          <View
            key={item.id}
            className="flex-row items-center rounded-2xl px-4 py-4"
            style={{
              backgroundColor: index % 2 === 0 ? '#8B78FF' : '#A898FF',
              shadowColor: '#5028FC',
              shadowOpacity: 0.18,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <View
              className="w-11 h-11 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              <IconActivity />
            </View>

            <View className="flex-1">
              <Text
                className="text-white font-poppins-medium"
                style={{ fontSize: 14 }}
              >
                {item.title}
              </Text>
              <View className="flex-row items-center mt-1">
                <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                  <Circle
                    cx={12}
                    cy={12}
                    r={9}
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={2}
                  />
                  <Path
                    d="M12 7v5l3 3"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
                <Text
                  className="text-white font-poppins ml-1"
                  style={{ fontSize: 12, opacity: 0.85 }}
                >
                  {item.time}
                </Text>
              </View>
            </View>

            {!item.done && (
              <View
                className="w-7 h-7 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
              >
                <IconChevron />
              </View>
            )}
          </View>
        ))}
      </View>
    </>
  )
}
