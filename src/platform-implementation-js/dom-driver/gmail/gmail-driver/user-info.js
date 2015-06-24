/* @flow */
// jshint ignore:start

import _ from 'lodash';
import censorHTMLstring from '../../../../common/censor-html-string';
import Logger from '../../../lib/logger';
import waitFor from '../../../lib/wait-for';

var failedWaitFor = false;

export function getUserName(): string {
  var nameEl = document.querySelector('div.gb_w div.gb_B .gb_D');
  if (nameEl) {
    return nameEl.textContent;
  } else {
    Logger.error(new Error("Failed to read user's name"), {
      failedWaitFor,
      switcherListLength: getAccountSwitcherContactList().length,
      switcherHTML: _.map(
        document.querySelectorAll('div.gb_w'),
        (el: HTMLElement) => censorHTMLstring(el.outerHTML))
    });
    return 'undefined';
  }
}

export function getAccountSwitcherContactList(): Contact[] {
  return _.map(
    document.querySelectorAll('div.gb_K a.gb_L div.gb_N'),
    (el: HTMLElement) => ({
      name: el.querySelector('.gb_R').textContent,
      emailAddress: el.querySelector('.gb_S').textContent.match(/\S+/)[0]
    }));
}

export function waitForAccountSwitcherReady(): Promise<void> {
  return waitFor(() => this.getAccountSwitcherContactList().length > 0, 30*1000)
    .catch(err => {
      failedWaitFor = true;
      Logger.error(err, {
        reason: "waiting for user account switcher",
        switcherHTML: _.map(
          document.querySelectorAll('div.gb_w'),
          (el: HTMLElement) => censorHTMLstring(el.outerHTML))
      });
    });
}
