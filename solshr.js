const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

const leadForm = document.querySelector('#leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(leadForm);
        const name = formData.get('name')?.toString().trim() || '';
        const company = formData.get('company')?.toString().trim() || '';
        const email = formData.get('email')?.toString().trim() || '';
        const interest = formData.get('interest')?.toString().trim() || '';
        const bottlenecks = formData.get('bottlenecks')?.toString().trim() || '';
        const budget = formData.get('budget')?.toString().trim() || 'Not specified';

        const subject = encodeURIComponent(`${interest || 'New Enquiry'} | ${company || name || 'SOLSHR lead'}`);
        const body = encodeURIComponent(
`Name: ${name}
Company: ${company}
Email: ${email}
Interest: ${interest}
Budget: ${budget}

Current bottlenecks / context:
${bottlenecks}`
        );

        window.location.href = `mailto:alex@solshr.com?subject=${subject}&body=${body}`;
    });
}
