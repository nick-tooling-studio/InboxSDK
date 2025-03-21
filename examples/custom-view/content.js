/* eslint-disable no-undef */
import * as InboxSDK from '@inboxsdk/core';

const iframeCache = {}; // Cache to store iframes

const BASE_URL = 'https://application.tooling.studio/';

InboxSDK.load(2, 'sdk_newstud_7bb12ef34f').then(function (sdk) {
  window._sdk = sdk;
  const routes = [
    {
      routeID: 'ts-task',
      name: 'TASK',
      iconUrl: {
        lightTheme: chrome.runtime.getURL('assets/svg/tasks_black.svg'),
        darkTheme: chrome.runtime.getURL('assets/svg/tasks.svg'),
      },
      src: BASE_URL,
      isRouteActive: (route) => route.routeID === 'ts-task',
    },
    {
      routeID: 'ts-crm',
      name: 'CRM',
      iconUrl: {
        lightTheme: chrome.runtime.getURL('assets/svg/crm_black.svg'),
        darkTheme: chrome.runtime.getURL('assets/svg/crm.svg'),
      },
      src: `${BASE_URL}crm/login`,
      isRouteActive: (route) => route.routeID === 'ts-crm',
    },
    {
      routeID: 'ts-okr',
      name: 'OKR',
      iconUrl: {
        lightTheme: chrome.runtime.getURL('assets/svg/okr_black.svg'),
        darkTheme: chrome.runtime.getURL('assets/svg/okr.svg'),
      },
      src: `${BASE_URL}okr/login`,
      isRouteActive: (route) => route.routeID === 'ts-okr',
    },
  ];

  for (const route of routes) {
    sdk.AppMenu.addMenuItem({
      routeID: route.routeID,
      name: route.name,
      iconUrl: route.iconUrl,
      isRouteActive: route.isRouteActive,
    });

    sdk.Router.handleCustomRoute(route.routeID, function (customRouteView) {
      const container = customRouteView.getElement();
      const iframe = document.createElement('iframe');
      iframe.src = route.src;
      iframe.style.height = '100%';
      iframe.style.width = '100%';
      iframeCache[route.routeID] = iframe;
      container.appendChild(iframe);
    });
  }
});
