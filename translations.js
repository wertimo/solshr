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
        "hero-title": "SOLAR STARTING AT €1",
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
        "calculator-title": "Potential Savings Calculator",
        "amount-invested-label": "Amount Invested (€):",
        "power-generated-label": "Power Generated (kWh):",
        "potential-savings-label": "Potential Savings (€):",
        "co2-reduction-label": "Estimated CO2 Reduction:",
        "disclaimer": "This calculator is for illustrative purposes only. Final savings may vary."
    },
    ro: {
        "hero-title": "ENERGIE SOLARĂ DE LA 1€",
        "join-waitlist": "ÎNSCRIEȚI-VĂ PE LISTA DE AȘTEPTARE",
        "mission": "MISIUNE",
        "how-it-works": "CUM FUNCȚIONEAZĂ",
        "mission-statement": "MISIUNEA NOASTRĂ ESTE SĂ FACEM ENERGIA SOLARĂ ACCESIBILĂ PRIN FERME SOLARE COMUNITARE",
        "discount-message": "OBȚINEȚI O REDUCERE LA URMĂTOAREA FACTURĂ DE ENERGIE",
        "how-it-works-title": "CUM FUNCȚIONEAZĂ:",
        "step-1-title": "Înscrieți-vă în Comunitate",
        "step-1-description": "Înscrie-te platformei SOLSHR pentru a te conecta cu proiecte solare locale și a colabora la inițiative de energie regenerabilă.",
        "step-1-benefit": " Implică-te în luarea deciziilor despre energia curată în comunitatea ta și contribuie la un viitor sustenabil.",
        "step-2-title": "Generați Energie Solară",
        "step-2-description": "Instalăm panouri solare pentru a valorifica energia curată, care este vândută rețelei naționale sau utilizată de comunitate.",
        "step-2-benefit": "Comunitatea ta contribuie la un mix de energie regenerabilă, reducând dependența de combustibili fosili și îmbunătățind securitatea energetică locală.",
        "step-3-title": "Urmăriți Impactul",
        "step-3-description": "Urmăriți energia produsă și beneficiile acesteia, cum ar fi reducerea emisiilor de CO₂, bucurându-vă de costuri reduse ale energiei și crearea de locuri de muncă locale.",
        "step-3-benefit": "Observați impactul social, de mediu și economic pozitiv al implicării dumneavoastră în inițiativele de energie curată.",
        // Navigation translations
        "mission": "MISIUNE",
        "how-it-works": "CUM FUNCȚIONEAZĂ",
        "form-title": "Înscrieți-vă pe lista de așteptare",
        "name-label": "Nume:",
        "name-placeholder": "Introduceți numele dvs.",
        "email-label": "Email:",
        "email-placeholder": "Introduceți emailul dvs.",
        "comment-label": "Comentariu (opțional):",
        "comment-placeholder": "Introduceți comentariul dvs. (opțional)",
        "submit-button": "Înscrieți-vă pe lista de așteptare",
        "scroller-join-waitlist": "ÎNSCRIEȚI-VĂ PE LISTA DE AȘTEPTARE",
        "calculator-title": "Calculator de Economii Potențiale",
        "amount-invested-label": "Suma Investită (€):",
        "power-generated-label": "Puterea Generată (kWh):",
        "potential-savings-label": "Economii Potențiale (€):",
        "co2-reduction-label": "Reducerea Estimată a CO2:",
        "disclaimer": "Acest calculator este doar pentru scopuri ilustrative. Economiile finale pot varia."
    },
    ru: {
        "hero-title": "СОЛНЕЧНАЯ ЭНЕРГИЯ ОТ 1€",
        "join-waitlist": "ПРИСОЕДИНИТЬСЯ К ЛИСТУ ОЖИДАНИЯ",
        "mission": "МИССИЯ",
        "how-it-works": "КАК ЭТО РАБОТАЕТ",
        "mission-statement": "НАША МИССИЯ - СДЕЛАТЬ СОЛНЕЧНУЮ ЭНЕРГИЮ ДОСТУПНОЙ ЧЕРЕЗ ОБЩЕСТВЕННЫЕ СОЛНЕЧНЫЕ ФЕРМЫ",
        "discount-message": "ПОЛУЧИТЕ СКИДКУ НА СЛЕДУЮЩИЙ СЧЕТ ЗА ЭЛЕКТРОЭНЕРГИЮ",
        "how-it-works-title": "КАК ЭТО РАБОТАЕТ:",
        "step-1-title": "Присоединяйтесь к Сообществу",
        "step-1-description": "Присоединяйтесь к платформе SOLSHR, чтобы подключиться к местным солнечным проектам и сотрудничать в области возобновляемой энергии.",
        "step-1-benefit": "Участвуйте в принятии решений о чистой энергии в вашем сообществе и помогайте создавать устойчивое будущее.",
        "step-2-title": "Генерируйте Солнечную Энергию",
        "step-2-description": "Мы устанавливаем солнечные панели для получения чистой энергии, которая продается в национальную сеть или используется сообществом.",
        "step-2-benefit": "Ваше сообщество вносит вклад в возобновляемую энергетическую смесь, уменьшая зависимость от ископаемого топлива и улучшая местную энергетическую безопасность.",
        "step-3-title": "Следите за Влиянием",
        "step-3-description": "Отслеживайте произведенную энергию и её преимущества, такие как снижение выбросов CO₂, наслаждаясь более низкими затратами на энергию и созданием местных рабочих мест.",
        "step-3-benefit": "Станьте свидетелем положительного социального, экологического и экономического воздействия вашего участия в инициативах чистой энергии.",
        // Navigation translations
        "mission": "МИССИЯ",
        "how-it-works": "КАК ЭТО РАБОТАЕТ",
        "form-title": "Присоединяйтесь к нашему списку ожидания",
        "name-label": "Имя:",
        "name-placeholder": "Введите ваше имя",
        "email-label": "Электронная почта:",
        "email-placeholder": "Введите вашу электронную почту",
        "comment-label": "Комментарий (необязательно):",
        "comment-placeholder": "Введите ваш комментарий (необязательно)",
        "submit-button": "Присоединяйтесь к списку ожидания",
        "scroller-join-waitlist": "ПРИСОЕДИНИТЬСЯ К СПИСКУ ОЖИДАНИЯ",
        "calculator-title": "Калькулятор Потенциальных Сбережений",
        "amount-invested-label": "Инвестированная Сумма (€):",
        "power-generated-label": "Сгенерированная Энергия (кВтч):",
        "potential-savings-label": "Потенциальные Сбережения (€):",
        "co2-reduction-label": "Оценка Снижения CO2:",
        "disclaimer": "Этот калькулятор предназначен только для иллюстративных целей. Окончательные сбережения могут варьироваться."
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