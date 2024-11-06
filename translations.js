const translations = {
    en: {
        "hero-title": "SOLAR STARTING AT €1",
        "join-waitlist": "JOIN WAITLIST",
        "mission": "MISSION",
        "how-it-works": "HOW IT WORKS",
        "mission-statement": "OUR MISSION IS TO MAKE SOLAR ENERGY ACCESSIBLE THROUGH COMMUNITY DRIVEN SOLAR FARMS",
        "discount-message": "GET A DISCOUNT ON YOUR NEXT ENERGY BILL",
        "how-it-works-title": "HOW IT WORKS:",
        "step-1-title": "INVESTING",
        "step-1-description": "If you're working with us you're an investor, not just a customer.",
        "step-2-title": "BUILDING",
        "step-2-description": "Most of your money invested will go directly into building and maintaining solar farms.",
        "step-3-title": "ROI",
        "step-3-description": "We made it easy for every consumer to get a discount on their energy bill.",
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
        "step-1-title": "INVESTIȚIE",
        "step-1-description": "Dacă lucrați cu noi, sunteți un investitor, nu doar un client.",
        "step-2-title": "CONSTRUCȚIE",
        "step-2-description": "Cea mai mare parte a banilor investiți va merge direct în construirea și întreținerea fermelor solare.",
        "step-3-title": "RENTABILITATE",
        "step-3-description": "Am făcut ușor pentru fiecare consumator să obțină o reducere la factura de energie.",
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
        "step-1-title": "ИНВЕСТИРОВАНИЕ",
        "step-1-description": "Если вы работаете с нами, вы инвестор, а не просто клиент.",
        "step-2-title": "СТРОИТЕЛЬСТВО",
        "step-2-description": "Большая часть ваших инвестиций пойдет непосредственно на строительство и обслуживание солнечных ферм.",
        "step-3-title": "ДОХОДНОСТЬ",
        "step-3-description": "Мы сделали так, чтобы каждый потребитель мог легко получить скидку на счет за электроэнергию.",
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
            element.textContent = translations[language][key];
            console.log("Translated to:", translations[language][key]);
        } else {
            console.log("Translation not found for key:", key);
        }
    });
}
