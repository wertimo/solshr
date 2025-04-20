function getBrowserLanguage() {
    // Get browser language (returns something like 'en-US' or 'ro-RO')
    const browserLang = navigator.language || navigator.userLanguage;

    // Get the first two characters (language code)
    const langCode = browserLang.split('-')[0];

    // Check if we support this language
    if (translations[langCode]) {
        return langCode;
    }

    // Default to Romanian if language is not supported
    return 'ro';
}

function setInitialLanguage() {
    const userLang = getBrowserLanguage();
    const languageSelect = document.getElementById('languageSelect');

    if (languageSelect) {
        languageSelect.value = userLang;
        changeLanguage(); // Apply translations immediately
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setInitialLanguage();
    // ... rest of your existing code ...
});

const translations = {
    en: {
        "hero-title": "GET 50% OFF NEXT ENERGY BILL*",
        "hero-subtitle": "*First 1,000 users, T&Cs apply",
        "join-waitlist": "JOIN WAITLIST",
        "mission": "MISSION",
        "how-it-works": "HOW IT WORKS",
        "mission-statement": "OUR MISSION IS TO MAKE SOLAR ENERGY ACCESSIBLE THROUGH COMMUNITY DRIVEN SOLAR FARMS",
        "discount-message": "GET A DISCOUNT ON YOUR NEXT ENERGY BILL",
        "how-it-works-title": "HOW IT WORKS:",
        "step-1-title": "Join Our Community",
        "step-1-description": "Join the SOLSHR platform to connect with local solar projects and work together on renewable energy.",
        "step-1-benefit": "Take part in decisions about clean energy in your community and help create a sustainable future.",
        "step-2-title": "Generate Solar Energy",
        "step-2-description": "We install solar panels to harness clean energy, which is sold to the national grid or used by the community.",
        "step-2-benefit": "Your community contributes to a renewable energy mix, reducing dependency on fossil fuels and improving local energy security.",
        "step-3-title": "Track the Impact",
        "step-3-description": "Track the energy produced and its benefits, like reduced CO₂ emissions, while enjoying lower energy costs and local job creation.",
        "step-3-benefit": "Witness the positive social, environmental, and economic impacts of your involvement in clean energy initiatives.",
        // Navigation translations
        "mission": "MISSION",
        "how-it-works": "HOW IT WORKS",
        "form-title": "Join Our Waitlist",
        "name-label": "Name:",
        "name-placeholder": "Enter your name",
        "email-label": "Email:",
        "email-placeholder": "Enter your email",
        "comment-label": "Comment (optional):",
        "comment-placeholder": "Enter your comment (optional)",
        "submit-button": "Join Waitlist",
        "scroller-join-waitlist": "JOIN WAITLIST",
        "calculator-title": "SAVINGS CALCULATOR",
        "amount-invested-label": "Invested (€):",
        "power-generated-label": "Power (kWh):",
        "potential-savings-label": "Savings (€):",
        "co2-reduction-label": "Estimated CO2 Reduction:",
        "disclaimer": "This calculator is for illustrative purposes only. Final savings may vary.",
        "terms-checkbox-label": "I agree to the Privacy Policy and Terms & Conditions",
        "terms-agree": "I agree to the",
        "privacy-policy": "Privacy Policy",
        "terms-conditions": "Terms & Conditions",
        "and": "and",
        "privacy-policy-title": "Privacy Policy",
        "terms-conditions-title": "Terms and Conditions",
        "last-updated": "Last updated: 20.04.2025",
        "contact-email": "Email: alex@solshr.com",
        "account-title": "My Account",
        "profile-info": "Profile Information",
        "investment-info": "Investment Information",
        "account-settings": "Account Settings",
        "total-invested": "Total Invested",
        "power-generated": "Power Generated",
        "co2-saved": "CO2 Saved",
        "change-password": "Change Password",
        "delete-account": "Delete Account",
        "logout": "LOGOUT",
        "sign-in": "SIGN IN",
        "sign-up": "SIGN UP",
        "sign-in-title": "Sign In",
        "sign-up-title": "Sign Up",
        "password-label": "Password:",
        "password-placeholder": "Enter your password",
        "sign-in-button": "Sign In",
        "sign-up-button": "Sign Up",
        "no-account": "Don't have an account? ",
        "have-account": "Already have an account? ",
        "sign-in-link": "Sign In",
        "sign-up-link": "Sign Up",
        "terms-section-10": "10. Limited Introductory Offer for Waitlist Users",
        "offer-eligibility": "10.1. Eligibility: This limited introductory offer is available exclusively to the first one thousand (1000) users who sign up to our official waitlist prior to the launch of our energy services in their respective region.",
        "offer-desc": "10.2. Offer: Eligible users will receive a one-time discount of fifty percent (50%) on their next monthly energy bill. For the purposes of this offer, \"next monthly energy bill\" refers to the first monthly bill issued to the user after the official launch of our energy services in their registered region and after the user has commenced receiving energy services from us.",
        "offer-conditions-title": "10.3. Conditions and Limitations:",
        "offer-condition-1": "This offer is strictly limited to the first one thousand (1000) eligible users as determined by the order in which they signed up to the waitlist. Our records of waitlist sign-up times shall be conclusive.",
        "offer-condition-2": "The discount applies only to the charges for energy consumption in the first monthly bill issued after launch. It does not apply to any other fees, taxes, or charges that may be included in the bill.",
        "offer-condition-3": "This offer is non-transferable and cannot be exchanged for cash or any other alternative.",
        "offer-condition-4": "To be eligible for the discount, the user must have successfully signed up for our energy services and be an active customer at the time the first monthly bill is issued.",
        "offer-condition-5": "SOLSHR reserves the right to modify or withdraw this offer at any time without prior notice. However, SOLSHR will honour the discount for users who have already met the eligibility criteria prior to any such modification or withdrawal.",
        "offer-condition-6": "SOLSHR's decision on the eligibility of users for this offer shall be final and binding.",
        "terms-section-1": "1. Agreement to Terms",
        "terms-section-2": "2. Use License",
        "terms-section-3": "3. Disclaimer",
        "terms-section-4": "4. Limitations",
        "terms-section-5": "5. Revisions and Errata",
        "terms-section-6": "6. Links",
        "terms-section-7": "7. Site Terms of Use Modifications",
        "terms-section-8": "8. Governing Law",
        "terms-section-9": "9. Contact Us"
    },
    ro: {
        "hero-title": "OBȚINEȚI 50% REDUCERE LA URMĂTOAREA FACTURĂ DE ENERGIE*",
        "hero-subtitle": "*Primii 1.000 de utilizatori, se aplică Termeni și Condiții",
        "join-waitlist": "ÎNSCRIEȚI-VĂ PE LISTA DE AȘTEPTARE",
        "mission": "MISIUNE",
        "how-it-works": "CUM FUNCȚIONEAZĂ",
        "mission-statement": "MISIUNEA NOASTRĂ ESTE DE A FACE ENERGIA SOLARĂ ACCESIBILĂ PRIN FERME SOLARE COMUNITARE",
        "discount-message": "OBȚINEȚI O REDUCERE LA URMĂTOAREA FACTURĂ DE ENERGIE",
        "how-it-works-title": "CUM FUNCȚIONEAZĂ:",
        "step-1-title": "Alăturați-vă Comunității Noastre",
        "step-1-description": "Alăturați-vă platformei SOLSHR pentru a vă conecta cu proiecte solare locale și pentru a colabora la inițiative de energie regenerabilă.",
        "step-1-benefit": "Participați la deciziile privind energia curată în comunitatea dvs. și contribuiți la crearea unui viitor durabil.",
        "step-2-title": "Generați Energie Solară",
        "step-2-description": "Instalăm panouri solare pentru a valorifica energia curată, care este vândută rețelei naționale sau utilizată de comunitate.",
        "step-2-benefit": "Comunitatea dvs. contribuie la un mix energetic regenerabil, reducând dependența de combustibilii fosili și îmbunătățind securitatea energetică locală.",
        "step-3-title": "Urmăriți Impactul",
        "step-3-description": "Urmăriți energia produsă și beneficiile acesteia, cum ar fi reducerea emisiilor de CO₂, bucurându-vă de costuri mai mici ale energiei și de crearea de locuri de muncă locale.",
        "step-3-benefit": "Observați impactul social, ecologic și economic pozitiv al implicării dvs. în inițiativele de energie curată.",
        "form-title": "Înscrieți-vă pe Lista Noastră de Așteptare",
        "name-label": "Nume:",
        "name-placeholder": "Introduceți numele dvs.",
        "email-label": "Email:",
        "email-placeholder": "Introduceți emailul dvs.",
        "comment-label": "Comentariu (opțional):",
        "comment-placeholder": "Introduceți comentariul dvs. (opțional)",
        "submit-button": "Înscrieți-vă pe Lista de Așteptare",
        "scroller-join-waitlist": "ÎNSCRIEȚI-VĂ PE LISTA DE AȘTEPTARE",
        "calculator-title": "CALCULATOR DE ECONOMII",
        "amount-invested-label": "Investiție (€):",
        "power-generated-label": "Energie (kWh):",
        "potential-savings-label": "Economii (€):",
        "co2-reduction-label": "Reducere Estimată CO2:",
        "disclaimer": "Acest calculator are doar scop ilustrativ. Economiile finale pot varia.",
        "terms-checkbox-label": "Sunt de acord cu Politica de Confidențialitate și Termenii și Condițiile",
        "terms-agree": "Sunt de acord cu",
        "privacy-policy": "Politica de Confidențialitate",
        "terms-conditions": "Termenii și Condițiile",
        "and": "și",
        "privacy-policy-title": "Politica de Confidențialitate",
        "terms-conditions-title": "Termeni și Condiții",
        "last-updated": "Ultima actualizare: 20.04.2025",
        "contact-email": "Email: alex@solshr.com",
        "account-title": "Contul Meu",
        "profile-info": "Informații Profil",
        "investment-info": "Informații Investiții",
        "account-settings": "Setări Cont",
        "total-invested": "Total Investit",
        "power-generated": "Energie Generată",
        "co2-saved": "CO2 Economisit",
        "change-password": "Schimbă Parola",
        "delete-account": "Șterge Contul",
        "logout": "DECONECTARE",
        "sign-in": "CONECTARE",
        "sign-up": "ÎNREGISTRARE",
        "sign-in-title": "Conectare",
        "sign-up-title": "Înregistrare",
        "password-label": "Parolă:",
        "password-placeholder": "Introduceți parola dvs.",
        "sign-in-button": "Conectare",
        "sign-up-button": "Înregistrare",
        "no-account": "Nu aveți un cont?",
        "have-account": "Aveți deja un cont?",
        "sign-in-link": "Conectare",
        "sign-up-link": "Înregistrare",
        "terms-section-10": "10. Oferta Introductivă Limitată pentru Utilizatorii Listei de Așteptare",
        "offer-eligibility": "10.1. Eligibilitate: Această ofertă introductivă limitată este disponibilă exclusiv primilor o mie (1000) de utilizatori care se înscriu pe lista noastră oficială de așteptare înainte de lansarea serviciilor noastre energetice în regiunea lor.",
        "offer-desc": "10.2. Ofertă: Utilizatorii eligibili vor primi o reducere unică de cincizeci la sută (50%) la următoarea factură lunară de energie. În scopul acestei oferte, \"următoarea factură lunară de energie\" se referă la prima factură lunară emisă utilizatorului după lansarea oficială a serviciilor noastre energetice în regiunea sa înregistrată și după ce utilizatorul a început să primească servicii energetice de la noi.",
        "offer-conditions-title": "10.3. Condiții și Limitări:",
        "offer-condition-1": "Această ofertă este strict limitată la primii o mie (1000) de utilizatori eligibili, așa cum este determinat de ordinea în care s-au înscris pe lista de așteptare. Înregistrările noastre privind orele de înscriere pe lista de așteptare vor fi definitive.",
        "offer-condition-2": "Reducerea se aplică numai costurilor consumului de energie din prima factură lunară emisă după lansare. Nu se aplică altor taxe, impozite sau costuri care pot fi incluse în factură.",
        "offer-condition-3": "Această ofertă este netransferabilă și nu poate fi schimbată cu numerar sau orice altă alternativă.",
        "offer-condition-4": "Pentru a fi eligibil pentru reducere, utilizatorul trebuie să se fi înscris cu succes la serviciile noastre energetice și să fie un client activ în momentul emiterii primei facturi lunare.",
        "offer-condition-5": "SOLSHR își rezervă dreptul de a modifica sau retrage această ofertă în orice moment, fără notificare prealabilă. Cu toate acestea, SOLSHR va onora reducerea pentru utilizatorii care au îndeplinit deja criteriile de eligibilitate înainte de orice astfel de modificare sau retragere.",
        "offer-condition-6": "Decizia SOLSHR privind eligibilitatea utilizatorilor pentru această ofertă va fi finală și obligatorie.",
        "terms-section-1": "1. Acordul cu Termenii",
        "terms-section-2": "2. Licență de Utilizare",
        "terms-section-3": "3. Declinarea Responsabilității",
        "terms-section-4": "4. Limitări",
        "terms-section-5": "5. Revizuiri și Erori",
        "terms-section-6": "6. Legături",
        "terms-section-7": "7. Modificări ale Termenilor de Utilizare ai Site-ului",
        "terms-section-8": "8. Legea Aplicabilă",
        "terms-section-9": "9. Contactați-ne"
    },
    ru: {
        "hero-title": "ПОЛУЧИТЕ СКИДКУ 50% НА СЛЕДУЮЩИЙ СЧЕТ ЗА ЭЛЕКТРОЭНЕРГИЮ*",
        "hero-subtitle": "*Первые 1000 пользователей, применяются Условия и положения",
        "join-waitlist": "ПРИСОЕДИНИТЬСЯ К СПИСКУ ОЖИДАНИЯ",
        "mission": "МИССИЯ",
        "how-it-works": "КАК ЭТО РАБОТАЕТ",
        "mission-statement": "НАША МИССИЯ - СДЕЛАТЬ СОЛНЕЧНУЮ ЭНЕРГИЮ ДОСТУПНОЙ ЧЕРЕЗ СОЛНЕЧНЫЕ ЭЛЕКТРОСТАНЦИИ, УПРАВЛЯЕМЫЕ СООБЩЕСТВАМИ",
        "discount-message": "ПОЛУЧИТЕ СКИДКУ НА СЛЕДУЮЩИЙ СЧЕТ ЗА ЭЛЕКТРОЭНЕРГИЮ",
        "how-it-works-title": "КАК ЭТО РАБОТАЕТ:",
        "step-1-title": "Присоединитесь к нашему сообществу",
        "step-1-description": "Присоединитесь к платформе SOLSHR, чтобы связаться с местными солнечными проектами и сотрудничать в области возобновляемой энергии.",
        "step-1-benefit": "Принимайте участие в решениях о чистой энергии в вашем сообществе и помогайте создавать устойчивое будущее.",
        "step-2-title": "Генерируйте солнечную энергию",
        "step-2-description": "Мы устанавливаем солнечные панели для использования чистой энергии, которая продается в национальную сеть или используется сообществом.",
        "step-2-benefit": "Ваше сообщество вносит вклад в развитие возобновляемых источников энергии, снижая зависимость от ископаемого топлива и повышая местную энергетическую безопасность.",
        "step-3-title": "Отслеживайте воздействие",
        "step-3-description": "Отслеживайте произведенную энергию и ее преимущества, такие как сокращение выбросов CO₂, наслаждаясь более низкими затратами на энергию и созданием местных рабочих мест.",
        "step-3-benefit": "Станьте свидетелем положительного социального, экологического и экономического воздействия вашего участия в инициативах по чистой энергии.",
        "form-title": "Присоединитесь к нашему списку ожидания",
        "name-label": "Имя:",
        "name-placeholder": "Введите ваше имя",
        "email-label": "Электронная почта:",
        "email-placeholder": "Введите ваш адрес электронной почты",
        "comment-label": "Комментарий (необязательно):",
        "comment-placeholder": "Введите ваш комментарий (необязательно)",
        "submit-button": "Присоединиться к списку ожидания",
        "scroller-join-waitlist": "ПРИСОЕДИНИТЬСЯ К СПИСКУ ОЖИДАНИЯ",
        "calculator-title": "КАЛЬКУЛЯТОР ЭКОНОМИИ",
        "amount-invested-label": "Инвестировано (€):",
        "power-generated-label": "Мощность (кВтч):",
        "potential-savings-label": "Экономия (€):",
        "co2-reduction-label": "Ориентировочное сокращение выбросов CO2:",
        "disclaimer": "Этот калькулятор предназначен только для иллюстративных целей. Окончательная экономия может варьироваться.",
        "terms-checkbox-label": "Я согласен с Политикой конфиденциальности и Условиями и положениями",
        "terms-agree": "Я согласен с",
        "privacy-policy": "Политикой конфиденциальности",
        "terms-conditions": "Условиями и положениями",
        "and": "и",
        "privacy-policy-title": "Политика конфиденциальности",
        "terms-conditions-title": "Условия и положения",
        "last-updated": "Последнее обновление: 20.04.2025",
        "contact-email": "Электронная почта: alex@solshr.com",
        "account-title": "Мой аккаунт",
        "profile-info": "Информация профиля",
        "investment-info": "Информация об инвестициях",
        "account-settings": "Настройки аккаунта",
        "total-invested": "Всего инвестировано",
        "power-generated": "Произведено энергии",
        "co2-saved": "Сэкономлено CO2",
        "change-password": "Изменить пароль",
        "delete-account": "Удалить аккаунт",
        "logout": "ВЫЙТИ",
        "sign-in": "ВОЙТИ",
        "sign-up": "ЗАРЕГИСТРИРОВАТЬСЯ",
        "sign-in-title": "Войти",
        "sign-up-title": "Зарегистрироваться",
        "password-label": "Пароль:",
        "password-placeholder": "Введите ваш пароль",
        "sign-in-button": "Войти",
        "sign-up-button": "Зарегистрироваться",
        "no-account": "Нет аккаунта?",
        "have-account": "Уже есть аккаунт?",
        "sign-in-link": "Войти",
        "sign-up-link": "Зарегистрироваться",
        "terms-section-10": "10. Ограниченное вводное предложение для пользователей списка ожидания",
        "offer-eligibility": "10.1. Право на участие: Это ограниченное вводное предложение доступно исключительно первым тысяче (1000) пользователей, которые подпишутся на наш официальный список ожидания до запуска наших энергетических услуг в их соответствующем регионе.",
        "offer-desc": "10.2. Предложение: Правомочные пользователи получат единовременную скидку в размере пятидесяти процентов (50%) на свой следующий ежемесячный счет за электроэнергию. Для целей настоящего предложения «следующий ежемесячный счет за электроэнергию» означает первый ежемесячный счет, выставленный пользователю после официального запуска наших энергетических услуг в его зарегистрированном регионе и после того, как пользователь начал получать от нас энергетические услуги.",
        "offer-conditions-title": "10.3. Условия и ограничения:",
        "offer-condition-1": "Настоящее предложение строго ограничено первыми тысячей (1000) правомочных пользователей, определяемых по порядку их регистрации в списке ожидания. Наши записи о времени регистрации в списке ожидания являются окончательными.",
        "offer-condition-2": "Скидка распространяется только на плату за потребление энергии в первом ежемесячном счете, выставленном после запуска. Она не распространяется на любые другие сборы, налоги или платежи, которые могут быть включены в счет.",
        "offer-condition-3": "Настоящее предложение не подлежит передаче и не может быть обменено на наличные деньги или любую другую альтернативу.",
        "offer-condition-4": "Чтобы иметь право на скидку, пользователь должен успешно зарегистрироваться для получения наших энергетических услуг и быть активным клиентом на момент выставления первого ежемесячного счета.",
        "offer-condition-5": "SOLSHR оставляет за собой право изменять или отзывать настоящее предложение в любое время без предварительного уведомления. Однако SOLSHR обязуется предоставить скидку пользователям, которые уже соответствовали критериям отбора до любого такого изменения или отзыва.",
        "offer-condition-6": "Решение SOLSHR относительно права пользователей на участие в настоящем предложении является окончательным и обязательным.",
        "terms-section-1": "1. Согласие с условиями",
        "terms-section-2": "2. Лицензия на использование",
        "terms-section-3": "3. Отказ от ответственности",
        "terms-section-4": "4. Ограничения",
        "terms-section-5": "5. Исправления и опечатки",
        "terms-section-6": "6. Ссылки",
        "terms-section-7": "7. Изменения условий использования сайта",
        "terms-section-8": "8. Применимое право",
        "terms-section-9": "9. Свяжитесь с нами"
    }
};

function changeLanguage() {
    const language = document.getElementById("languageSelect").value;
    console.log("Selected language:", language);
    
    const elements = document.querySelectorAll("[data-lang]");
    console.log("Elements to translate:", elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute("data-lang");
        console.log("Translating key:", key);
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key]; // Update placeholder
            } else {
                element.textContent = translations[language][key]; // Update text content
            }
            console.log("Translated to:", translations[language][key]);
        } else {
            console.log("Translation not found for key:", key);
        }
    });
}

function toggleLanguageDropdown() {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.style.display = languageSelect.style.display === 'none' ? 'block' : 'none';
}