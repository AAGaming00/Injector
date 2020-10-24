import sleep from '../util/sleep';
import ab2str from '../util/ab2str';

export const removeModuleUI = (field, where) => {
  let settingItem = globalThis.settings.items.find((x) => x[1] === 'Manage Modules');

  settingItem[2].splice(settingItem[2].indexOf(settingItem[2].find((x) => x.subtext === globalThis.modules[field].description)), 1);

  globalThis.moduleStoreAPI.moduleRemoved(globalThis.modules[field]);

  globalThis.modules[field].remove();

  delete globalThis.modules[field];

  globalThis.clearModuleSetting(field);

  globalThis.settings.createFromItems();
  globalThis.openSettingItem(where);
};

export const isSettingsOpen = () => {
  return document.querySelector('div[aria-label="USER_SETTINGS"] div[aria-label="Close"]') !== null;
};

export const closeSettings = () => {
  let closeEl = document.querySelector('div[aria-label="USER_SETTINGS"] div[aria-label="Close"]');
  
  if (closeEl === null) return false;
  
  closeEl.click(); // Close settings via clicking the close settings button
};

export const openSettings = () => {
  settingsButtonEl.click();
};

export const openSettingItem = (name) => {
  try {
    [...settingsSidebarGooseModContainer.children].find((x) => x.textContent === name).click();
    return true;
  } catch (e) {
    return false;
  }
};

export const reopenSettings = async () => {
  globalThis.closeSettings();

  await sleep(1000);

  globalThis.openSettings();

  await sleep(200);

  globalThis.openSettingItem('Module Store');
};

// Settings UI stuff

let settingsButtonEl;

(async function() {
  settingsButtonEl = document.querySelector('button[aria-label="User Settings"]');

  while (!settingsButtonEl) {
    globalThis.showToast('Failed to get settings button, retrying');
    settingsButtonEl = document.querySelector('button[aria-label="User Settings"]');

    await sleep(1000);
  }

  settingsButtonEl.addEventListener('click', injectInSettings);
})();

let settingsLayerEl, settingsSidebarEl, settingsSidebarGooseModContainer, settingsMainEl, settingsClasses;

const settings = {
  items: [],

  createItem: (panelName, content, clickHandler, danger = false) => {
    globalThis.settings.items.push(['item', panelName, content, clickHandler, danger]);
  },

  createHeading: (headingName) => {
    globalThis.settings.items.push(['heading', headingName]);
  },

  createSeparator: () => {
    globalThis.settings.items.push(['separator']);
  },

  createFromItems: () => {
    settingsSidebarGooseModContainer.innerHTML = '';

    for (let i of globalThis.settings.items) {
      switch (i[0]) {
        case 'item':
          globalThis.settings._createItem(i[1], i[2], i[3], i[4]);
          break;
        case 'heading':
          globalThis.settings._createHeading(i[1]);
          break;
        case 'separator':
          globalThis.settings._createSeparator();
          break;
      }
    }
  },

  _createItem: (panelName, content, clickHandler, danger = false) => {
    let parentEl = document.createElement('div');

    let headerEl = document.createElement('h2');
    headerEl.textContent = `${panelName} ${content[0]}`;

    headerEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'h2-2gWE-o', 'title-3sZWYQ', 'defaultColor-1_ajX0', 'defaultMarginh2-2LTaUL');

    parentEl.appendChild(headerEl);

    let contentEl = document.createElement('div');
    contentEl.className = 'children-rWhLdy';

    parentEl.appendChild(contentEl);

    let specialContainerEl;

    if (panelName === 'Module Store') {
      specialContainerEl = document.createElement('div');

      specialContainerEl.style.display = 'flex';
      specialContainerEl.style.flexDirection = 'row';
      specialContainerEl.style.flexWrap = 'wrap';
    }


    let i = 0;
    for (let e of content.slice(1)) {
      let el;

      switch (e.type) {
        case 'header':
          el = document.createElement('h2');

          if (i !== 0) {
            el.classList.add('marginTop20-3TxNs6');
          }

          el.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'h5-18_1nd', 'title-3sZWYQ', 'marginBottom8-AtZOdT');

          el.textContent = e.text;
          break;

        case 'toggle': {
          el = document.createElement('div');

          el.classList.add('marginBottom20-32qID7');

          let txtEl = document.createElement('span');
          txtEl.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

          txtEl.style.float = 'left';

          txtEl.innerHTML = e.text;

          let checked = e.isToggled();

          let toggleEl = document.createElement('div');
          toggleEl.className = 'control-2BBjec';
          
          let offHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(114, 118, 125);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: -3px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(114, 118, 125, 1)" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path><path fill="rgba(114, 118, 125, 1)" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';
          let onHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(67, 181, 129);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: 12px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(67, 181, 129, 1)" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path><path fill="rgba(67, 181, 129, 1)" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';

          let fn = () => {
            checked = !checked;

            if (checked) {
              toggleEl.innerHTML = onHTML;
            } else {
              toggleEl.innerHTML = offHTML;
            }

            e.onToggle(checked, el);
          };

          toggleEl.onclick = fn;
          txtEl.onclick = fn;

          el.appendChild(txtEl);
          el.appendChild(toggleEl);

          toggleEl.innerHTML = checked ? onHTML : offHTML;

          toggleEl.style.float = 'right';

          if (e.subtext) {
            let subtextEl = document.createElement('div');

            subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

            subtextEl.textContent = e.subtext;

            subtextEl.style.clear = 'both';

            el.appendChild(subtextEl);
          }

          let dividerEl = document.createElement('div');

          dividerEl.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
          dividerEl.style.marginTop = e.subtext ? '20px' : '45px';

          el.appendChild(dividerEl);

          break;
        }

          case 'text':
            el = document.createElement('div');

            el.classList.add('marginBottom20-32qID7');

            let textEl = document.createElement('span');
            textEl.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

            textEl.style.float = 'left';

            textEl.innerHTML = e.text;

            el.appendChild(textEl);

            if (e.subtext) {
              let subtextEl = document.createElement('div');

              subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

              subtextEl.innerHTML = e.subtext;

              subtextEl.style.clear = 'both';

              el.appendChild(subtextEl);
            }

            let dividerEl_ = document.createElement('div');

            dividerEl_.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
            dividerEl_.style.marginTop = e.subtext ? '20px' : '45px';

            el.appendChild(dividerEl_);

          break;

        case 'text-and-danger-button':
          el = document.createElement('div');

          el.classList.add('marginBottom20-32qID7');

          let txtEl2 = document.createElement('span');
          txtEl2.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

          txtEl2.style.float = 'left';

          txtEl2.innerHTML = e.text;

          let buttonEl = document.createElement('div');
          buttonEl.classList.add('button-38aScr', 'lookOutlined-3sRXeN', 'colorRed-1TFJan', 'sizeSmall-2cSMqn', 'grow-q77ONN');

          buttonEl.onclick = () => {
            e.onclick(buttonEl);
          };

          buttonEl.style.cursor = 'pointer';

          buttonEl.style.float = 'right';

          let contentsEl2 = document.createElement('div');

          contentsEl2.classList.add('contents-18-Yxp');

          contentsEl2.textContent = e.buttonText;

          buttonEl.appendChild(contentsEl2);

          el.appendChild(txtEl2);
          el.appendChild(buttonEl);

          if (e.subtext) {
            let subtextEl = document.createElement('div');

            subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

            subtextEl.textContent = e.subtext;

            subtextEl.style.clear = 'both';

            el.appendChild(subtextEl);
          }

          let dividerEl2 = document.createElement('div');

          dividerEl2.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
          dividerEl2.style.marginTop = e.subtext ? '20px' : '45px';

          el.appendChild(dividerEl2);

          break;

          case 'text-and-button':
            el = document.createElement('div');

            el.classList.add('marginBottom20-32qID7');

            let txtEl3 = document.createElement('span');
            txtEl3.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

            txtEl3.style.float = 'left';

            txtEl3.innerHTML = e.text;

            let buttonEl2 = document.createElement('div');
            buttonEl2.classList.add('button-38aScr', 'lookFilled-1Gx00P', 'colorBrand-3pXr91', 'sizeSmall-2cSMqn', 'grow-q77ONN');

            buttonEl2.onclick = () => {
              e.onclick(buttonEl2);
            };

            buttonEl2.style.cursor = 'pointer';

            buttonEl2.style.float = 'right';

            let contentsEl3 = document.createElement('div');

            contentsEl3.classList.add('contents-18-Yxp');

            contentsEl3.textContent = e.buttonText;

            buttonEl2.appendChild(contentsEl3);

            el.appendChild(txtEl3);
            el.appendChild(buttonEl2);

            if (e.subtext) {
              let subtextEl2 = document.createElement('div');

              subtextEl2.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

              subtextEl2.textContent = e.subtext;

              subtextEl2.style.clear = 'both';

              el.appendChild(subtextEl2);
            }

            let dividerEl3 = document.createElement('div');

            dividerEl3.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
            dividerEl3.style.marginTop = e.subtext ? '20px' : '45px';

            el.appendChild(dividerEl3);

            break;

        case 'button':
          el = document.createElement('button');

          el.classList.add('button-38aScr', 'lookFilled-1Gx00P', 'colorBrand-3pXr91', 'sizeSmall-2cSMqn', 'grow-q77ONN');

          if (e.width) {
            el.style.width = `${e.width}px`;
          }

          let contentsEl = document.createElement('div');

          contentsEl.classList.add('contents-18-Yxp');

          contentsEl.textContent = e.text;

          el.appendChild(contentsEl);

          el.onclick = e.onclick;

          break;

        case 'toggle-text-button': {
          el = document.createElement('div');

          el.classList.add('marginBottom20-32qID7');

          let checked = e.isToggled();

          let toggleEl = document.createElement('div');
          toggleEl.className = 'control-2BBjec';
          
          let offHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(114, 118, 125);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: -3px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(114, 118, 125, 1)" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path><path fill="rgba(114, 118, 125, 1)" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';
          let onHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(67, 181, 129);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: 12px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(67, 181, 129, 1)" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path><path fill="rgba(67, 181, 129, 1)" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';

          toggleEl.innerHTML = checked ? onHTML : offHTML;

          let fn = () => {
            checked = !checked;

            if (checked) {
              toggleEl.innerHTML = onHTML;
            } else {
              toggleEl.innerHTML = offHTML;
            }

            e.onToggle(checked, el);
          };

          toggleEl.onclick = fn;

          toggleEl.style.float = 'left';
          toggleEl.style.marginRight = '8px';

          el.appendChild(toggleEl);

          let txtEl = document.createElement('span');

          txtEl.onclick = fn;

          txtEl.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

          txtEl.style.float = 'left';

          txtEl.innerHTML = e.text;

          let buttonEl = document.createElement('div');
          buttonEl.classList.add('button-38aScr', 'lookFilled-1Gx00P', 'colorBrand-3pXr91', 'sizeSmall-2cSMqn', 'grow-q77ONN');

          buttonEl.onclick = () => {
            e.onclick(buttonEl);
          };

          buttonEl.style.cursor = 'pointer';

          buttonEl.style.float = 'right';

          let contentsEl = document.createElement('div');

          contentsEl.classList.add('contents-18-Yxp');

          contentsEl.textContent = e.buttonText;

          buttonEl.appendChild(contentsEl);

          el.appendChild(txtEl);
          el.appendChild(buttonEl);

          if (e.subtext) {
            let subtextEl = document.createElement('div');

            subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

            subtextEl.textContent = e.subtext;

            subtextEl.style.clear = 'both';

            el.appendChild(subtextEl);
          }

          let dividerEl = document.createElement('div');

          dividerEl.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
          dividerEl.style.marginTop = e.subtext ? '20px' : '45px';

          el.appendChild(dividerEl);

          break;
        }

        case 'toggle-text-danger-button': {
          el = document.createElement('div');

          el.classList.add('marginBottom20-32qID7');

          let checked = e.isToggled();

          let toggleEl = document.createElement('div');
          toggleEl.className = 'control-2BBjec';
          
          let offHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(114, 118, 125);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: -3px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(114, 118, 125, 1)" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path><path fill="rgba(114, 118, 125, 1)" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';
          let onHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(67, 181, 129);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: 12px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(67, 181, 129, 1)" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path><path fill="rgba(67, 181, 129, 1)" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';

          toggleEl.innerHTML = checked ? onHTML : offHTML;

          let fn = () => {
            checked = !checked;

            if (checked) {
              toggleEl.innerHTML = onHTML;
            } else {
              toggleEl.innerHTML = offHTML;
            }

            e.onToggle(checked, el);
          };

          toggleEl.onclick = fn;

          toggleEl.style.float = 'left';
          toggleEl.style.marginRight = '8px';

          el.appendChild(toggleEl);

          let txtEl = document.createElement('span');

          txtEl.onclick = fn;

          txtEl.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

          txtEl.style.float = 'left';

          txtEl.innerHTML = e.text;

          let buttonEl = document.createElement('div');
          buttonEl.classList.add('button-38aScr', 'lookOutlined-3sRXeN', 'colorRed-1TFJan', 'sizeSmall-2cSMqn', 'grow-q77ONN');

          buttonEl.onclick = () => {
            e.onclick(buttonEl);
          };

          buttonEl.style.cursor = 'pointer';

          buttonEl.style.float = 'right';

          let contentsEl = document.createElement('div');

          contentsEl.classList.add('contents-18-Yxp');

          contentsEl.textContent = e.buttonText;

          buttonEl.appendChild(contentsEl);

          el.appendChild(txtEl);
          el.appendChild(buttonEl);

          if (e.subtext) {
            let subtextEl = document.createElement('div');

            subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

            subtextEl.textContent = e.subtext;

            subtextEl.style.clear = 'both';

            el.appendChild(subtextEl);
          }

          let dividerEl = document.createElement('div');

          dividerEl.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
          dividerEl.style.marginTop = e.subtext ? '20px' : '45px';

          el.appendChild(dividerEl);

          break;
        }

        case 'card': {
          el = document.createElement('div');

          el.style.backgroundColor = 'var(--background-secondary)';

          el.style.borderRadius = '8px';

          el.style.padding = '12px';
          el.style.margin = '10px';

          el.style.width = '310px';
          el.style.height = '170px';

          el.style.position = 'relative';

          let checked = e.isToggled();

          let toggleEl = document.createElement('div');
          toggleEl.classList.add('control-2BBjec');
          
          let offHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(114, 118, 125);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: -3px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(114, 118, 125, 1)" d="M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z"></path><path fill="rgba(114, 118, 125, 1)" d="M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';
          let onHTML = '<div class="container-3auIfb" tabindex="-1" style="opacity: 1; background-color: rgb(67, 181, 129);"><svg class="slider-TkfMQL" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet" style="left: 12px;"><rect fill="white" x="4" y="0" height="20" width="20" rx="10"></rect><svg viewBox="0 0 20 20" fill="none"><path fill="rgba(67, 181, 129, 1)" d="M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z"></path><path fill="rgba(67, 181, 129, 1)" d="M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z"></path></svg></svg><input id="uid_328" type="checkbox" class="input-rwLH4i" tabindex="0"></div>';

          toggleEl.innerHTML = checked ? onHTML : offHTML;

          let fn = () => {
            checked = !checked;

            if (checked) {
              toggleEl.innerHTML = onHTML;
            } else {
              toggleEl.innerHTML = offHTML;
            }

            e.onToggle(checked, el);
          };

          toggleEl.onclick = fn;

          toggleEl.style.float = 'left';
          toggleEl.style.marginRight = '8px';

          if (e.showToggle) el.appendChild(toggleEl);

          let txtEl = document.createElement('span');
          
          if (!e.showToggle) {
            txtEl.style.cursor = 'auto';
          } else {
            txtEl.onclick = fn;
          }

          txtEl.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');

          txtEl.innerHTML = e.text;

          let buttonEl = document.createElement('div');
          buttonEl.classList.add('button-38aScr', e.buttonType === 'danger' ? 'lookOutlined-3sRXeN' : 'lookFilled-1Gx00P', e.buttonType === 'danger' ? 'colorRed-1TFJan' : 'colorBrand-3pXr91', 'sizeSmall-2cSMqn', 'grow-q77ONN');

          buttonEl.onclick = () => {
            e.onclick(buttonEl);
          };

          buttonEl.style.cursor = 'pointer';

          buttonEl.style.width = '90px';

          let contentsEl = document.createElement('div');

          contentsEl.classList.add('contents-18-Yxp');

          contentsEl.textContent = e.buttonText;

          buttonEl.appendChild(contentsEl);

          el.appendChild(txtEl);

          if (e.subtext) {
            let subtextEl = document.createElement('div');

            subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

            subtextEl.textContent = e.subtext;

            subtextEl.style.clear = 'both';

            el.appendChild(subtextEl);
          }

          let bottomContainerEl = document.createElement('div');

          bottomContainerEl.style.position = 'absolute';
          bottomContainerEl.style.bottom = '12px';
          bottomContainerEl.style.width = 'calc(100% - 32px)';

          bottomContainerEl.appendChild(buttonEl);

          if (e.subtext2) {
            let subtext2El = document.createElement('div');

            subtext2El.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');

            subtext2El.textContent = e.subtext2;

            subtext2El.style.position = 'absolute';
            subtext2El.style.right = '-8px';
            subtext2El.style.top = '10px';

            bottomContainerEl.appendChild(subtext2El);
          }

          el.appendChild(bottomContainerEl);

          /*let dividerEl = document.createElement('div');

          dividerEl.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
          dividerEl.style.marginTop = e.subtext ? '20px' : '45px';

          el.appendChild(dividerEl);*/

          break;
        }

        case 'search': {
          el = document.createElement('div');
          el.classList.add('search-2oPWTC');

          el.innerHTML = `<div class="searchBar-3dMhjb" role="combobox" aria-label="Search" aria-owns="search-results" aria-expanded="false"><div class="DraftEditor-root"><div class="public-DraftEditorPlaceholder-root"><div class="public-DraftEditorPlaceholder-inner" id="placeholder-8kh0r" style="white-space: pre-wrap;">Search</div></div><div class="DraftEditor-editorContainer"><div aria-describedby="placeholder-8kh0r" class="notranslate public-DraftEditor-content" contenteditable="true" role="textbox" spellcheck="false" style="outline: none; user-select: text; white-space: pre-wrap; overflow-wrap: break-word;"><div data-contents="true"><div class="" data-block="true" data-editor="8kh0r" data-offset-key="4l6d8-0-0"><div data-offset-key="4l6d8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4l6d8-0-0"><br data-text="true"></span></div></div></div></div></div></div><div class="icon-38sknP iconLayout-1WxHy4 small-1lPjda" tabindex="-1" aria-hidden="true" aria-label="Clear search" role="button"><div class="iconContainer-O4O2CN"><svg class="icon-3cZ1F_ visible-3V0mGj" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path></svg><svg class="icon-3cZ1F_" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg></div></div></div>`;

          let searchbar = el.children[0];

          searchbar.style.width = 'auto';
          searchbar.style.height = '32px';

          if (e.storeSpecific) {
            el.style.marginLeft = '20px';

            el.style.width = '50%'; // Force next element (a card) to go to next line
            el.style.flexGrow = '1'; // Actually grow to fit the whole line
          }

          let root = el.querySelector('.DraftEditor-root');

          root.style.height = '34px';
          root.style.lineHeight = '28px';

          let icons = [...el.getElementsByClassName('icon-3cZ1F_')];

          let iconsContainers = [el.querySelector('.icon-38sknP'), el.querySelector('.iconContainer-O4O2CN'), ...icons];

          iconsContainers[0].style.marginTop = '7px';
          iconsContainers[0].style.marginRight = '4px';

          for (let x of iconsContainers) {
            x.style.width = '20px';
            x.style.height = '20px';
          }

          el.querySelector('.DraftEditor-editorContainer').style.height = '34px';

          let placeholder = el.querySelector('#placeholder-8kh0r');

          let edible = el.querySelector('[contenteditable=true]');

          let inputContainer = edible.children[0].children[0];

          edible.oninput = () => {
            const input = edible.innerText.replace('\n', '');
            const isEmpty = input.length < 1;

            icons[0].style.opacity = isEmpty ? '1' : '0';

            icons[1].style.opacity = isEmpty ? '0' : '1';
            icons[1].style.cursor = isEmpty ? 'auto' : 'pointer';

            placeholder.style.display = isEmpty ? 'block' : 'none';

            e.onchange(input, contentEl);
          };

          icons[1].onclick = () => {
            inputContainer.innerHTML = '';

            edible.oninput();
          };

          break;
        }
      }

      if (specialContainerEl) { // && i > 1
        specialContainerEl.appendChild(el);
      } else {
        contentEl.appendChild(el);
      }

      i++;
    }

    if (specialContainerEl) {
      contentEl.appendChild(specialContainerEl);
    }

    let el = document.createElement('div');

    el.classList.add(settingsClasses['item']);
    el.classList.add(settingsClasses['themed']);

    if (danger) {
      el.style.color = 'rgb(240, 71, 71)';

      el.onmouseenter = () => {
        el.style.backgroundColor = 'rgba(240, 71, 71, 0.1)';
      };

      el.onmouseleave = () => {
        el.style.backgroundColor = 'unset';
      };
    }

    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');

    el.innerText = panelName;

    el.onclick = async () => {
      if (clickHandler !== undefined) {
        clickHandler();

        return; 
      }

      setTimeout(() => {
        settingsMainEl.firstChild.innerHTML = '';
        settingsMainEl.firstChild.appendChild(parentEl);

        for (let e of settingsSidebarEl.children) {
          e.classList.remove(settingsClasses['selected']);
        }

        el.classList.add(settingsClasses['selected']);
      }, 10);
    };

    settingsSidebarEl.addEventListener('click', () => {
      if (globalThis.removed === true) return;

      el.classList.remove(settingsClasses['selected']);
    });

    if (panelName === 'Manage Modules' && window.DiscordNative === undefined) return;

    settingsSidebarGooseModContainer.appendChild(el);
  },

  _createHeading: (headingName) => {
    let el = document.createElement('div');
    el.className = settingsClasses['header'];

    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');

    el.innerText = headingName;

    settingsSidebarGooseModContainer.appendChild(el);
  },

  _createSeparator: () => {
    let el = document.createElement('div');
    el.className = settingsClasses['separator'];

    settingsSidebarGooseModContainer.appendChild(el);
  }
};

globalThis.settings = settings;

let tryingToInject = false;

export const injectInSettings = async () => {
  if (globalThis.removed) return;

  if (tryingToInject) return;

  tryingToInject = true;

  settingsLayerEl = undefined;

  while (!settingsLayerEl) {
    settingsLayerEl = document.querySelector('div[aria-label="USER_SETTINGS"]');
    await sleep(2);
  }

  settingsSidebarEl = settingsLayerEl.querySelector('nav > div');

  if (settingsSidebarEl.classList.contains('goosemod-settings-injected')) return;

  settingsSidebarEl.classList.add('goosemod-settings-injected');

  settingsClasses = {};

  for (let e of settingsSidebarEl.children) {
    for (let c of e.classList) {
      let name = c.split('-')[0];

      if (settingsClasses[name] === undefined) {
        settingsClasses[name] = c;
      }
    }
  }

  settingsSidebarGooseModContainer = document.createElement('div');
  settingsSidebarEl.insertBefore(settingsSidebarGooseModContainer, settingsSidebarEl.childNodes[settingsSidebarEl.childElementCount - 4]);//settingsSidebarEl.querySelector(`.${settingsClasses.item}:not(${settingsClasses.themed}) ~ ${settingsClasses.item}:not(${settingsClasses.themed})`));

  let el = document.createElement('div');
  el.className = settingsClasses['separator'];

  settingsSidebarEl.insertBefore(el, settingsSidebarGooseModContainer.nextSibling); //.insertBefore(settingsSidebarGooseModContainer, settingsSidebarEl.childNodes[settingsSidebarEl.childElementCount - 4]);//settingsSidebarEl.querySelector(`.${settingsClasses.item}:not(${settingsClasses.themed}) ~ ${settingsClasses.item}:not(${settingsClasses.themed})`));
  
  let versionEl = document.createElement('div');
  versionEl.classList.add('colorMuted-HdFt4q', 'size12-3cLvbJ');

  versionEl.textContent = `GooseMod ${globalThis.version} (${globalThis.versionHash.substring(0, 7)})`;

  settingsSidebarEl.lastChild.appendChild(versionEl);

  let versionElUntethered = document.createElement('div');
  versionElUntethered.classList.add('colorMuted-HdFt4q', 'size12-3cLvbJ');

  versionElUntethered.textContent = `GooseMod Untethered ${globalThis.untetheredVersion || 'N/A'}`;

  settingsSidebarEl.lastChild.appendChild(versionElUntethered);

  settingsMainEl = settingsLayerEl.querySelector('main');

  globalThis.settings.createFromItems();

  tryingToInject = false;
};

export const checkSettingsOpenInterval = setInterval(async () => {
  if (tryingToInject) return;

  let el = document.querySelector('div[aria-label="USER_SETTINGS"]');
  if (el && !el.querySelector('nav > div').classList.contains('goosemod-settings-injected')) {
    await globalThis.injectInSettings();
  }
}, 100);

globalThis.settings.createHeading('GooseMod');

globalThis.settings.createItem('Manage Modules', ['',
  {
    type: 'button',
    text: 'Import Local Modules',
    onclick: async () => {
      let files = await globalThis.importModulesFull();

      for (let f of files) {
        let n = f.filename.split('.').slice(0, -1).join('.');

        if (globalThis.modules[n].onLoadingFinished !== undefined) {
          await globalThis.modules[n].onLoadingFinished();
        }
      }

      globalThis.settings.createFromItems();
      globalThis.openSettingItem('Manage Modules');
    },
  },

  {
    type: 'header',
    text: 'Imported Modules'
  }
]);

globalThis.settings.createItem('Module Store', ['',
  {
    type: 'button',
    text: 'Update Index',
    onclick: async () => {
      await globalThis.moduleStoreAPI.updateModules();

      await globalThis.moduleStoreAPI.updateStoreSetting();

      globalThis.settings.createFromItems();

      globalThis.openSettingItem('Module Store');
    },
    width: 120
  },
  {
    type: 'search',
    onchange: async (inp, parentEl) => {
      const fuzzyReg = new RegExp(`.*${inp}.*`, 'i');

      const cards = [...parentEl.children[0].children].filter((x) => !x.className);

      for (let c of cards) {
        const name = c.getElementsByClassName('title-31JmR4')[0].childNodes[0].wholeText;
        const description = c.getElementsByClassName('description-3_Ncsb')[1].innerText;

        const matches = (fuzzyReg.test(name) || fuzzyReg.test(description));

        console.log(name, description, matches);

        c.style.display = matches ? 'block' : 'none';
      }
    },
    storeSpecific: true
  }
]);

globalThis.settings.createSeparator();

globalThis.settings.createItem('Uninstall', [""], async () => {
  if (await globalThis.confirmDialog('Uninstall', 'Uninstall GooseMod', 'Are you sure you want to uninstall GooseMod? This is a quick uninstall, it may leave some code behind but there should be no remaining noticable changes.')) {
    globalThis.closeSettings();

    globalThis.remove();
  }
}, true);

if (window.DiscordNative !== undefined) {
  globalThis.settings.createItem('Local Reinstall', [''], async () => {
    if (await globalThis.confirmDialog('Reinstall', 'Reinstall GooseMod', 'Are you sure you want to reinstall GooseMod? This will uninstall GooseMod, then ask you for the inject.js file, then run it to reinstall.')) {
      globalThis.closeSettings();

      globalThis.remove();

      eval(ab2str((await DiscordNative.fileManager.openFiles())[0].data));
    }
  }, true);
}

globalThis.settings.createSeparator();

globalThis.settings.createHeading('GooseMod Modules');