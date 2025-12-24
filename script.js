document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5 soniya yuklanish effekti

    // --- 2. STICKY HEADER & ACTIVE LINK ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // --- 3. MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const mobileClose = document.getElementById('mobileClose');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    mobileClose.addEventListener('click', toggleMenu);

    // Link bosilganda menuni yopish
    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 4. SCROLL ANIMATIONS (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.2
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
                entry.target.style.transition = 'all 0.8s ease-out';
                
                // Animatsiya stillarini qo'shish (CSSda initial holatni yozish kerak edi, bu yerda JS bilan boshqaramiz)
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementlarga boshlang'ich holat berish
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        const type = el.getAttribute('data-animate');
        if (type === 'fade-up') el.style.transform = 'translateY(50px)';
        if (type === 'fade-left') el.style.transform = 'translateX(50px)';
        if (type === 'fade-right') el.style.transform = 'translateX(-50px)';
        
        scrollObserver.observe(el);
    });

    // --- 5. NUMBER COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let counted = false;

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 20); // 50fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counted) {
            startCounting();
            counted = true;
        }
    }, { threshold: 0.5 });

    if(statsSection) statsObserver.observe(statsSection);

    // --- 6. ACCORDION (FAQ) ---
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Boshqalarini yopish
            accordions.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            // Bosilganini ochish/yopish
            item.classList.toggle('active');
        });
    });

    // --- 7. PRICING PLAN SELECTION ---
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    const selectedPlanInput = document.getElementById('selectedPlan');
    
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.getAttribute('data-plan');
            
            // Tanlangan tarifni saqlash
            if (selectedPlanInput) {
                selectedPlanInput.value = planName;
            }
            
            // Formaga scroll qilish
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 120;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                // Formani highlight qilish
                setTimeout(() => {
                    const formBox = document.querySelector('.contact-form-box');
                    if (formBox) {
                        formBox.style.transform = 'scale(1.02)';
                        formBox.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.3)';
                        setTimeout(() => {
                            formBox.style.transform = '';
                            formBox.style.boxShadow = '';
                        }, 1000);
                    }
                }, 500);
            }
        });
    });

    // --- 7.5. SERVICE MODAL ---
    const serviceModal = document.getElementById('serviceModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalContent = document.getElementById('modalContent');
    const readMoreLinks = document.querySelectorAll('.read-more[data-service]');

    // Service ma'lumotlari
    const servicesData = {
        buxgalteriya: {
            icon: 'fa-calculator',
            title: 'Buxgalteriya hisobi',
            content: `
                <p>Professional buxgalteriya xizmatlari bilan biznesingizning barcha moliyaviy operatsiyalarini to'liq nazorat qiling.</p>
                <h3>Bizning xizmatlarimiz:</h3>
                <ul>
                    <li>Schyot-fakturalarni yuritish va hisobga olish</li>
                    <li>Bank operatsiyalari va to'lovlarini kuzatish</li>
                    <li>Asosiy vositalar hisobi</li>
                    <li>Mol-mulk va majburiyatlar hisobi</li>
                    <li>Oylik, choraklik va yillik hisobotlar tayyorlash</li>
                    <li>Elektron hujjatlar bilan ishlash (1C, Didox)</li>
                </ul>
                <p>Biz sizning vaqtingizni tejab, barcha moliyaviy jarayonlarni professional darajada amalga oshiramiz.</p>
            `
        },
        soliq: {
            icon: 'fa-file-invoice-dollar',
            title: 'Soliq hisobotlari',
            content: `
                <p>Soliq deklaratsiyalarini o'z vaqtida tayyorlash va topshirish orqali kompaniyangiz qonuniy talablarga muvofiq ishlashini ta'minlaymiz.</p>
                <h3>Bizning xizmatlarimiz:</h3>
                <ul>
                    <li>QQS deklaratsiyalarini tayyorlash va topshirish</li>
                    <li>Daromad solig'i deklaratsiyalari</li>
                    <li>Soliq yukini qonuniy optimallashtirish</li>
                    <li>Soliq organlari bilan muloqot</li>
                    <li>Soliq rejalashtirish va maslahatlar</li>
                    <li>Choraklik va yillik soliq hisobotlari</li>
                </ul>
                <p>Biz sizga soliq majburiyatlarini kamaytirish va qonuniy yo'llar bilan optimallashtirishda yordam beramiz.</p>
            `
        },
        audit: {
            icon: 'fa-chart-line',
            title: 'Moliyaviy Audit',
            content: `
                <p>Kompaniyangizning moliyaviy holatini chuqur tahlil qilish va potentsial xatolarni aniqlash orqali biznesingiz barqarorligini ta'minlaymiz.</p>
                <h3>Bizning xizmatlarimiz:</h3>
                <ul>
                    <li>Moliyaviy hisobotlarni tekshirish</li>
                    <li>Moliyaviy holat tahlili va baholash</li>
                    <li>Ichki nazorat tizimini ko'rib chiqish</li>
                    <li>Xatoliklar va kamchiliklarni aniqlash</li>
                    <li>Raqobatbardosh tahlil va tavsiyalar</li>
                    <li>Moliyaviy xavflarni baholash</li>
                </ul>
                <p>Professional auditorlarimiz kompaniyangizning moliyaviy salomatligini ta'minlash uchun chuqur tahlil olib boradilar.</p>
            `
        },
        kadrlar: {
            icon: 'fa-users-cog',
            title: 'Kadrlar hisobi',
            content: `
                <p>Xodimlar bilan bog'liq barcha hisob-kitoblar va hujjatlar bilan professional ishlash xizmati.</p>
                <h3>Bizning xizmatlarimiz:</h3>
                <ul>
                    <li>Xodimlarni ishga olish va bo'shatish hujjatlari</li>
                    <li>Ish haqi, bonus va boshqa to'lovlarni hisoblash</li>
                    <li>Mehnat ta'tillari bilan ishlash</li>
                    <li>Ish haqi shartnomalari va qo'shimcha shartnomalar</li>
                    <li>Kadrlar bo'yicha hisobotlar</li>
                    <li>Ijtimoiy sug'urta va boshqa majburiy to'lovlar</li>
                </ul>
                <p>Biz sizga kadrlar bilan bog'liq barcha muammolarni hal qilishda yordam beramiz va qonuniy talablarga rioya qilishni ta'minlaymiz.</p>
            `
        },
        tashqi: {
            icon: 'fa-globe',
            title: 'Tashqi iqtisodiy faoliyat',
            content: `
                <p>Eksport va import operatsiyalari bilan bog'liq barcha hujjatlar va hisob-kitoblarni professional darajada amalga oshiramiz.</p>
                <h3>Bizning xizmatlarimiz:</h3>
                <ul>
                    <li>Eksport-import operatsiyalari hisobi</li>
                    <li>Bojxona hujjatlari bilan ishlash</li>
                    <li>Valyuta operatsiyalari va nazorati</li>
                    <li>QQS qaytarish bo'yicha hujjatlar</li>
                    <li>Xorijiy valyutada to'lovlar bilan ishlash</li>
                    <li>Xalqaro standartlarga muvofiq hisobotlar</li>
                </ul>
                <p>Biz sizga xalqaro savdo operatsiyalaringizni qonuniy va samarali yo'ldan amalga oshirishda yordam beramiz.</p>
            `
        },
        konsultatsiya: {
            icon: 'fa-lightbulb',
            title: 'Konsultatsiya',
            content: `
                <p>Biznesingizni rivojlantirish va moliyaviy maslahatlar bo'yicha professional yondashuv.</p>
                <h3>Bizning xizmatlarimiz:</h3>
                <ul>
                    <li>Biznesni ro'yxatdan o'tkazish bo'yicha maslahatlar</li>
                    <li>Soliq rejimi tanlash va optimallashtirish</li>
                    <li>Moliyaviy rejalashtirish va strategiya</li>
                    <li>Investitsiya loyihalari tahlili</li>
                    <li>Moliya manbalarini tanlash maslahatlari</li>
                    <li>Biznes jarayonlarini optimallashtirish</li>
                </ul>
                <p>Biz sizga qaror qabul qilishda ishonchli ma'lumotlar va professional maslahatlar beramiz.</p>
            `
        }
    };

    // Modal ochish
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceType = this.getAttribute('data-service');
            const service = servicesData[serviceType];
            
            if (service) {
                modalIcon.className = `fas ${service.icon}`;
                modalTitle.textContent = service.title;
                modalContent.innerHTML = service.content;
                serviceModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Modal yopish
    function closeServiceModal() {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeServiceModal);
    
    const modalOverlay = document.querySelector('.service-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeServiceModal);
    }

    // ESC tugmasi bilan yopish
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
            closeServiceModal();
        }
    });

    // --- 8. FORM SUBMISSION TO TELEGRAM ---
    const contactForm = document.getElementById('contactForm');
    const TELEGRAM_BOT_TOKEN = '8558965722:AAHDGKH72KfwggpnfnfUSL8t4UUj3OQQIy4';
    const TELEGRAM_CHAT_ID = '676565817';
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Form ma'lumotlarini olish
            const userName = document.getElementById('userName').value.trim();
            const userPhone = document.getElementById('userPhone').value.trim();
            const serviceType = document.getElementById('serviceType').value;
            const selectedPlan = document.getElementById('selectedPlan').value;
            const message = document.getElementById('message').value.trim();
            
            // Validatsiya
            if (!userName || !userPhone) {
                alert('Iltimos, ism va telefon raqamini kiriting!');
                return;
            }
            
            // Loading holati
            btn.innerText = 'Yuborilmoqda...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            
            // Telegram xabar formati
            const telegramMessage = `
🆕 <b>Yangi so'rov</b>

👤 <b>Ism:</b> ${userName}
📞 <b>Telefon:</b> ${userPhone}
${serviceType ? `📋 <b>Xizmat turi:</b> ${serviceType}` : ''}
${selectedPlan ? `💼 <b>Tanlangan tarif:</b> ${selectedPlan}` : ''}
${message ? `💬 <b>Xabar:</b>\n${message}` : ''}

🕐 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
            `.trim();
            
            try {
                // Telegram Bot API ga so'rov yuborish
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: telegramMessage,
                        parse_mode: 'HTML'
                    })
                });
                
                const data = await response.json();
                
                if (data.ok) {
                    // Muvaffaqiyatli yuborildi
                    btn.innerText = '✓ Yuborildi!';
                    btn.style.backgroundColor = '#10B981';
                    btn.style.borderColor = '#10B981';
                    
                    // Formani tozalash
                    contactForm.reset();
                    if (selectedPlanInput) {
                        selectedPlanInput.value = '';
                    }
                    
                    // 3 soniyadan keyin asl holiga qaytarish
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.borderColor = '';
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    }, 3000);
                } else {
                    throw new Error(data.description || 'Xatolik yuz berdi');
                }
            } catch (error) {
                console.error('Telegram yuborish xatosi:', error);
                btn.innerText = '❌ Xatolik!';
                btn.style.backgroundColor = '#EF4444';
                btn.style.borderColor = '#EF4444';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 3000);
            }
        });
    }

    // --- 9. SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});