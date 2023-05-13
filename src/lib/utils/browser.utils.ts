import { detect } from 'detect-browser';

type ReturnDetect = NonNullable<ReturnType<typeof detect>>;
type Name = ReturnDetect['name'];

const webkitBrowsers: Name[] = ['safari', 'ios', 'ios-webview', 'edge-ios', 'fxios'];

export const isWebkit = () => {
  const browser = detect()?.name;
  return browser && webkitBrowsers.includes(browser);
};
