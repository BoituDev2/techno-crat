/* ========================================
   TECHNVST - Main JavaScript
   All interactive functionality
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ========== TYPING EFFECT FOR HERO SECTION ==========
    const phrases = ["corporate partnerships.", "intelligent capital.", "African market access.", "Microsoft-backed growth."];
    let idx = 0, charIdx = 0, isDeleting = false;
    const typedSpan = document.getElementById("typed-text");
    
    if (typedSpan) {
        function typeEffect() {
            const currentPhrase = phrases[idx];
            if (isDeleting) {
                typedSpan.innerText = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    idx = (idx + 1) % phrases.length;
                    setTimeout(typeEffect, 300);
                } else {
                    setTimeout(typeEffect, 50);
                }
            } else {
                typedSpan.innerText = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                } else {
                    setTimeout(typeEffect, 80);
                }
            }
        }
        typeEffect();
    }

    // ========== COUNTDOWN TIMER (April 16, 2026) ==========
    function updateCountdown() {
        const targetDate = new Date(2026, 3, 16, 10, 0, 0);
        const now = new Date();
        const diff = targetDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl && hoursEl && minutesEl && secondsEl) {
            if (diff <= 0) {
                daysEl.innerText = '00';
                hoursEl.innerText = '00';
                minutesEl.innerText = '00';
                secondsEl.innerText = '00';
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (86400000)) / (3600000));
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            daysEl.innerText = days.toString().padStart(2, '0');
            hoursEl.innerText = hours.toString().padStart(2, '0');
            minutesEl.innerText = minutes.toString().padStart(2, '0');
            secondsEl.innerText = seconds.toString().padStart(2, '0');
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========== AI RECOMMENDATION ENGINE ==========
    const recommendBtn = document.getElementById("recommendBtn");
    const stageSelect = document.getElementById("startupStage");
    const recommendText = document.getElementById("recommendText");
    
    const recommendationMap = {
        idea: "✨ Personalized: Watch 'Idea to MVP in African markets' webinar. Access Microsoft for Startups Founders Hub. Market insight: Fintech & AgriTech opportunities.",
        early: "🚀 Early traction? Join 'Customer Acquisition in Nairobi & Lagos' live. AI-curated: Investor readiness toolkit, + $10k Google for Startups credits.",
        growth: "📈 Growth stage: Recommended webinar 'Series A fundraising & Pan-African expansion'. Direct intro to VC partners (TLcom, Novastar)."
    };
    
    if (recommendBtn) {
        recommendBtn.addEventListener("click", function() {
            if (recommendText) {
                recommendText.innerHTML = `<i class="fas fa-chart-line"></i> ${recommendationMap[stageSelect.value]}<br><span class="badge">AI Confidence: 94% match</span>`;
            }
        });
    }

    // ========== TOAST NOTIFICATION SYSTEM ==========
    window.showToast = function(msg) {
        let toast = document.getElementById('toastMsg');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastMsg';
            toast.className = 'glass-card';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.right = '20px';
            toast.style.padding = '12px 20px';
            toast.style.zIndex = '10000';
            toast.style.borderLeft = '4px solid #00ffc3';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fas fa-info-circle"></i> ${msg}`;
        toast.style.display = 'block';
        setTimeout(function() {
            toast.style.display = 'none';
        }, 4000);
    };

    // ========== LEAD FORM WITH RECAPTCHA ==========
    const leadForm = document.getElementById("leadForm");
    if (leadForm) {
        leadForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("leadName")?.value;
            const email = document.getElementById("leadEmail")?.value;
            const recaptchaResponse = window.grecaptcha && window.grecaptcha.getResponse();
            
            if (!name || !email) {
                showToast("Please fill in your name and email.");
                return;
            }
            if (!recaptchaResponse || recaptchaResponse.length === 0) {
                showToast("Please complete the reCAPTCHA verification.");
                return;
            }
            showToast(`🎉 Welcome ${name}! Your registration is received. (reCAPTCHA verified)`);
            leadForm.reset();
            if (window.grecaptcha) window.grecaptcha.reset();
        });
    }

    // ========== REGISTER BUTTONS (Scroll to Form) ==========
    const registerButtonIds = ["heroRegisterBtn", "navRegisterBtn", "mobileRegisterBtn", "proRegisterBtn", "eventRegisterBtn", "footerRegisterTrigger"];
    registerButtonIds.forEach(function(id) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener("click", function() {
                const formInput = document.getElementById("leadName");
                if (formInput) {
                    formInput.focus();
                    const formSection = document.querySelector("#leadForm");
                    if (formSection) {
                        window.scrollTo({ top: formSection.offsetTop - 80, behavior: "smooth" });
                    }
                } else {
                    showToast("🎉 Join our community! Registration opens soon.");
                }
            });
        }
    });

    // ========== WEBINAR REGISTRATION BUTTONS ==========
    document.querySelectorAll(".register-webinar").forEach(function(btn) {
        btn.addEventListener("click", function() {
            showToast("📌 Webinar seat reserved! Calendar invite + AI pre-reading sent.");
        });
    });

    // ========== AI DEMO BUTTON ==========
    const aiDemoBtn = document.getElementById("aiDemoBtn");
    if (aiDemoBtn) {
        aiDemoBtn.addEventListener("click", function() {
            const aiPanel = document.querySelector(".ai-panel");
            if (aiPanel) {
                aiPanel.scrollIntoView({ behavior: "smooth" });
                if (recommendBtn) recommendBtn.click();
            }
        });
    }

    // ========== BACK TO TOP BUTTON ==========
    const backBtn = document.getElementById("backToTopBtn");
    if (backBtn) {
        window.addEventListener("scroll", function() {
            backBtn.classList.toggle("show", window.scrollY > 300);
        });
        backBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById("mainNavbar");
    if (navbar) {
        window.addEventListener("scroll", function() {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // ========== MOBILE MENU TOGGLE ==========
    const hamburger = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const mobileCloseBtn = document.getElementById("mobileCloseBtn");
    const mobileDropdownToggle = document.getElementById("mobileDropdownToggle");
    const mobileSubmenu = document.getElementById("mobileSubmenu");

    function toggleMobileMenu() {
        if (hamburger && mobileMenu && menuOverlay) {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
        }
    }

    function closeMobileMenu() {
        if (hamburger && mobileMenu && menuOverlay && mobileMenu.classList.contains("active")) {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    if (hamburger) hamburger.addEventListener("click", toggleMobileMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileMenu);
    if (menuOverlay) menuOverlay.addEventListener("click", closeMobileMenu);
    
    if (mobileDropdownToggle && mobileSubmenu) {
        mobileDropdownToggle.addEventListener("click", function() {
            mobileDropdownToggle.classList.toggle("active");
            mobileSubmenu.classList.toggle("active");
        });
    }
    
    document.querySelectorAll(".mobile-nav-links a").forEach(function(link) {
        link.addEventListener("click", closeMobileMenu);
    });

    // ========== CONTACT FORM (if on contact page) ==========
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const firstName = document.getElementById("firstName")?.value;
            const lastName = document.getElementById("lastName")?.value;
            const email = document.getElementById("email")?.value;
            const recaptchaResponse = window.grecaptcha && window.grecaptcha.getResponse();
            
            if (!firstName || !lastName || !email) {
                showToast("⚠️ Please fill in all required fields.");
                return;
            }
            if (!recaptchaResponse || recaptchaResponse.length === 0) {
                showToast("Please complete the reCAPTCHA verification.");
                return;
            }
            showToast(`✅ Thanks ${firstName}! Your message has been sent. Our team will respond within 48 hours.`);
            contactForm.reset();
            if (window.grecaptcha) window.grecaptcha.reset();
        });
    }

    // ========== NEWSLETTER SUBSCRIPTION ==========
    const newsletterBtn = document.getElementById("newsletterBtn");
    if (newsletterBtn) {
        newsletterBtn.addEventListener("click", function() {
            const emailInput = document.getElementById("newsletterEmail");
            if (emailInput && emailInput.value && emailInput.value.includes('@')) {
                showToast("📧 Subscribed! You'll receive the latest updates and opportunities.");
                emailInput.value = '';
            } else {
                showToast("Please enter a valid email address.");
            }
        });
    }

    // ========== PARTNER BUTTON ==========
    const partnerBtn = document.getElementById("partnerBtn");
    if (partnerBtn) {
        partnerBtn.addEventListener("click", function() {
            showToast("🤝 Partnership team will contact you shortly. Please complete the form for priority follow-up.");
        });
    }

    // ========== MICROSOFT BENEFITS FORM ==========
    const msForm = document.getElementById("msForm");
    if (msForm) {
        msForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const recaptchaResponse = window.grecaptcha && window.grecaptcha.getResponse();
            if (!recaptchaResponse || recaptchaResponse.length === 0) {
                showToast("Please complete the reCAPTCHA verification.");
                return;
            }
            const name = document.getElementById("formName")?.value;
            showToast(`✅ Thanks ${name || 'Founder'}! Your expression of interest has been received.`);
            msForm.reset();
            if (window.grecaptcha) window.grecaptcha.reset();
        });
    }

    // ========== COMMUNITY & KNOWLEDGE HUB BUTTONS (About Page) ==========
    const switchBtn = document.getElementById("switchBtn");
    if (switchBtn) {
        switchBtn.addEventListener("click", function() {
            showToast("✨ Join the TechNvst Switch community!");
        });
    }
    
    const knowledgeBtn = document.getElementById("knowledgeBtn");
    if (knowledgeBtn) {
        knowledgeBtn.addEventListener("click", function() {
            showToast("📚 Explore the Knowledge Hub — articles and insights.");
        });
    }
    
    const storiesBtn = document.getElementById("storiesBtn");
    if (storiesBtn) {
        storiesBtn.addEventListener("click", function() {
            showToast("🏆 Success stories from African innovators coming soon!");
        });
    }

    // ========== GPU & COMMUNITY BUTTONS (Broadcasts Page) ==========
    const gpuBtn = document.getElementById("gpuBtn");
    if (gpuBtn) {
        gpuBtn.addEventListener("click", function() {
            showToast("📋 Thank you! Our team will reach out to discuss your GPU/AI requirements.");
        });
    }
    
    const joinCommunityBtn = document.getElementById("joinCommunityBtn");
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener("click", function() {
            showToast("🎉 Welcome! Community access opens soon. Stay tuned for exclusive resources.");
        });
    }

    // ========== WATCH REPLAY BUTTONS (Broadcasts Archive) ==========
    document.querySelectorAll(".watch-replay").forEach(function(btn) {
        btn.addEventListener("click", function() {
            showToast("📺 Replay available soon. Subscribe for updates!");
        });
    });

    // ========== RESOURCE "FIND OUT MORE" BUTTONS (Events Page) ==========
    document.querySelectorAll(".find-out-more").forEach(function(btn) {
        btn.addEventListener("click", function() {
            showToast("📘 More resources available in the full Knowledge Hub.");
        });
    });

    // ========== VIDEO AUTOPLAY HANDLING ==========
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        heroVideo.play().catch(function(e) {
            console.log('Video autoplay prevented:', e);
        });
    }

    // ========== CAROUSEL AUTO-SCROLL (Events Page) ==========
    const carousel = document.querySelector('.carousel-container');
    let scrollInterval;
    
    function startAutoScroll() {
        if (scrollInterval) clearInterval(scrollInterval);
        scrollInterval = setInterval(function() {
            if (carousel && !carousel.matches(':hover')) {
                carousel.scrollLeft += 4;
                if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                    carousel.scrollLeft = 0;
                }
            }
        }, 30);
    }
    
    function stopAutoScroll() {
        if (scrollInterval) clearInterval(scrollInterval);
        scrollInterval = null;
    }
    
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
        startAutoScroll();
    }

}); // End DOMContentLoaded