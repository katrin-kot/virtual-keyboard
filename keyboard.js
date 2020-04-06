const keyArr = [
  {
    ru: 'ё',
    en: '`',
  },
  {
    ru: '1',
    en: '1',
  },
  {
    ru: '2',
    en: '2',
  },
  {
    ru: '3',
    en: '3',
  },
  {
    ru: '4',
    en: '4',
  },
  {
    ru: '5',
    en: '5',
  },
  {
    ru: '6',
    en: '6',
  },
  {
    ru: '7',
    en: '7',
  },
  {
    ru: '8',
    en: '8',
  },
  {
    ru: '9',
    en: '9',
  },
  {
    ru: '0',
    en: '0',
  },
  {
    ru: '-',
    en: '-',
  },
  {
    ru: '=',
    en: '=',
  },
  {
    ru: 'Backspace',
    en: 'Backspace',
  },
  {
    ru: 'Tab',
    en: 'Tab',
  },
  {
    ru: 'й',
    en: 'q',
  },
  {
    ru: 'ц',
    en: 'w',
  },
  {
    ru: 'у',
    en: 'e',
  },
  {
    ru: 'к',
    en: 'r',
  },
  {
    ru: 'е',
    en: 't',
  },
  {
    ru: 'н',
    en: 'y',
  },
  {
    ru: 'г',
    en: 'u',
  },
  {
    ru: 'ш',
    en: 'i',
  },
  {
    ru: 'щ',
    en: 'o',
  },
  {
    ru: 'з',
    en: 'p',
  },
  {
    ru: 'х',
    en: '[',
  },
  {
    ru: 'ъ',
    en: ']',
  },
  {
    ru: 'Backslash',
    en: 'Backslash',
  },
  {
    ru: 'CapsLock',
    en: 'CapsLock',
  },
  {
    ru: 'ф',
    en: 'a',
  },
  {
    ru: 'ы',
    en: 's',
  },
  {
    ru: 'в',
    en: 'd',
  },
  {
    ru: 'а',
    en: 'f',
  },
  {
    ru: 'п',
    en: 'g',
  },
  {
    ru: 'р',
    en: 'h',
  },
  {
    ru: 'о',
    en: 'j',
  },
  {
    ru: 'л',
    en: 'k',
  },
  {
    ru: 'д',
    en: 'l',
  },
  {
    ru: 'ж',
    en: ';',
  },
  {
    ru: 'э',
    en: "'",
  },
  {
    ru: 'Enter',
    en: 'Enter',
  },
  {
    ru: 'ShiftLeft',
    en: 'ShiftLeft',
  },
  {
    ru: 'я',
    en: 'z',
  },
  {
    ru: 'ч',
    en: 'x',
  },
  {
    ru: 'с',
    en: 'c',
  },
  {
    ru: 'м',
    en: 'v',
  },
  {
    ru: 'и',
    en: 'b',
  },
  {
    ru: 'т',
    en: 'n',
  },
  {
    ru: 'ь',
    en: 'm',
  },
  {
    ru: 'б',
    en: ',',
  },
  {
    ru: 'ю',
    en: '.',
  },
  {
    ru: '.',
    en: '/',
  },
  {
    ru: 'ArrowUp',
    en: 'ArrowUp',
  },
  {
    ru: 'ShiftRight',
    en: 'ShiftRight',
  },
  {
    ru: 'ControlLeft',
    en: 'ControlLeft',
  },
  {
    ru: 'Meta',
    en: 'Meta',
  },
  {
    ru: 'AltLeft',
    en: 'AltLeft',
  },
  {
    ru: 'Space',
    en: 'Space',
  },
  {
    ru: 'AltRight',
    en: 'AltRight',
  },
  {
    ru: 'ArrowLeft',
    en: 'ArrowLeft',
  },
  {
    ru: 'ArrowDown',
    en: 'ArrowDown',
  },
  {
    ru: 'ArrowRight',
    en: 'ArrowRight',
  },
  {
    ru: 'ControlRight',
    en: 'ControlRight',
  },
];

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    text: null,
    keys: [],
    textarea: null,
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shiftPressed: false,
    language: localStorage.getItem('language') || 'en',
  },

  init() {
    const body = document.querySelector('body');
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.setAttribute('autofocus', 'autofocus');
    body.appendChild(this.elements.textarea);
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.text = document.createElement('p');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__buttons');
    this.elements.keysContainer.appendChild(this.createButtons());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      '.keyboard__buttons',
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    document.body.appendChild(this.elements.text);
    this.elements.text.innerHTML = 'Клавиатура сделана в системе Windows.Язык клавиатуры переключается комбинацией ShiftLeft + AltLeft';
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ShiftLeft') {
        this.properties.shiftPressed = true;
      }
      if (event.code === 'AltLeft' && this.properties.shiftPressed) {
        if (this.properties.language === 'en') {
          this.properties.language = 'ru';
        } else {
          this.properties.language = 'en';
        }
        localStorage.setItem('language', this.properties.language);
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.appendChild(this.createButtons());
        this.properties.shiftPressed = false;
      }
    });

    document.addEventListener('keydown', (event) => {
      const button = document.querySelector(`[data-key="${event.code}"]`);
      if (button) {
        button.classList.add('clicked');
      }
    });
    document.addEventListener('keyup', (event) => {
      const button = document.querySelector(`[data-key="${event.code}"]`);
      if (button) {
        button.classList.remove('clicked');
      }
    });

    document.addEventListener('keydown', (event) => {
      const button = document.querySelector(
        `[data-key="${event.key.toLowerCase()}"]`,
      );
      if (button) {
        button.classList.add('clicked');
      }
    });
    document.addEventListener('keyup', (event) => {
      const button = document.querySelector(
        `[data-key="${event.key.toLowerCase()}"]`,
      );
      if (button) {
        button.classList.remove('clicked');
      }
    });

    // Automatically use keyboard for elements with textarea
    document.querySelectorAll('textarea').forEach((element) => {
      this.open(element.value, (currentValue) => {
        this.elements.textarea.focus();
        // eslint-disable-next-line no-param-reassign
        element.value = currentValue;
      });
    });
  },

  createButtons() {
    const fragment = document.createDocumentFragment();
    keyArr.forEach((item) => {
      const key = item[this.properties.language];
      const button = document.createElement('button');
      button.classList.add(`${key}`);

      // Add attributes/classes
      button.setAttribute('type', 'button');
      button.setAttribute('data-key', `${key}`);
      button.classList.add('keyboard__button');

      switch (key) {
        case 'Backspace':
          button.classList.add('backspace');
          button.innerHTML = '<span>&lArr;</span>';
          button.addEventListener('click', () => {
            const cursorPosition = this.elements.textarea.selectionStart;
            this.properties.value = this.elements.textarea.value;
            this.properties.value = this.properties.value.slice(0, cursorPosition - 1)
              + this.properties.value.slice(cursorPosition);
            this.elements.textarea.value = this.properties.value;
            this.elements.textarea.focus();
            this.elements.textarea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
          });

          break;

        case 'CapsLock':
          button.innerHTML = 'CapsLock';
          button.addEventListener('click', () => {
            if (!this.properties.capsLock) {
              button.classList.add('clicked');
              this.properties.capsLock = true;
            } else {
              button.classList.remove('clicked');
              this.properties.capsLock = false;
            }
          });
          break;

        case 'Enter':
          button.classList.add('enter');
          button.innerHTML = 'Enter';
          button.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'Space':
          button.innerHTML = ' ';
          button.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'ArrowUp':
          button.innerHTML = '<span>&uarr;</span>';

          button.addEventListener('click', () => {
            this.properties.value += button.textContent;
            this.triggerEvent('oninput');
          });

          break;

        case 'ArrowDown':
          button.innerHTML = '<span>&darr;</span>';
          button.addEventListener('click', () => {
            this.properties.value += button.textContent;
            this.triggerEvent('oninput');
          });

          break;
        case 'ArrowLeft':
          button.innerHTML = '<span>&larr;</span>';
          button.addEventListener('click', () => {
            this.properties.value += button.textContent;
            this.triggerEvent('oninput');
          });

          break;
        case 'ArrowRight':
          button.innerHTML = '<span>&rarr;</span>';
          button.addEventListener('click', () => {
            this.properties.value += button.textContent;
            this.triggerEvent('oninput');
          });

          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          button.innerHTML = 'shift';
          button.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'ControlRight':
        case 'ControlLeft':
          button.innerHTML = 'ctrl';
          button.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;
        case 'AltLeft':
        case 'AltRight':
          button.innerHTML = 'alt';
          button.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;
        case 'Tab':
          button.innerHTML = 'tab';
          button.addEventListener('click', () => {
            // eslint-disable-next-line no-tabs
            this.properties.value += '	';
            this.triggerEvent('oninput');
          });

          break;
        case 'Meta':
          button.innerHTML = 'win';
          button.addEventListener('click', () => {
            this.properties.value += '';
            this.triggerEvent('oninput');
          });

          break;

        case 'Backslash':
          button.innerHTML = '<span>\\</span>';
          button.addEventListener('click', () => {
            this.properties.value += '\\';
            this.triggerEvent('oninput');
          });

          break;
        default:
          button.textContent = key.toLowerCase();
          button.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this.triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(button);
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
