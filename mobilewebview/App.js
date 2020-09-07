import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StatusBar, BackHandler } from 'react-native';

import { WebView } from 'react-native-webview';
export default function App() {
  const backHandler = () => {
    if (canGoBack.current && webref.current) {
      webref.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  });
  const webref = useRef();
  const canGoBack = useRef(false);
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <WebView
        domStorageEnabled={true}
        ref={(web) => (webref.current = web)}
        source={{ uri: 'https://kitchencart4u.web.app/' }}
        onMessage={({ nativeEvent: state }) => {
          if (state.data === 'navigationStateChange') {
            // Navigation state updated, can check state.canGoBack, etc.
            canGoBack.current = state.canGoBack;
          }
        }}
        injectedJavaScript={`
        (function() {
          function wrap(fn) {
            return function wrapper() {
              var res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage('navigationStateChange');
              return res;
            }
          }

          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage('navigationStateChange');
          });
        })();

        true;
      `}
      />
    </SafeAreaView>
  );
}
