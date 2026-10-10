(() => {
            const $ = (s, c = document) => c.querySelector(s);
            const $$ = (s, c = document) => [...c.querySelectorAll(s)];

            /* Header state */
            const header = $('#header');
            const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();

            /* Mobile drawer */
            const toggle = $('#menuToggle'), drawer = $('#drawer'), backdrop = $('#backdrop');
            const setMenu = (open) => {
                drawer.classList.toggle('is-open', open);
                backdrop.classList.toggle('is-open', open);
                drawer.setAttribute('aria-hidden', String(!open));
                toggle.setAttribute('aria-expanded', String(open));
                document.body.classList.toggle('no-scroll', open);
            };
            toggle.addEventListener('click', () => setMenu(true));
            $('#drawerClose').addEventListener('click', () => setMenu(false));
            backdrop.addEventListener('click', () => setMenu(false));
            $$('a', drawer).forEach(a => a.addEventListener('click', () => setMenu(false)));
            window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
            window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

            /* Scroll spy */
            const spyLinks = $$('.nav a, .drawer-nav a');
            const spy = new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (!en.isIntersecting) return;
                    const id = en.target.id;
                    if (!spyLinks.some(a => a.getAttribute('href') === '#' + id)) return;
                    spyLinks.forEach((a) => {
                        const on = a.getAttribute('href') === '#' + id;
                        a.classList.toggle('is-active', on);
                        on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
                    });
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            $$('main section[id]').forEach(s => spy.observe(s));

            /* Schedule tabs */
            const tabs = $$('[role="tab"]');
            const selectTab = (tab, focus) => {
                tabs.forEach((t) => {
                    const on = t === tab;
                    t.setAttribute('aria-selected', String(on));
                    t.tabIndex = on ? 0 : -1;
                    $('#' + t.getAttribute('aria-controls')).hidden = !on;
                });
                if (focus) tab.focus();
            };
            tabs.forEach((tab, i) => {
                tab.addEventListener('click', () => selectTab(tab, false));
                tab.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight') selectTab(tabs[(i + 1) % tabs.length], true);
                    if (e.key === 'ArrowLeft') selectTab(tabs[(i - 1 + tabs.length) % tabs.length], true);
                });
            });

            /* Lightbox */
            const shots = $$('.shot');
            const dlg = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
            let current = 0;
            const show = (n) => {
                current = (n + shots.length) % shots.length;
                const img = $('img', shots[current]);
                lbImg.src = img.currentSrc || img.src;
                lbImg.alt = img.alt;
                lbCap.textContent = `${current + 1} / ${shots.length} · ${$('.cap', shots[current]).textContent}`;
            };
            shots.forEach((s, n) => s.addEventListener('click', () => { show(n); dlg.showModal(); }));
            $('#lbPrev').addEventListener('click', () => show(current - 1));
            $('#lbNext').addEventListener('click', () => show(current + 1));
            $('#lbClose').addEventListener('click', () => dlg.close());
            dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
            dlg.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') show(current - 1);
                if (e.key === 'ArrowRight') show(current + 1);
            });
            let touchStartX = 0;
            dlg.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
            dlg.addEventListener('touchend', (e) => {
                const diff = e.changedTouches[0].screenX - touchStartX;
                if (Math.abs(diff) > 40) {
                    if (diff < 0) show(current + 1);
                    else show(current - 1);
                }
            }, { passive: true });
        })();
