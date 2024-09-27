((win, $) => {
  const SimpleKeyboard = win.SimpleKeyboard.default;

  // ! 주의사항 "as-IN" 은 iOS / AOS 처리가 다름
  const numberFormat = new Intl.NumberFormat("as-EN", {
    style: "currency",
    currency: "INR",
  });

  const CUSTOM_BUTTONS = {
    ALL_DELETE: "{custom_all_delete}",
  };

  // ! 기본 디자인 시안에 맞춰서 구성해본 기능으로 사용하지 않으셔도 됩니다
  const toDisplayValueFormat = (value) => {
    // ! 12345 -> ₹ 12,345.00
    return numberFormat.formatToParts(value).reduce((acc, { type, value }) => {
      const addValue = type === "currency" ? `${value} ` : value;

      return acc + addValue;
    }, "");
  };

  const createKeyboard = (mode, container, input) => {
    const keyboard = new SimpleKeyboard(container, {
      // ! 테마 설정 값 기준으로 style class 부여 가능(활용시 지정한 theme class 명 기준으로 스타일 재선언 필요)
      // theme: "hmg-pay-number-keypad",
      layout: {
        // prettier-ignore
        default: [
          "1 2 3",
          "4 5 6",
          "7 8 9",
          `${CUSTOM_BUTTONS.ALL_DELETE} 0 {bksp}`
        ],
        // prettier-enable
      },
      // ! layout 에 설정한 키값 문자열을 노출하고 싶은 형태로 맵핑(html 형태로 주입됨)
      display: {
        [CUSTOM_BUTTONS.ALL_DELETE]: /* html */ `
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.1684 17.7103C27.7007 18.7814 28 19.9887 28 21.2659C28 25.6842 24.4183 29.2659 20 29.2659C15.5817 29.2659 12 25.6842 12 21.2659C12 16.8476 15.5556 13.2659 20 13.2659C20.9236 13.2659 21.7778 13.2659 22.6668 13.2664M22.6668 13.2664L20.0001 10.5996M22.6668 13.2664L20.0001 15.9332" stroke="#05141F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `,
        "{//}": /* html */ `&nbsp;`,
        "{bksp}": /* html */ `
          <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 612 612" style="width:25px;height:25px;fill:#707070;">
            <path d="M561,76.5H178.5c-17.85,0-30.6,7.65-40.8,22.95L0,306l137.7,206.55c10.2,12.75,22.95,22.95,40.8,22.95H561c28.05,0,51-22.95,51-51v-357C612,99.45,589.05,76.5,561,76.5z M484.5,397.8l-35.7,35.7L357,341.7l-91.8,91.8l-35.7-35.7l91.8-91.8l-91.8-91.8l35.7-35.7l91.8,91.8l91.8-91.8l35.7,35.7L392.7,306L484.5,397.8z"></path>
          </svg>
        `,
      },
      onChange: (value) => {
        if (mode === "top-up") {
          input.value = toDisplayValueFormat(value);

          return;
        }

        input.value = value;
      },
      onKeyPress(button) {
        if (button === CUSTOM_BUTTONS.ALL_DELETE) {
          keyboard.clearInput();

          return;
        }
      },
    });

    return keyboard;
  };

  $(() => {
    const $keyboardComponents = $(".js-keyboard-component");
    $.each($keyboardComponents, (_, component) => {
      const $component = $(component);
      const mode = $component.data("mode");
      const container = $component.find(".js-keyboard-container").get(0);
      const input = $component.find(".js-keyboard-input").get(0);

      const keyboard = createKeyboard(mode, container, input);

      $(component).data("keyboard", keyboard);
    });

    const $showToggleButtons = $(".js-keyboard-component .js-show-toggle");
    $showToggleButtons.on("click", (e) => {
      const $container = $(e.currentTarget).closest(".js-keyboard-component");

      $container.toggleClass("is-show");
    });

    const $topUpComponent = $(".js-keyboard-component[data-mode='top-up']");
    $topUpComponent.find(".js-btn-add").on("click", (e) => {
      const $target = $(e.currentTarget);
      const $input = $topUpComponent.find(".js-keyboard-input");

      const keyboard = $topUpComponent.data("keyboard");
      const inputValue = Number(keyboard.getInput() ?? "0");
      const value = Number($target.data("value"));
      const newValue = inputValue + value;

      keyboard.setInput(newValue);
      $input.val(toDisplayValueFormat(newValue));
    });
  });
})(window, window.jQuery);