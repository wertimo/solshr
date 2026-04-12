// ── Neural canvas animation ──────────────────────────────────────────────────
(function initNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    const A = [143, 111, 79]; // accent rgb
    const NODE_COUNT = 54;
    const HUB_COUNT  = 6;
    const MAX_DIST   = 145;
    const SIG_EVERY  = 85; // frames between signal spawns

    let nodes = [], signals = [], frame = 0, animId;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
        const r = canvas.parentElement.getBoundingClientRect();
        const d = dpr();
        canvas.width  = r.width  * d;
        canvas.height = r.height * d;
        canvas.style.width  = r.width  + 'px';
        canvas.style.height = r.height + 'px';
        ctx.setTransform(d, 0, 0, d, 0, 0);
        buildNodes(r.width, r.height);
    }

    function buildNodes(w, h) {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            const hub = i < HUB_COUNT;
            nodes.push({
                x:  Math.random() * w,
                y:  Math.random() * h,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                r:  hub ? 3.2 + Math.random() * 0.8 : 1.4 + Math.random() * 0.9,
                ph: Math.random() * Math.PI * 2,
                ps: 0.013 + Math.random() * 0.018,
                hub,
                base: hub ? 0.82 : 0.38 + Math.random() * 0.28,
            });
        }
    }

    function spawnSignal() {
        for (let t = 0; t < 25; t++) {
            const i = Math.floor(Math.random() * nodes.length);
            const j = Math.floor(Math.random() * nodes.length);
            if (i === j) continue;
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            if (Math.hypot(dx, dy) < MAX_DIST) {
                signals.push({ a: nodes[i], b: nodes[j], p: 0, sp: 0.005 + Math.random() * 0.004 });
                return;
            }
        }
    }

    function tick() {
        const w = canvas.width  / dpr();
        const h = canvas.height / dpr();
        ctx.clearRect(0, 0, w, h);
        frame++;
        if (frame % SIG_EVERY === 0) spawnSignal();

        // Move nodes + draw edges
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            n.x += n.vx; n.y += n.vy; n.ph += n.ps;
            if (n.x < 0 || n.x > w) { n.vx *= -1; n.x = Math.max(0, Math.min(w, n.x)); }
            if (n.y < 0 || n.y > h) { n.vy *= -1; n.y = Math.max(0, Math.min(h, n.y)); }

            for (let j = i + 1; j < nodes.length; j++) {
                const m = nodes[j];
                const dx = n.x - m.x, dy = n.y - m.y;
                const d  = Math.hypot(dx, dy);
                if (d < MAX_DIST) {
                    const t = (1 - d / MAX_DIST);
                    ctx.strokeStyle = `rgba(${A[0]},${A[1]},${A[2]},${(t * t * 0.28).toFixed(3)})`;
                    ctx.lineWidth   = (n.hub || m.hub) ? 0.85 : 0.5;
                    ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
                }
            }
        }

        // Signals
        signals = signals.filter(s => {
            s.p += s.sp;
            if (s.p >= 1) return false;
            const x = s.a.x + (s.b.x - s.a.x) * s.p;
            const y = s.a.y + (s.b.y - s.a.y) * s.p;
            const op = Math.sin(s.p * Math.PI);
            const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
            g.addColorStop(0, `rgba(${A[0]},${A[1]},${A[2]},${(op * 0.45).toFixed(3)})`);
            g.addColorStop(1, `rgba(${A[0]},${A[1]},${A[2]},0)`);
            ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.fillStyle = g; ctx.fill();
            ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${A[0]},${A[1]},${A[2]},${op.toFixed(3)})`; ctx.fill();
            return true;
        });

        // Nodes
        nodes.forEach(n => {
            const pr = n.r + Math.sin(n.ph) * 0.55;
            const op = n.base + Math.sin(n.ph) * 0.1;
            if (n.hub) {
                const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 5);
                g.addColorStop(0, `rgba(${A[0]},${A[1]},${A[2]},${(op * 0.3).toFixed(3)})`);
                g.addColorStop(1, `rgba(${A[0]},${A[1]},${A[2]},0)`);
                ctx.beginPath(); ctx.arc(n.x, n.y, pr * 5, 0, Math.PI * 2);
                ctx.fillStyle = g; ctx.fill();
            }
            ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${A[0]},${A[1]},${A[2]},${op.toFixed(3)})`; ctx.fill();
        });

        animId = requestAnimationFrame(tick);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        cancelAnimationFrame(animId);
        resizeTimer = setTimeout(() => { resize(); tick(); }, 120);
    });

    resize();
    tick();
})();

// ── Nav toggle ───────────────────────────────────────────────────────────────
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
