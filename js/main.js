 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		$('body').on('click', '.site-mobile-menu .site-nav-wrap a[href^="#"]', function() {
			$('body').removeClass('offcanvas-menu');
			$('.js-menu-toggle').removeClass('active');
		});

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();

	var siteStickyHeader = function() {
		var $navbar = $('.site-navbar-wrap');
		var stickAfter = 140;

		function updateHeader() {
			if ($(window).width() >= 992 && $(window).scrollTop() > stickAfter) {
				$navbar.addClass('is-stuck');
			} else {
				$navbar.removeClass('is-stuck');
			}
		}

		updateHeader();
		$(window).on('scroll resize', updateHeader);
	};
	siteStickyHeader();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteWhatsAppForms = function() {
		var whatsappNumber = '212624772348';

		$('.js-whatsapp-form').on('submit', function(e) {
			e.preventDefault();

			var $form = $(this);
			var formType = $form.data('whatsapp-type');
			var message = '';

			if (formType === 'appointment') {
				message = [
					'Bonjour, je souhaite prendre rendez-vous au cabinet dentaire Dr. Akram Lefrarni.',
					'Prenom: ' + ($form.find('[name="fname"]').val() || ''),
					'Nom: ' + ($form.find('[name="lname"]').val() || ''),
					'Date souhaitee: ' + ($form.find('[name="date"]').val() || ''),
					'Contact: ' + ($form.find('[name="contact"]').val() || ''),
					'Soin souhaite: ' + ($form.find('[name="treatment"]').val() || ''),
					'Message: ' + ($form.find('[name="note"]').val() || '')
				].join('\n');
			} else {
				message = [
					'Bonjour, je souhaite contacter le cabinet dentaire Dr. Akram Lefrarni.',
					'Nom complet: ' + ($form.find('[name="fullname"]').val() || ''),
					'Email: ' + ($form.find('[name="email"]').val() || ''),
					'Message: ' + ($form.find('[name="message"]').val() || '')
				].join('\n');
			}

			window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message), '_blank');
		});
	};
	siteWhatsAppForms();

});
