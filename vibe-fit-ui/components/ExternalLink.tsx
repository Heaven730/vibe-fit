import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  return (
    <Link
      target="_blank"
      {...props}
      href={props.href}
      onPress={(e) => {
        e.preventDefault();
        WebBrowser.openBrowserAsync(props.href as string);
      }}
    />
  );
}
