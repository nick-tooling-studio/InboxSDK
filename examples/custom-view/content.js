/* eslint-disable no-undef */
import * as InboxSDK from '@inboxsdk/core';

const iframeCache = {}; // Cache to store iframes

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
			src: 'http://localhost:3000/',
			isRouteActive: (route) => route.routeID === 'ts-task',
		},
		{
			routeID: 'ts-crm',
			name: 'CRM',
			iconUrl: {
				lightTheme: chrome.runtime.getURL('assets/svg/crm_black.svg'),
				darkTheme: chrome.runtime.getURL('assets/svg/crm.svg'),
			},
			src: 'http://localhost:3000/crm/login',
			isRouteActive: (route) => route.routeID === 'ts-crm',
		},
		{
			routeID: 'ts-okr',
			name: 'OKR',
			iconUrl: {
				lightTheme: chrome.runtime.getURL('assets/svg/okr_black.svg'),
				darkTheme: chrome.runtime.getURL('assets/svg/okr.svg'),
			},
			src: 'http://localhost:3000/okr/login',
			isRouteActive: (route) => route.routeID === 'ts-okr',
		}
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
	
			// Check if the iframe is already cached
			if (iframeCache[route.routeID]) {
				console.log("Reuse the cached iframe");
				//container.appendChild(iframeCache[routeID]);
				//iframeCache[routeID].style.display = 'block';
			} else {
				const iframe = document.createElement('iframe');
				iframe.src = route.src;
				iframe.style.color = 'white';
				iframe.style.height = '100%';
				iframe.style.width = '100%';
				iframeCache[route.routeID] = iframe;
				container.appendChild(iframe);
			}
		});
	}
});