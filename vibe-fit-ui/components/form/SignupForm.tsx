import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AuthInput } from '@/components/ui/AuthInput';
import { EyeIcon } from '@/components/ui/EyeIcon';
import { Theme } from '@/constants/themes';

export interface SignupFormProps {
  /** 当前主题 */
  theme: Theme;
  /** 校验通过后点击提交按钮的回调 */
  onSubmit: (name: string, email: string, password: string) => void;
  /** 点击「Sign in」跳转登录的回调 */
  onSignIn: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * SignupForm — 注册表单
 *
 * 包含姓名、邮箱、密码输入框及提交按钮。
 * 所有字段校验通过前按钮不可交互，通过后变为黑底白字可点击状态。
 *
 * Props:
 * - theme: 主题 token，驱动颜色
 * - onSubmit: 校验通过并点击后触发，携带 name / email / password
 * - onSignIn: 点击「Sign in」跳转回调
 */
export function SignupForm({ theme, onSubmit, onSignIn }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid =
    name.trim().length > 0 && EMAIL_RE.test(email.trim()) && password.length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(name.trim(), email.trim(), password);
  };

  return (
    <View>
      {/* 输入框 */}
      <View style={styles.inputs}>
        <AuthInput
          theme={theme}
          placeholder="enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
        />
        <AuthInput
          theme={theme}
          placeholder="enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <AuthInput
          theme={theme}
          placeholder="enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          rightIcon={
            <EyeIcon visible={showPassword} onPress={() => setShowPassword((v) => !v)} />
          }
        />
      </View>

      {/* 提交按钮 */}
      <TouchableOpacity
        style={[styles.btn, isValid ? styles.btnActive : styles.btnDisabled]}
        onPress={handleSubmit}
        activeOpacity={isValid ? 0.75 : 1}
        disabled={!isValid}
      >
        <Text style={[styles.btnText, isValid ? styles.btnTextActive : styles.btnTextDisabled]}>
          continue
        </Text>
      </TouchableOpacity>

      {/* 跳转登录 */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Already have an account?{' '}
        </Text>
        <Pressable onPress={onSignIn}>
          <Text style={[styles.footerLink, { color: theme.accent }]}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    marginTop: 32,
    gap: 16,
  },
  btn: {
    marginTop: 32,
    height: 49,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  btnActive: {
    backgroundColor: '#101010',
  },
  btnDisabled: {
    backgroundColor: '#D0C9C7',
  },
  btnText: {
    fontSize: 24,
    letterSpacing: -0.41,
    fontFamily: 'Poppins-Medium',
  },
  btnTextActive: {
    color: '#FFFFFF',
  },
  btnTextDisabled: {
    color: '#6E6C6E',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
  footerLink: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});
