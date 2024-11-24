function getBrowserLanguage() {
    // Get browser language (returns something like 'en-US' or 'ro-RO')
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Get the first two characters (language code)
    const langCode = browserLang.split('-')[0];
    
    // Check if we support this language
    if (translations[langCode]) {
        return langCode;
    }
    
    // Default to English if language is not supported
    return 'en';
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
        "step-1-title": "Join the Community",
        "step-1-description": "Sign up to SOLSHR platform and become part of a local solar project. Collaborate to propose and prioritize renewable energy initiatives tailored to your region.",
        "step-1-benefit": "Get actively involved in decisions about clean energy projects in your area while supporting a sustainable future.",
        "step-2-title": "Solar Energy Generation",
        "step-2-description": "Solar panels are installed on allocated land, and the generated green energy is sold to the national grid and/or used by the community.",
        "step-2-benefit": "Your community contributes to a renewable energy mix, reducing dependency on fossil fuels and improving local energy security.",
        "step-3-title": "Share the Impact",
        "step-3-description": "Track the energy produced and the environmental benefits (like CO₂ reductions) through the platform while enjoying indirect economic advantages, such as reduced energy costs and local job creation.",
        "step-3-benefit": "Witness the positive social, environmental, and economic impacts of your involvement in clean energy initiatives.",
        // Navigation translations
        "mission": "MISSION",
        "how-it-works": "HOW IT WORKS",
        "form-title": "Join Our Waitlist",
        "name-label": "Name:",
        "name-placeholder": "Enter your name",
        "email-label": "Email:",
        "email-placeholder": "Enter your email",
        "submit-button": "Join Waitlist",
        "scroller-join-waitlist": "JOIN WAITLIST",
        
        // Add more translations here
    },
    ro: {
        "hero-title": "ENERGIE SOLARĂ DE LA 1€",
        "join-waitlist": "ÎNSCRIEȚI-VĂ PE LISTA DE AȘTEPTARE",
        "mission": "MISIUNE",
        "how-it-works": "CUM FUNCȚIONEAZĂ",
        "mission-statement": "MISIUNEA NOASTRĂ ESTE SĂ FACEM ENERGIA SOLARĂ ACCESIBILĂ PRIN FERME SOLARE COMUNITARE",
        "discount-message": "OBȚINEȚI O REDUCERE LA URMĂTOAREA FACTURĂ DE ENERGIE",
        "how-it-works-title": "CUM FUNCȚIONEAZĂ:",
        "step-1-title": "ÎNSCRIEȚI-VĂ ÎN COMUNITATE",
        "step-1-description": "Înscrieți-vă pe platforma SOLSHR și deveniți parte a unui proiect solar local. Colaborați pentru a propune și prioritiza inițiative de energie regenerabilă adaptate regiunii dumneavoastră.",
        "step-1-benefit": "Implică-te activ în deciziile privind proiectele de energie curată din zona ta, sprijinind în același timp un viitor sustenabil.",
        "step-2-title": "GENERAREA ENERGIEI SOLARE",
        "step-2-description": "Panourile solare sunt instalate pe terenuri alocate, iar energia verde generată este vândută rețelei naționale și/sau utilizată de comunitate.",
        "step-2-benefit": "Comunitatea ta contribuie la un mix de energie regenerabilă, reducând dependența de combustibili fosili și îmbunătățind securitatea energetică locală.",
        "step-3-title": "ÎMPĂRTĂȘEȘTE IMPACTUL",
        "step-3-description": "Urmăriți energia produsă și beneficiile de mediu (cum ar fi reducerile de CO₂) prin intermediul platformei, bucurându-vă de avantaje economice indirecte, cum ar fi costurile reduse ale energiei și crearea de locuri de muncă locale.",
        "step-3-benefit": "Observați impactul social, de mediu și economic pozitiv al implicării dumneavoastră în inițiativele de energie curată.",
        // Navigation translations
        "mission": "MISIUNE",
        "how-it-works": "CUM FUNCȚIONEAZĂ",
        "form-title": "Înscrieți-vă pe lista de așteptare",
        "name-label": "Nume:",
        "name-placeholder": "Introduceți numele dvs.",
        "email-label": "Email:",
        "email-placeholder": "Introduceți emailul dvs.",
        "submit-button": "Înscrieți-vă pe lista de așteptare",
        "scroller-join-waitlist": "ÎNSCRIEȚI-VĂ PE LISTA DE AȘTEPTARE",
        
        // Add more translations here
    },
    ru: {
        "hero-title": "СОЛНЕЧНАЯ ЭНЕРГИЯ ОТ 1€",
        "join-waitlist": "ПРИСОЕДИНИТЬСЯ К ЛИСТУ ОЖИДАНИЯ",
        "mission": "МИССИЯ",
        "how-it-works": "КАК ЭТО РАБОТАЕТ",
        "mission-statement": "НАША МИССИЯ - СДЕЛАТЬ СОЛНЕЧНУЮ ЭНЕРГИЮ ДОСТУПНОЙ ЧЕРЕЗ ОБЩЕСТВЕННЫЕ СОЛНЕЧНЫЕ ФЕРМЫ",
        "discount-message": "ПОЛУЧИТЕ СКИДКУ НА СЛЕДУЮЩИЙ СЧЕТ ЗА ЭЛЕКТРОЭНЕРГИЮ",
        "how-it-works-title": "КАК ЭТО РАБОТАЕТ:",
        "step-1-title": "ПРИСОЕДИНИТЬСЯ К СООБЩЕСТВУ",
        "step-1-description": "Пользователи подписываются на платформу SOLSHR и становятся частью местного солнечного проекта. Сообщества сотрудничают, чтобы предложить и приоритизировать инициативы по возобновляемой энергии, адаптированные к их региону.",
        "step-1-benefit": "Активно участвуйте в принятии решений по проектам чистой энергии в вашем районе, поддерживая устойчивое будущее.",
        "step-2-title": "ГЕНЕРАЦИЯ СОЛНЕЧНОЙ ЭНЕРГИИ",
        "step-2-description": "Солнечные панели устанавливаются на выделенных землях, а сгенерированная зеленая энергия продается в национальную сеть и/или используется сообществом.",
        "step-2-benefit": "Ваше сообщество вносит вклад в возобновляемую энергетическую смесь, уменьшая зависимость от ископаемого топлива и улучшая местную энергетическую безопасность.",
        "step-3-title": "ПОДЕЛИТЕСЬ ВЛИЯНИЕМ",
        "step-3-description": "Отслеживай произведенную энергию и экологические преимущества (такие как сокращение CO₂) через платформу, получая косвенные экономические преимущества, такие как снижение затрат на энергию и создание местных рабочих мест.",
        "step-3-benefit": "Станьте свидетелем положительного социального, экологического и экономического воздействия вашего участия в инициативах чистой энергии.",
        // Navigation translations
        "mission": "МИССИЯ",
        "how-it-works": "КАК ЭТО РАБОТАЕТ",
        "form-title": "Присоединяйтесь к нашему списку ожидания",
        "name-label": "Имя:",
        "name-placeholder": "Введите ваше имя",
        "email-label": "Электронная почта:",
        "email-placeholder": "Введите вашу электронную почту",
        "submit-button": "Присоединяйтесь к списку ожидания",
        "scroller-join-waitlist": "ПРИСОЕДИНИТЬСЯ К ЛИСТУ ОЖИДАНИЯ",
        
        // Add more translations here
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
