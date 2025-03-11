(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();

    // FAQ Image Switching
    $(document).ready(function() {
        // Define images for each FAQ section
        const faqImages = {
            'collapseOne': 'img/home-ai.jpg',
            'collapseTwo': 'img/home-cloud.jpg',
            'collapseThree': 'img/homeprogamming.jpg',
            'collapseFour': 'img/homeapi.jpg',
            'collapseFive': 'img/homedata.jpg'
        };
        
        const $faqImage = $('#faqImage');
        const $aiText = $('<p class="mt-4 text-center w-100" id="aiText" style="display: none; font-family: \'Plus Jakarta Sans\', sans-serif;"></p>');
        
        const sectionTexts = {
            'collapseOne': 'We use different types of AI technology to build innovative and effective solutions. We choose the best AI tools for each project to meet your needs. We focus on creating smart solutions that help your business succeed',
            'collapseTwo': 'We work with many cloud computing tools to build solutions that can grow with your business. We pick the right cloud tools for your project to meet your needs. We aim to create secure and fast cloud solutions that help your business grow',
            'collapseThree': 'We use many different programming languages to build flexible and efficient solutions. We choose the best language for each project to match your business goals. We create strong and fast solutions that give real results',
            'collapseFour': 'We combine different APIs and services to build smooth and scalable solutions. We pick the right APIs for your project to match what you need. We focus on making reliable solutions that improve your business',
            'collapseFive': 'We use various data storage systems to create secure and flexible solutions. We choose the right storage platform for your project to handle your data needs. We build reliable storage solutions that help your business grow long term'
        };
        
        // Create a container div for the text and add it after the image
        const $textContainer = $('<div class="w-100"></div>').append($aiText);
        $('.FAQ-img').append($textContainer);
        
        // Add CSS to ensure proper layout
        $('.FAQ-img').css({
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center'
        });
        
        // Function to animate text typing
        function typeText(element, text, speed = 20) {
            let i = 0;
            element.html(''); // Clear any existing text
            function type() {
                if (i < text.length) {
                    element.html(element.html() + text.charAt(i));
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }
        
        const defaultImage = 'img/techstack.jpeg';
        let lastExpandedId = null;
        
        // Handle accordion show events
        $('.accordion-collapse').on('show.bs.collapse', function() {
            const newImage = faqImages[this.id];
            if (newImage) {
                lastExpandedId = this.id;
                $faqImage.fadeOut(200, function() {
                    $(this).attr('src', newImage).fadeIn(200);
                    // Show text for the current section
                    if (sectionTexts[lastExpandedId]) {
                        $aiText.fadeIn(200, function() {
                            typeText($aiText, sectionTexts[lastExpandedId]);
                        });
                    }
                });
            }
        });
        
        // Handle accordion hide events
        $('.accordion-collapse').on('hidden.bs.collapse', function() {
            if (this.id === lastExpandedId) {
                const openSections = $('.accordion-collapse.show');
                
                if (openSections.length === 0) {
                    $faqImage.fadeOut(200, function() {
                        $(this).attr('src', defaultImage).fadeIn(200);
                        lastExpandedId = null;
                    });
                    // Hide text for any section when collapsed
                    $aiText.fadeOut(200, function() {
                        $aiText.html(''); // Clear text when hidden
                    });
                }
            }
        });
    });

    // Sticky Navbar
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) { // Adjust this value to control when the transition starts
            $('.navbar').addClass('sticky-top');
            $('.navbar').css({
                'transform': 'translateY(0)',
                'opacity': '1',
                'transition': 'background 0.3s ease-in-out, transform 0.3s ease-in-out'
            });
        } else {
            $('.navbar').removeClass('sticky-top');
            $('.navbar').css({
                'transform': 'translateY(0)',
                'opacity': '1',
                'transition': 'background 0.3s ease-in-out, transform 0.3s ease-in-out'
            });
        }
    });

    // Hide navbar on scroll down, show on scroll up
    let lastScroll = 0;
    let isScrolling;

    $(window).on('scroll', function() {
        const currentScroll = $(window).scrollTop();
        
        // Clear the timeout if user is actively scrolling
        window.clearTimeout(isScrolling);

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past the threshold
            $('.navbar').css({
                'transform': 'translateY(-100%)',
                'opacity': '0',
                'transition': 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out'
            });
        } else {
            // Scrolling up or at top
            $('.navbar').css({
                'transform': 'translateY(0)',
                'opacity': '1',
                'transition': 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out'
            });
        }

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            $('.navbar').css({
                'transform': 'translateY(0)',
                'opacity': '1',
                'transition': 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out'
            });
        }, 100); // Adjust timeout as needed

        lastScroll = currentScroll;
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // International carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        items: 1,
        smartSpeed: 1500,
        dots: true,
        dotsData: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });

    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    function myMove() {
        let id = null;
        const elem = document.getElementById("animate");   
        let pos = 0;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (pos == 350) {
            clearInterval(id);
          } else {
            pos++; 
            elem.style.top = pos + "px"; 
            elem.style.left = pos + "px"; 
          }
        }
      }


    // Email validation
    document.getElementById('email').addEventListener('input', function(e) {
        const email = e.target.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const invalidFeedback = e.target.nextElementSibling.nextElementSibling;
        
        if (email === '') {
            invalidFeedback.style.display = 'none';
        } else if (!emailRegex.test(email)) {
            invalidFeedback.style.display = 'block';
        } else {
            invalidFeedback.style.display = 'none';
        }
    });

    // Country code selection
    document.getElementById('countryCode').addEventListener('change', function(e) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const flag = selectedOption.getAttribute('data-flag');
        
        // Update the selected option's style if needed
        e.target.style.backgroundPosition = 'right 0.5rem center';
    });

    // Phone validation
    document.getElementById('phone').addEventListener('input', function(e) {
        const phone = e.target.value;
        const phoneRegex = /^[0-9]{10}$/;
        const invalidFeedback = e.target.nextElementSibling.nextElementSibling;
        
        if (phone === '') {
            invalidFeedback.style.display = 'none';
        } else if (!phoneRegex.test(phone)) {
            invalidFeedback.style.display = 'block';
        } else {
            invalidFeedback.style.display = 'none';
        }
    });

    // Form submission
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('.contact-form');
        const inputs = form.querySelectorAll('input, textarea, select');
        const phoneInput = document.getElementById('phone');

        // Prevent default HTML5 validation
        form.setAttribute('novalidate', true);

        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Only validate if the input has a value
                if (this.value !== '') {
                    validateInput(this);
                } else {
                    // Clear error state if input is empty
                    clearValidation(this);
                }
            });
        });

        // Specific phone number validation
        phoneInput.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Remove any non-numeric characters
            const numericValue = value.replace(/\D/g, '');
            
            // Update input value to contain only numbers
            e.target.value = numericValue;
            
            if (numericValue !== '') {
                if (numericValue.length !== 10) {
                    showError(phoneInput, phoneInput.nextElementSibling, 'Phone number must be 10 digits');
                } else if (!/^[0-9]{10}$/.test(numericValue)) {
                    showError(phoneInput, phoneInput.nextElementSibling, 'Please enter a valid phone number');
                } else {
                    clearValidation(phoneInput);
                }
            } else {
                clearValidation(phoneInput);
            }
        });

        function validateInput(input) {
            const errorMessage = input.nextElementSibling.nextElementSibling;
            
            // Reset validation state
            clearValidation(input);

            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, errorMessage, 'Please enter a valid email address');
                    return;
                }
            }

            // Phone validation is handled separately

            // If we get here, input is valid
            input.classList.add('is-valid');
        }

        function showError(input, errorElement, message) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
        }

        function clearValidation(input) {
            const errorMessage = input.nextElementSibling.nextElementSibling;
            input.classList.remove('is-invalid', 'is-valid');
            if (errorMessage) {
                errorMessage.style.display = 'none';
                errorMessage.textContent = '';
            }
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    if (!input.value) {
                        showError(input, input.nextElementSibling.nextElementSibling, 'This field is required');
                        isValid = false;
                    } else {
                        // For phone number, check length
                        if (input.type === 'tel' && input.value.length !== 10) {
                            showError(input, input.nextElementSibling.nextElementSibling, 'Phone number must be 10 digits');
                            isValid = false;
                        } else {
                            validateInput(input);
                            if (input.classList.contains('is-invalid')) {
                                isValid = false;
                            }
                        }
                    }
                }
            });

            if (isValid) {
                // Add your form submission logic here
                console.log('Form is valid, submitting...');
            }
        });
    });

    // Add this to your existing JavaScript
    document.querySelectorAll('.service-input').forEach(input => {
        let lastChecked = null;
        
        input.addEventListener('click', function(e) {
            if (this === lastChecked) {
                // Uncheck if clicking the same radio button
                this.checked = false;
                lastChecked = null;
            } else {
                lastChecked = this;
            }
            
            // Prevent default radio button behavior
            e.stopPropagation();
        });
    });

    // Update form validation to handle unchecked state
    function validateForm() {
        // ... existing validation code ...
        
        // Check if any service is selected when required
        const serviceInputs = document.querySelectorAll('input[name="service"]');
        const serviceRequired = serviceInputs[0].hasAttribute('required');
        if (serviceRequired) {
            const serviceSelected = Array.from(serviceInputs).some(input => input.checked);
            if (!serviceSelected) {
                const errorMessage = document.querySelector('.service-group .error-message');
                errorMessage.style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }

    // Form validation for service selection
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');  // Updated to match the form ID
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent form submission first
                
                const serviceInputs = document.getElementsByName('service');
                const errorMessage = document.querySelector('.error-message');
                let serviceSelected = false;

                for (const input of serviceInputs) {
                    if (input.checked) {
                        serviceSelected = true;
                        break;
                    }
                }

                if (!serviceSelected) {
                    errorMessage.style.display = 'block';
                    errorMessage.style.opacity = '1';
                    
                    // Scroll to the error message
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Hide error message after selecting a service
                    serviceInputs.forEach(input => {
                        input.addEventListener('change', function() {
                            errorMessage.style.opacity = '0';
                            setTimeout(() => {
                                errorMessage.style.display = 'none';
                            }, 300);
                        });
                    });
                } else {
                    // If service is selected, submit the form
                    contactForm.submit();
                }
            });
        }
    });

    // Form validation and submission handling
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('career-form');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const mandatoryFields = form.querySelectorAll('[required]');
        const formErrorAlert = document.getElementById('formErrorAlert');
        
        function showErrorAlert() {
            formErrorAlert.classList.remove('d-none');
            formErrorAlert.classList.add('show');
        }
        
        function hideErrorAlert() {
            formErrorAlert.classList.add('d-none');
            formErrorAlert.classList.remove('show');
        }
        
        // Form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let firstInvalidField = null;
            let isValid = true;
            
            // Check all mandatory fields
            mandatoryFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, `${field.previousElementSibling?.innerText.replace(' *', '')} is required`);
                    if (!firstInvalidField) firstInvalidField = field;
                }
            });
            
            // Check email validation
            if (!validateEmailField(emailInput, true)) {
                isValid = false;
                if (!firstInvalidField) firstInvalidField = emailInput;
            }
            
            // Check phone validation
            const phoneDigits = phoneInput.value.replace(/\D/g, '').length;
            if (phoneDigits < 10) {
                isValid = false;
                showFieldError(phoneInput, `Please enter at least 10 digits (currently: ${phoneDigits})`);
                if (!firstInvalidField) firstInvalidField = phoneInput;
            }
            
            // Check file input
            const fileInput = document.getElementById('cv');
            if (fileInput && !fileInput.files.length) {
                isValid = false;
                showFieldError(fileInput, 'Please upload your CV');
                if (!firstInvalidField) firstInvalidField = fileInput;
            }
            
            if (!isValid) {
                // Show error alert
                showErrorAlert();
                
                // Scroll to error message
                formErrorAlert.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                });
                
                // Focus first invalid field
                setTimeout(() => {
                    if (firstInvalidField) {
                        firstInvalidField.focus();
                    }
                }, 800);
                
                return false;
            }
            
            // If all validations pass
            hideErrorAlert();
            
            // Show success modal using Bootstrap's Modal class
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            // Reset form after modal is shown
            setTimeout(() => {
                form.reset();
                form.classList.remove('was-validated');
                // Remove all validation classes
                const inputs = form.querySelectorAll('.form-control');
                inputs.forEach(input => {
                    input.classList.remove('is-invalid', 'is-valid');
                    removeFieldError(input);
                });
            }, 500);
        });

        // Add blur event to all mandatory fields
        mandatoryFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    showFieldError(this, `${this.previousElementSibling?.innerText.replace(' *', '')} is required`);
                } else {
                    removeFieldError(this);
                    this.classList.remove('is-invalid');
                    if (this.type !== 'email' && this.id !== 'phone') {
                        this.classList.add('is-valid');
                    }
                }
            });
        });
    });

    function validateEmailField(input, showError = false) {
        const email = input.value.trim();
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isValid = regex.test(email);
        
        if (email === '') {
            if (showError) {
                showFieldError(input, 'Email is required');
            }
            return false;
        }
        
        if (!isValid) {
            if (showError) {
                showFieldError(input, 'Please enter a valid email address');
            }
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        }
        
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        removeFieldError(input);
        return true;
    }

    function showFieldError(input, message) {
        const container = input.closest('.form-floating') || input.closest('.form-group');
        let errorDiv = container.querySelector('.invalid-feedback');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            container.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    function removeFieldError(input) {
        const container = input.closest('.form-floating') || input.closest('.form-group');
        const errorDiv = container.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Smooth scroll for anchor links
    $(document).ready(function() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            var target = this.hash;
            var $target = $(target);
            
            $('html, body').animate({
                'scrollTop': $target.offset().top - 100
            }, 800, 'swing');
        });
    });

    // Initialize Bootstrap tooltips and popovers if needed
    $(function () {
        $('[data-bs-toggle="tooltip"]').tooltip();
        $('[data-bs-toggle="popover"]').popover();
    });

    // GDPR Cookie Consent
    $(document).ready(function() {
        let gdprBanner = $('#gdpr-banner');
        
        // Remove any existing banner first
        $('.gdpr-banner').remove();
        
        // Always create a fresh banner
        $('body').append(`
            <div id="gdpr-banner" class="gdpr-banner">
                <div class="gdpr-content">
                    <div class="gdpr-text">
                        This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it.
                    </div>
                    <div class="gdpr-buttons">
                        <button id="gdpr-reject" class="btn">Reject All</button>
                        <button id="gdpr-accept" class="btn">Accept All</button>
                    </div>
                </div>
            </div>
        `);
        gdprBanner = $('#gdpr-banner');
        
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem('cookieConsent');
        
        // Show banner if user hasn't accepted cookies
        if (!hasAccepted) {
            setTimeout(() => {
                gdprBanner.addClass('show');
            }, 1000);
        }
        
        // Handle Accept
        $('#gdpr-accept').on('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            gdprBanner.removeClass('show');
        });

        // Handle Reject
        $('#gdpr-reject').on('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            gdprBanner.removeClass('show');
        });
    });

})(jQuery);


