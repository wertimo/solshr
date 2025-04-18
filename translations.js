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
        "last-updated": "Last updated: 18.04.2025",
        "contact-email": "Email: alex@solshr.com"
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
        "calculator-title": "CALCULATOR DE ECONOMII",
        "amount-invested-label": "Investiții (€):",
        "power-generated-label": "Puterea (kWh):",
        "potential-savings-label": "Economii (€):",
        "co2-reduction-label": "Reducerea Estimată a CO2:",
        "disclaimer": "Acest calculator este doar pentru scopuri ilustrative. Economiile finale pot varia.",
        "terms-checkbox-label": "Sunt de acord cu Politica de Confidențialitate și Termenii și Condițiile",
        "terms-agree": "Sunt de acord cu",
        "privacy-policy": "Politica de Confidențialitate",
        "terms-conditions": "Termenii și Condițiile",
        "and": "și",
        "privacy-policy-title": "Politica de Confidențialitate",
        "terms-conditions-title": "Termeni și Condiții",
        "last-updated": "Ultima actualizare: 18.04.2025",
        "contact-email": "Email: alex@solshr.com",
        "privacy-intro": "Bine ați venit la Politica de Confidențialitate SOLSHR. Această politică explică modul în care colectăm, utilizăm, dezvăluim și protejăm informațiile dumneavoastră când vizitați site-ul nostru sau utilizați serviciile noastre.",
        "info-collect": "Informațiile pe Care le Colectăm",
        "info-collect-desc": "Putem colecta informații despre dumneavoastră în diverse moduri. Informațiile pe care le putem colecta prin intermediul site-ului web includ:",
        "personal-data": "Date Personale",
        "personal-data-desc": "Informații de identificare personală, cum ar fi numele, adresa de email și numărul de telefon, pe care ni le furnizați voluntar când vă înregistrați pe site sau când alegeți să participați la diverse activități legate de site.",
        "derivative-data": "Date Derivate",
        "derivative-data-desc": "Informații pe care serverele noastre le colectează automat când accesați site-ul, cum ar fi adresa IP, tipul browserului, sistemul de operare, timpul de acces și paginile vizualizate.",
        "use-info-1": "Crearea și gestionarea contului dvs.",
        "use-info-2": "Trimiterea de e-mailuri referitoare la contul sau comanda dvs.",
        "use-info-3": "Procesarea plăților și rambursărilor.",
        "use-info-4": "Trimiterea unui newsletter.",
        "use-info-5": "Răspunsul la întrebările dvs.",
        "use-info-6": "Solicitarea de feedback și contactarea dvs. despre utilizarea site-ului web.",
        "use-info-7": "Monitorizarea și analiza utilizării și tendințelor pentru a îmbunătăți experiența dvs. cu site-ul web.",
        "disclosure-desc": "Putem partaja informațiile pe care le-am colectat despre dvs. în anumite situații. Informațiile dvs. pot fi divulgate după cum urmează:",
        "disclosure-law-desc": "Dacă considerăm că divulgarea informațiilor despre dvs. este necesară pentru a răspunde procesului legal, pentru a investiga sau remedia potențiale încălcări ale politicilor noastre sau pentru a proteja drepturile, proprietatea și siguranța altora.",
        "disclosure-third-party-desc": "Putem partaja informațiile dvs. cu terțe părți care prestează servicii pentru noi sau în numele nostru, inclusiv procesarea plăților, analiza datelor, livrarea de e-mailuri, servicii de găzduire, servicii pentru clienți și asistență de marketing.",
        "security-desc": "Folosim măsuri administrative, tehnice și fizice de securitate pentru a proteja informațiile dvs. personale. Deși am luat măsuri rezonabile pentru a securiza informațiile personale pe care ni le furnizați, vă rugăm să fiți conștienți că, în ciuda eforturilor noastre, nicio măsură de securitate nu este perfectă sau impenetrabilă.",
        "contact-desc": "Dacă aveți întrebări sau comentarii despre această Politică de Confidențialitate, vă rugăm să ne contactați la:",
        "agreement-desc": "Prin accesarea site-ului nostru web, sunteți de acord să fiți legat de acești Termeni și Condiții și sunteți de acord că sunteți responsabil pentru respectarea legilor locale aplicabile.",
        "license-desc": "Se acordă permisiunea de a descărca temporar o copie a materialelor de pe site-ul web SOLSHR doar pentru vizualizare personală, necomercială și tranzitorie.",
        "license-1": "modifica sau copia materialele;",
        "license-2": "utiliza materialele în scopuri comerciale sau pentru orice afișare publică;",
        "license-3": "încerca să decompilați orice software conținut pe site-ul web SOLSHR;",
        "license-4": "elimina orice drepturi de autor sau alte notații de proprietate din materiale;",
        "license-5": "transfera materialele către o altă persoană sau 'oglindi' materialele pe orice alt server.",
        "license-termination": "Această licență se va termina automat dacă încălcați oricare dintre aceste restricții și poate fi terminată de SOLSHR în orice moment.",
        "disclaimer-1": "Materialele de pe site-ul web SOLSHR sunt furnizate 'ca atare'. SOLSHR nu oferă nicio garanție, expresă sau implicită.",
        "disclaimer-2": "În plus, SOLSHR nu garantează sau face reprezentări privind acuratețea, rezultatele probabile sau fiabilitatea utilizării materialelor.",
        "limitations-desc": "În niciun caz SOLSHR sau furnizorii săi nu vor fi răspunzători pentru daune (incluzând, fără limitare, daune pentru pierderea de date sau profit, sau din cauza întreruperii afacerii).",
        "revisions-desc": "Materialele care apar pe site-ul web SOLSHR pot include erori tehnice, tipografice sau fotografice. SOLSHR nu garantează că materialele sunt exacte, complete sau actuale.",
        "links-desc": "SOLSHR nu a revizuit toate site-urile legate de site-ul său web și nu este responsabil pentru conținutul niciunui astfel de site legat.",
        "modifications-desc": "SOLSHR poate revizui acești termeni de utilizare pentru site-ul său web în orice moment, fără notificare.",
        "governing-law-desc": "Acești termeni și condiții sunt guvernați și interpretați în conformitate cu legile UK și vă supuneți irevocabil jurisdicției exclusive a instanțelor din această locație.",
        "privacy-section-1": "1. Introducere",
        "privacy-section-2": "2. Informații pe Care le Colectăm",
        "privacy-section-2-1": "2.1 Date Personale",
        "privacy-section-2-2": "2.2 Date Derivate",
        "privacy-section-3": "3. Utilizarea Informațiilor Dumneavoastră",
        "privacy-section-4": "4. Divulgarea Informațiilor Dumneavoastră",
        "privacy-section-4-1": "4.1 Prin Lege sau pentru Protejarea Drepturilor",
        "privacy-section-4-2": "4.2 Furnizori de Servicii Terți",
        "privacy-section-5": "5. Securitatea Informațiilor Dumneavoastră",
        "privacy-section-6": "6. Contactați-ne",
        
        "terms-section-1": "1. Acordul cu Termenii",
        "terms-section-2": "2. Licență de Utilizare",
        "terms-section-3": "3. Declinarea Responsabilității",
        "terms-section-4": "4. Limitări",
        "terms-section-5": "5. Revizuiri și Erori",
        "terms-section-6": "6. Legături",
        "terms-section-7": "7. Modificări ale Termenilor de Utilizare",
        "terms-section-8": "8. Legea Aplicabilă",
        "terms-section-9": "9. Contactați-ne"
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
        "form-title": "Присоединяйтесь к списку ожидания",
        "name-label": "Имя:",
        "name-placeholder": "Введите ваше имя",
        "email-label": "Электронная почта:",
        "email-placeholder": "Введите вашу электронную почту",
        "comment-label": "Комментарий (необязательно):",
        "comment-placeholder": "Введите ваш комментарий (необязательно)",
        "submit-button": "Присоединяйтесь к списку ожидания",
        "scroller-join-waitlist": "ПРИСОЕДИНИТЬСЯ К СПИСКУ ОЖИДАНИЯ",
        "calculator-title": "КАЛЬКУЛЯТОР СБЕРЕЖЕНИЙ",
        "amount-invested-label": "Инвестиции (€):",
        "power-generated-label": "Энергия (кВтч):",
        "potential-savings-label": "Сбережения (€):",
        "co2-reduction-label": "Снижения CO2:",
        "disclaimer": "Этот калькулятор предназначен только для иллюстративных целей. Окончательные сбережения могут варьироваться.",
        "terms-checkbox-label": "Я согласен(а) с Политикой конфиденциальности и Условиями использования",
        "terms-agree": "Я согласен(а) с",
        "privacy-policy": "Политикой конфиденциальности",
        "terms-conditions": "Условиями использования",
        "and": "и",
        "privacy-policy-title": "Политика Конфиденциальности",
        "terms-conditions-title": "Условия Использования",
        "last-updated": "Последнее обновление: 18.04.2025",
        "contact-email": "Email: alex@solshr.com",
        "privacy-intro": "Добро пожаловать в Политику конфиденциальности SOLSHR. Эта политика объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при посещении нашего сайта или использовании наших услуг.",
        "info-collect": "Информация, Которую Мы Собираем",
        "info-collect-desc": "Мы можем собирать информацию о вас различными способами. Информация, которую мы можем собирать через веб-сайт, включает:",
        "personal-data": "Личные Данные",
        "personal-data-desc": "Личная идентифицирующая информация, такая как ваше имя, адрес электронной почты и номер телефона, которую вы добровольно предоставляете нам при регистрации на сайте или при участии в различных действиях, связанных с сайтом.",
        "derivative-data": "Производные Данные",
        "derivative-data-desc": "Информация, которую наши серверы автоматически собирают при доступе к сайту, такая как ваш IP-адрес, тип браузера, операционная система, время доступа и просмотренные страницы.",
        "use-info-1": "Создание и управление вашей учетной записью.",
        "use-info-2": "Отправка электронных писем о вашей учетной записи или заказе.",
        "use-info-3": "Обработка платежей и возвратов.",
        "use-info-4": "Отправка новостной рассылки.",
        "use-info-5": "Ответы на ваши запросы.",
        "use-info-6": "Запрос обратной связи и связь с вами по поводу использования веб-сайта.",
        "use-info-7": "Мониторинг и анализ использования и тенденций для улучшения вашего опыта работы с веб-сайтом.",
        "disclosure-desc": "Мы можем делиться собранной о вас информацией в определенных ситуациях. Ваша информация может быть раскрыта следующим образом:",
        "disclosure-law-desc": "Если мы считаем, что раскрытие информации о вас необходимо для ответа на юридический процесс, для расследования или устранения потенциальных нарушений наших политик или для защиты прав, собственности и безопасности других лиц.",
        "disclosure-third-party-desc": "Мы можем делиться вашей информацией с третьими сторонами, которые оказывают услуги для нас или от нашего имени, включая обработку платежей, анализ данных, доставку электронной почты, хостинг-услуги, обслуживание клиентов и маркетинговую помощь.",
        "security-desc": "Мы используем административные, технические и физические меры безопасности для защиты вашей личной информации. Хотя мы предприняли разумные шаги для защиты предоставленной вам личной информации, помните, что, несмотря на наши усилия, никакие меры безопасности не являются совершенными или непроницаемыми.",
        "contact-desc": "Если у вас есть вопросы или комментарии по поводу этой Политики конфиденциальности, пожалуйста, свяжитесь с нами по адресу:",
        "agreement-desc": "Получая доступ к нашему веб-сайту, вы соглашаетесь соблюдать эти Условия использования и соглашаетесь с тем, что несете ответственность за соблюдение применимых местных законов.",
        "license-desc": "Разрешается временно загрузить одну копию материалов с веб-сайта SOLSHR только для личного, некоммерческого просмотра.",
        "license-1": "изменять или копировать материалы;",
        "license-2": "использовать материалы в коммерческих целях или для публичного показа;",
        "license-3": "пытаться декомпилировать любое программное обеспечение на веб-сайте SOLSHR;",
        "license-4": "удалять любые авторские права или другие уведомления о собственности из материалов;",
        "license-5": "передавать материалы другому лицу или 'зеркалировать' материалы на любом другом сервере.",
        "license-termination": "Эта лицензия автоматически прекращается, если вы нарушаете любое из этих ограничений, и может быть прекращена SOLSHR в любое время.",
        "disclaimer-1": "Материалы на веб-сайте SOLSHR предоставляются 'как есть'. SOLSHR не дает никаких гарантий, явных или подразумеваемых.",
        "disclaimer-2": "Кроме того, SOLSHR не гарантирует и не делает никаких заявлений относительно точности, вероятных результатов или надежности использования материалов.",
        "limitations-desc": "Ни при каких обстоятельствах SOLSHR или его поставщики не несут ответственности за любой ущерб (включая, помимо прочего, ущерб от потери данных или прибыли, или из-за прерывания бизнеса).",
        "revisions-desc": "Материалы на веб-сайте SOLSHR могут включать технические, типографские или фотографические ошибки. SOLSHR не гарантирует, что материалы являются точными, полными или актуальными.",
        "links-desc": "SOLSHR не проверял все сайты, связанные с его веб-сайтом, и не несет ответственности за содержание любого такого связанного сайта.",
        "modifications-desc": "SOLSHR может пересматривать эти условия использования своего веб-сайта в любое время без уведомления.",
        "governing-law-desc": "Эти условия регулируются и толкуются в соответствии с законами Великобритании, и вы безоговорочно подчиняетесь исключительной юрисдикции судов в этом месте.",
        "privacy-section-1": "1. Введение",
        "privacy-section-2": "2. Информация, Которую Мы Собираем",
        "privacy-section-2-1": "2.1 Личные Данные",
        "privacy-section-2-2": "2.2 Производные Данные",
        "privacy-section-3": "3. Использование Вашей Информации",
        "privacy-section-4": "4. Раскрытие Вашей Информации",
        "privacy-section-4-1": "4.1 По Закону или для Защиты Прав",
        "privacy-section-4-2": "4.2 Сторонние Поставщики Услуг",
        "privacy-section-5": "5. Безопасность Вашей Информации",
        "privacy-section-6": "6. Свяжитесь с Нами",
        
        "terms-section-1": "1. Соглашение с Условиями",
        "terms-section-2": "2. Лицензия на Использование",
        "terms-section-3": "3. Отказ от Ответственности",
        "terms-section-4": "4. Ограничения",
        "terms-section-5": "5. Изменения и Ошибки",
        "terms-section-6": "6. Ссылки",
        "terms-section-7": "7. Изменения Условий Использования",
        "terms-section-8": "8. Применимое Право",
        "terms-section-9": "9. Свяжитесь с Нами"
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