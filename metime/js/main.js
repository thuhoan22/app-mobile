;(function (win, $) {
	'use strict';
	// local variable

	var swiperOnboard = new Swiper('.swiper-onboarding', {
		pagination: {
			el: '.swiper-pagination',
		},
	});

	var swiperAds = new Swiper('.swiper-ads', {
		slidesPerView: 'auto',
		spaceBetween: 12,
	});

	var swiperShortcut = new Swiper('.swiper-shortcut', {
		slidesPerView: 'auto',
		spaceBetween: 6,
	});

	var swiperServices = new Swiper('.swiper-services', {
		slidesPerView: 'auto',
		spaceBetween: 12,
	});

	var swiperOffer = new Swiper('.swiper-offer', {
		slidesPerView: 'auto',
		spaceBetween: 8,
	});

	var swiperDay = new Swiper('.swiper-day', {
		slidesPerView: 'auto',
		spaceBetween: 12,
	});

	// show popup
	var popupActive = function (btn,popup) {
		$(btn).on('click', function() {
			$('.layer').show();
			$('.dimmed').fadeIn();
			$(popup).animate({
				bottom: 0,
			}, {
				duration: 300,
				easing: 'swing'
			});
			$('body, html').css('overflow','hidden');
		});
	};

	// Popup
	var openPopup = function () {
		popupActive('.caseviewOpen','.popup-remind');
	};

	// close popup
	var closePopup = function () {
		$('.dimmed').on('click', function() {
			if($('.popup').hasClass('popup-center')) return;
			var popupHeight = $('.popup').outerHeight();
			$('.dimmed').fadeOut();
			$('.popup').animate({
			bottom: -popupHeight - 100,
			}, {
					duration: 300,
					easing: 'swing'
			});
			$('.popup').removeClass('on');
			$('body, html').css('overflow','visible');
		});
	};

	// Handle Select Option
	var handleSelectOption = function () {
		// Function dropdown
		$('.select-box').on('click', function(e) {
			e.stopPropagation();

			if ($(this).parents('.option-wrap').hasClass('is-open')) {
				$(this).parents('.option-wrap').removeClass('is-open');
			} else {
				$(this).parents('.option-wrap').find('.is-open').removeClass('is-open');
				$(this).parents('.option-wrap').addClass('is-open');
			}
		});

		// Click outsite
		$(document).on('click', function() {
			$('.option-wrap.is-open').removeClass('is-open');
		});

		// Get value
		$('.option-wrap').find('.option-list .option-item').on('click', function() {
			if(!$('.option-wrap').hasClass('js-option-img')) {
				var val = $(this).find('.option-text').text();

				$('.option-list .option-item').removeClass('is-selected');
				$(this).toggleClass('is-selected');
				$(this).parents('.option-wrap').find('.text-value').text(val);
			} else {
				console.log('aa');
				
				var src = $(this).find('.option-text img').attr('src');
				console.log(src);
				
				$('.option-list .option-item').removeClass('is-selected');
				$(this).toggleClass('is-selected');
				$(this).parents('.option-wrap').find('.text-value img').attr('src', src);
			}
		});
  }

	// Show/hide password
	var showHidePassword = function () {
		$('.js-show-hide-pass').click(function() {
			$(this).toggleClass('is-show');
			var input = $(this).parent().find('.js-input-type');
			if (input.attr('type') == 'password') {
				input.attr('type', 'text');
			} else {
				input.attr('type', 'password');
			}
	});
	}

	// Open GNB
	var gnbOpen = function () {
		var $btn_menu = $('.js-btn-menu');
	
		$btn_menu.on('click', function () {
			var $this = $(this),
					$thisExpanedStatus = $this.attr('aria-expanded');
	
			if ($thisExpanedStatus == 'false') {
				$this.addClass('is-active').attr('aria-expanded', 'true');
				$this.parents('.js-menu').find('.gnb').addClass('is-open');
				$this.parents('body').css('overflow','hidden');
			} else {
				$this.removeClass('is-active').attr('aria-expanded', 'false');
				$this.parents('.js-menu').find('.gnb').removeClass('is-open');
				$this.parents('body').css('overflow','');
			}
		});
	};

	// select Tab
	var selectTab = function () {
		$('.js-btn-tab').click(function () {
			$(this).closest('.tab-list').find('.tab-item').removeClass('is-active');
			$(this).parent('.tab-item').addClass('is-active');
			$('.tab-content .tab-panel').removeClass('is-active');
			$(this.id).addClass('is-active');
			console.log($(this.id));
			
		});
	}

	// Animation
	var animateElement = function () {
    var el = $('[data-animate]');
    el.each(function () {
      var $this = $(this),
        thisOffSetTop = $this.offset().top,
        windowScroll = $(window).scrollTop(),
        scrollPoint = windowScroll + $(window).innerHeight();

      if (thisOffSetTop < scrollPoint) {
        $this.addClass('fade-active');
      }
    });
  };

	$(win).scroll(function () {
		animateElement();
	});

	$(win).on('load', function () {
		openPopup();
		closePopup();
		handleSelectOption();
		showHidePassword();
		gnbOpen();
		selectTab();
		animateElement();
	});

})(window, window.jQuery);