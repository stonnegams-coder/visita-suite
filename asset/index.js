/* ==========================================================
   VISTA SUITES – script.js
   Animations sobres et interactions (accueil, blog, contact)
   À charger dans le <head> de chaque page, SANS "defer" :
   <script src="script.js"></script>
   (s'il est déjà en bas du <body>, déplacez-le dans le <head>)
   ========================================================== */

(function () {
    'use strict';

    /* ---------- Réglages ---------- */
    // true  : le formulaire simule l'envoi (tant qu'il n'y a pas de serveur)
    // false : le formulaire s'envoie normalement vers l'attribut "action"
    const SIMULER_ENVOI = true;

    const racine = document.documentElement;
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // La classe "js" active les états initiaux des animations (voir style.css).
    // Posée tout de suite pour éviter un clignotement au chargement.
    // Si la personne a demandé moins d'animations, on ne l'ajoute pas :
    // tout reste alors visible et immobile.
    if (!reduit) racine.classList.add('js');

    document.addEventListener('DOMContentLoaded', function () {
        marquerPageActive();
        optimiserImages();
        animerFleches();
        gererNavigation();
        gererFormulaire();

        if (!reduit) {
            preparerApparitionsPhotos();
            activerParallaxe();
            activerTransitionsDePage();
        }
    });

    /* ==========================================================
       OUTILS
       ========================================================== */

    // Exécute une fonction au défilement / redimensionnement, au plus
    // une fois par image affichée (fluide, sans surcharger le navigateur).
    function surDefilement(fn) {
        let attente = false;
        const lancer = function () {
            if (attente) return;
            attente = true;
            requestAnimationFrame(function () {
                attente = false;
                fn();
            });
        };
        window.addEventListener('scroll', lancer, { passive: true });
        window.addEventListener('resize', lancer);
        fn();
    }

    /* ==========================================================
       ACCESSIBILITÉ / PERFORMANCE
       ========================================================== */

    function marquerPageActive() {
        const lien = document.querySelector('.nav-menu a.active');
        if (lien) lien.setAttribute('aria-current', 'page');
    }

    // Chargement différé des images hors bannière
    function optimiserImages() {
        document.querySelectorAll('img:not(.banner-img)').forEach(function (img) {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    /* ==========================================================
       BOUTONS : la flèche « → » avance au survol
       ========================================================== */

    function animerFleches() {
        document.querySelectorAll('.button').forEach(function (bouton) {
            const texte = bouton.textContent;
            if (texte.indexOf('\u2192') === -1) return;

            const parties = texte.split('\u2192');
            bouton.textContent = parties[0].replace(/\s+$/, '');

            const fleche = document.createElement('span');
            fleche.className = 'fleche';
            fleche.setAttribute('aria-hidden', 'true');
            fleche.textContent = '\u2192';
            bouton.appendChild(fleche);
        });
    }

    /* ==========================================================
       NAVIGATION : fond marine au défilement, masquée en descendant
       ========================================================== */

    function gererNavigation() {
        const nav = document.querySelector('.navbar');
        if (!nav) return;

        let dernier = window.scrollY;

        surDefilement(function () {
            const y = window.scrollY;
            nav.classList.toggle('is-scrolled', y > 40);

            if (reduit) return;

            const delta = y - dernier;
            if (Math.abs(delta) > 6) {
                const focus = nav.contains(document.activeElement);
                nav.classList.toggle('is-hidden', delta > 0 && y > 400 && !focus);
                dernier = y;
            }
            if (y < 100) nav.classList.remove('is-hidden');
        });
    }

   /* ==========================================================
   GRAND AZUR – script.js
   Animations et interactions
   ========================================================== */

(function () {
    'use strict';

    /* ---------- Réglages ---------- */

    const SIMULER_ENVOI = true;

    const racine = document.documentElement;
    const reduit = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!reduit) {
        racine.classList.add('js');
    }

    document.addEventListener('DOMContentLoaded', function () {

        marquerPageActive();

        /* Gestion des images */
        gererImages();

        animerFleches();
        gererNavigation();
        gererFormulaire();

        if (!reduit) {
            preparerApparitionsPhotos();
            activerParallaxe();
            activerTransitionsDePage();
        }
    });


    /* ==========================================================
       OUTILS
       ========================================================== */

    function surDefilement(fn) {

        let attente = false;

        const lancer = function () {

            if (attente) return;

            attente = true;

            requestAnimationFrame(function () {

                attente = false;
                fn();

            });
        };

        window.addEventListener(
            'scroll',
            lancer,
            { passive: true }
        );

        window.addEventListener(
            'resize',
            lancer
        );

        fn();
    }


    /* ==========================================================
       ACCESSIBILITÉ
       ========================================================== */

    function marquerPageActive() {

        const lien = document.querySelector(
            '.nav-menu a.active'
        );

        if (lien) {
            lien.setAttribute(
                'aria-current',
                'page'
            );
        }
    }


    /* ==========================================================
       IMAGES
       ========================================================== */

    function gererImages() {

        const images = document.querySelectorAll('img');

        images.forEach(function (img) {

            /*
             * Si aucune source n'est définie,
             * on ne fait rien.
             */
            if (!img.getAttribute('src')) {
                return;
            }

            /*
             * Chargement normal des images.
             * On évite ici d'imposer lazy à toutes
             * les images du site.
             */
            img.loading = 'eager';

            /*
             * Décodage asynchrone pour améliorer
             * l'affichage sans bloquer la page.
             */
            img.decoding = 'async';

        });
    }


    /* ==========================================================
       BOUTONS
       ========================================================== */

    function animerFleches() {

        document.querySelectorAll('.button').forEach(
            function (bouton) {

                const texte = bouton.textContent;

                if (texte.indexOf('→') === -1) {
                    return;
                }

                const parties = texte.split('→');

                bouton.textContent =
                    parties[0].replace(/\s+$/, '');

                const fleche =
                    document.createElement('span');

                fleche.className = 'fleche';

                fleche.setAttribute(
                    'aria-hidden',
                    'true'
                );

                fleche.textContent = '→';

                bouton.appendChild(fleche);
            }
        );
    }


    /* ==========================================================
       NAVIGATION
       ========================================================== */

    function gererNavigation() {

        const nav =
            document.querySelector('.navbar');

        if (!nav) return;

        let dernier =
            window.scrollY;

        surDefilement(function () {

            const y =
                window.scrollY;

            nav.classList.toggle(
                'is-scrolled',
                y > 40
            );

            if (reduit) return;

            const delta =
                y - dernier;

            if (Math.abs(delta) > 6) {

                const focus =
                    nav.contains(
                        document.activeElement
                    );

                nav.classList.toggle(
                    'is-hidden',
                    delta > 0 &&
                    y > 400 &&
                    !focus
                );

                dernier = y;
            }

            if (y < 100) {

                nav.classList.remove(
                    'is-hidden'
                );
            }
        });
    }


    /* ==========================================================
       APPARITION DES PHOTOS
       ========================================================== */

    function preparerApparitionsPhotos() {

        const photos = [];

        /*
         * On cible les classes utilisées par
         * tes images de cartes.
         */
        document.querySelectorAll(
            '.equipement-img, .pictogrammes-img, .blog-img'
        ).forEach(function (img) {

            const carte =
                img.closest(
                    'article, figure, .blog-1'
                ) || img;

            if (!carte.parentElement) {
                return;
            }

            const freres =
                Array.from(
                    carte.parentElement.children
                ).filter(function (element) {

                    return element.tagName ===
                        carte.tagName;
                });

            const colonne =
                Math.max(
                    0,
                    freres.indexOf(carte)
                ) % 3;

            img.dataset.reveal = 'image';

            img.style.setProperty(
                '--d',
                (colonne * 0.12).toFixed(2) + 's'
            );

            photos.push({
                img: img,
                carte: carte
            });
        });


        if (!photos.length) {
            return;
        }


        function verifier() {

            const limite =
                window.innerHeight * 0.94;

            for (
                let i = photos.length - 1;
                i >= 0;
                i--
            ) {

                const r =
                    photos[i].carte
                        .getBoundingClientRect();

                if (
                    r.top < limite &&
                    r.bottom > 0
                ) {

                    photos[i].img.classList.add(
                        'is-visible'
                    );

                    photos.splice(i, 1);
                }
            }
        }


        surDefilement(verifier);

        window.addEventListener(
            'load',
            verifier
        );
    }


    /* ==========================================================
       PARALLAXE
       ========================================================== */

    function activerParallaxe() {

        const cibles = [];


        function ajouter(
            selecteurImage,
            selecteurConteneur,
            mode
        ) {

            document
                .querySelectorAll(selecteurImage)
                .forEach(function (img) {

                    const conteneur =
                        img.closest(
                            selecteurConteneur
                        );

                    if (conteneur) {

                        cibles.push({
                            img: img,
                            conteneur: conteneur,
                            mode: mode
                        });
                    }
                });
        }


        ajouter(
            '.banner-img',
            '.banner',
            'haut'
        );

        ajouter(
            '.vlog-img',
            'section',
            'section'
        );


        if (!cibles.length) {
            return;
        }


        surDefilement(function () {

            const hauteurFenetre =
                window.innerHeight;


            cibles.forEach(function (c) {

                const r =
                    c.conteneur
                        .getBoundingClientRect();


                if (
                    r.bottom < 0 ||
                    r.top > hauteurFenetre
                ) {
                    return;
                }


                const marge =
                    r.height * 0.09;

                let y;


                if (c.mode === 'haut') {

                    y = Math.min(
                        Math.max(
                            window.scrollY * 0.18,
                            0
                        ),
                        marge
                    );

                } else {

                    const p =
                        (
                            r.top +
                            r.height / 2 -
                            hauteurFenetre / 2
                        ) /
                        (
                            hauteurFenetre / 2 +
                            r.height / 2
                        );

                    y =
                        -Math.max(
                            -1,
                            Math.min(1, p)
                        ) * marge;
                }


                c.img.style.transform =
                    'translate3d(0,' +
                    y.toFixed(1) +
                    'px,0)';
            });
        });
    }


    /* ==========================================================
       TRANSITION ENTRE LES PAGES
       ========================================================== */

    function activerTransitionsDePage() {

        document.addEventListener(
            'click',
            function (e) {

                const lien =
                    e.target.closest(
                        'a[href]'
                    );

                if (
                    !lien ||
                    e.defaultPrevented ||
                    e.button !== 0
                ) {
                    return;
                }


                if (
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey
                ) {
                    return;
                }


                if (
                    lien.target &&
                    lien.target !== '_self'
                ) {
                    return;
                }


                if (
                    lien.hasAttribute(
                        'download'
                    )
                ) {
                    return;
                }


                let url;


                try {

                    url = new URL(
                        lien.href,
                        window.location.href
                    );

                } catch (err) {

                    return;
                }


                const protocolesOk = [
                    'http:',
                    'https:',
                    'file:'
                ];


                if (
                    protocolesOk.indexOf(
                        url.protocol
                    ) === -1
                ) {
                    return;
                }


                if (
                    url.origin !==
                    window.location.origin
                ) {
                    return;
                }


                if (
                    url.pathname ===
                    window.location.pathname
                ) {
                    return;
                }


                e.preventDefault();

                document.body.classList.add(
                    'is-leaving'
                );


                window.setTimeout(
                    function () {

                        window.location.href =
                            url.href;

                    },
                    380
                );
            }
        );


        window.addEventListener(
            'pageshow',
            function (e) {

                if (e.persisted) {

                    document.body.classList.remove(
                        'is-leaving'
                    );
                }
            }
        );
    }


    /* ==========================================================
       FORMULAIRE DE CONTACT
       ========================================================== */

    function gererFormulaire() {

        const formulaire =
            document.querySelector(
                '.form-formular-content form'
            );

        if (!formulaire) {
            return;
        }


        const champs =
            formulaire.querySelectorAll(
                'input, textarea'
            );


        const bouton =
            formulaire.querySelector(
                'button[type="submit"]'
            );


        const statut =
            document.createElement('p');

        statut.className =
            'form-status';

        statut.setAttribute(
            'role',
            'status'
        );

        statut.setAttribute(
            'aria-live',
            'polite'
        );

        formulaire.appendChild(statut);


        function afficher(
            message,
            erreur
        ) {

            statut.textContent =
                message;

            statut.classList.toggle(
                'is-error',
                !!erreur
            );

            statut.classList.add(
                'is-shown'
            );
        }


        champs.forEach(
            function (champ) {

                champ.addEventListener(
                    'blur',
                    function () {

                        champ.classList.toggle(
                            'is-invalid',
                            !champ.checkValidity()
                        );
                    }
                );


                champ.addEventListener(
                    'input',
                    function () {

                        if (
                            champ.checkValidity()
                        ) {

                            champ.classList.remove(
                                'is-invalid'
                            );
                        }
                    }
                );
            }
        );


        formulaire.addEventListener(
            'submit',
            function (e) {

                if (
                    !formulaire.checkValidity()
                ) {

                    e.preventDefault();


                    champs.forEach(
                        function (champ) {

                            champ.classList.toggle(
                                'is-invalid',
                                !champ.checkValidity()
                            );
                        }
                    );


                    const premier =
                        formulaire.querySelector(
                            ':invalid'
                        );


                    if (premier) {
                        premier.focus();
                    }


                    afficher(
                        'Merci de compléter les champs obligatoires : nom et e-mail.',
                        true
                    );

                    return;
                }


                if (!SIMULER_ENVOI) {
                    return;
                }


                e.preventDefault();


                const texteInitial =
                    bouton ?
                    bouton.textContent :
                    '';


                if (bouton) {

                    bouton.classList.add(
                        'is-loading'
                    );

                    bouton.textContent =
                        'Envoi…';
                }


                window.setTimeout(
                    function () {

                        formulaire.reset();


                        champs.forEach(
                            function (champ) {

                                champ.classList.remove(
                                    'is-invalid'
                                );
                            }
                        );


                        if (bouton) {

                            bouton.classList.remove(
                                'is-loading'
                            );

                            bouton.textContent =
                                texteInitial;
                        }


                        afficher(
                            'Merci, votre message a bien été envoyé. Nous vous répondons sous 24 h.',
                            false
                        );

                    },
                    1200
                );
            }
        );
    }

})();

    /* ==========================================================
       PARALLAXE DOUCE DES GRANDES PHOTOS
       (bannière, image plein écran de l'accueil, image du blog)
       ========================================================== */

    function activerParallaxe() {
        const cibles = [];

        function ajouter(selecteurImage, selecteurConteneur, mode) {
            document.querySelectorAll(selecteurImage).forEach(function (img) {
                const conteneur = img.closest(selecteurConteneur);
                if (conteneur) cibles.push({ img: img, conteneur: conteneur, mode: mode });
            });
        }

        ajouter('.banner-img', '.banner', 'haut');
        ajouter('.vlog-img', 'section', 'section');
        ajouter('.pub-slider-img', 'section', 'section');

        if (!cibles.length) return;

        surDefilement(function () {
            const hauteurFenetre = window.innerHeight;

            cibles.forEach(function (c) {
                const r = c.conteneur.getBoundingClientRect();
                if (r.bottom < 0 || r.top > hauteurFenetre) return; // hors écran

                // L'image est agrandie de 20 % en CSS : marge de sécurité de 9 %
                const marge = r.height * 0.09;
                let y;

                if (c.mode === 'haut') {
                    y = Math.min(Math.max(window.scrollY * 0.18, 0), marge);
                } else {
                    const p = (r.top + r.height / 2 - hauteurFenetre / 2) /
                              (hauteurFenetre / 2 + r.height / 2);
                    y = -Math.max(-1, Math.min(1, p)) * marge;
                }

                c.img.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
            });
        });
    }

    /* ==========================================================
       TRANSITION ENTRE LES PAGES (fondu à la sortie)
       ========================================================== */

    function activerTransitionsDePage() {
        document.addEventListener('click', function (e) {
            const lien = e.target.closest('a[href]');
            if (!lien || e.defaultPrevented || e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            if (lien.target && lien.target !== '_self') return;
            if (lien.hasAttribute('download')) return;

            let url;
            try {
                url = new URL(lien.href, window.location.href);
            } catch (err) {
                return;
            }

            const protocolesOk = ['http:', 'https:', 'file:'];
            if (protocolesOk.indexOf(url.protocol) === -1) return; // mailto:, tel:...
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname) return; // même page ou ancre

            e.preventDefault();
            document.body.classList.add('is-leaving');
            window.setTimeout(function () {
                window.location.href = url.href;
            }, 380);
        });

        // Retour arrière : la page revient du cache, on enlève le fondu
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) document.body.classList.remove('is-leaving');
        });
    }

    /* ==========================================================
       FORMULAIRE DE CONTACT : validation + retour visuel
       ========================================================== */

    function gererFormulaire() {
        const formulaire = document.querySelector('.form-formular-content form');
        if (!formulaire) return;

        const champs = formulaire.querySelectorAll('input, textarea');
        const bouton = formulaire.querySelector('button[type="submit"]');

        // Zone de message sous le bouton (annoncée par les lecteurs d'écran)
        const statut = document.createElement('p');
        statut.className = 'form-status';
        statut.setAttribute('role', 'status');
        statut.setAttribute('aria-live', 'polite');
        formulaire.appendChild(statut);

        function afficher(message, erreur) {
            statut.textContent = message;
            statut.classList.toggle('is-error', !!erreur);
            statut.classList.add('is-shown');
        }

        // Retire l'état d'erreur dès que le champ redevient valide
        champs.forEach(function (champ) {
            champ.addEventListener('blur', function () {
                champ.classList.toggle('is-invalid', !champ.checkValidity());
            });
            champ.addEventListener('input', function () {
                if (champ.checkValidity()) champ.classList.remove('is-invalid');
            });
        });

        formulaire.addEventListener('submit', function (e) {
            if (!formulaire.checkValidity()) {
                e.preventDefault();
                champs.forEach(function (champ) {
                    champ.classList.toggle('is-invalid', !champ.checkValidity());
                });
                const premier = formulaire.querySelector(':invalid');
                if (premier) premier.focus();
                afficher('Merci de compléter les champs obligatoires : nom et e-mail.', true);
                return;
            }

            if (!SIMULER_ENVOI) return; // envoi normal vers l'attribut "action"

            e.preventDefault();
            const texteInitial = bouton ? bouton.textContent : '';
            if (bouton) {
                bouton.classList.add('is-loading');
                bouton.textContent = 'Envoi…';
            }

            window.setTimeout(function () {
                formulaire.reset();
                champs.forEach(function (champ) { champ.classList.remove('is-invalid'); });
                if (bouton) {
                    bouton.classList.remove('is-loading');
                    bouton.textContent = texteInitial;
                }
                afficher('Merci, votre message a bien été envoyé. Nous vous répondons sous 24 h.', false);
            }, 1200);
        });
    }
})();