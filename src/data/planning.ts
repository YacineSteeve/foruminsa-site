import type { PlanningEntity } from '@lib/types/entities';

export const planning: PlanningEntity = [
    {
        name: {
            fr: 'Rencontres entreprises',
            en: 'Company meetings',
        },
        entries: [
            {
                title: {
                    fr: 'Première partie',
                    en: 'First part',
                },
                description: {
                    fr: 'Rencontrez les entreprises sur leurs stands, échangez avec leurs représentants, et passez même des entretiens!',
                    en: 'Meet the companies on their stands, exchange with their representatives, and even have interviews!',
                },
                location: 'STPI',
                isFullDay: false,
                startTime: { hours: 9, minutes: 0 },
                endTime: { hours: 12, minutes: 0 },
            },
            {
                title: {
                    fr: 'Seconde partie',
                    en: 'Second part',
                },
                description: {
                    fr: 'Rencontrez les entreprises sur leurs stands, échangez avec leurs représentants, et passez même des entretiens!',
                    en: 'Meet the companies on their stands, exchange with their representatives, and even have interviews!',
                },
                location: 'STPI',
                isFullDay: false,
                startTime: { hours: 13, minutes: 0 },
                endTime: { hours: 16, minutes: 0 },
            },
        ],
    },
    {
        name: {
            fr: 'Conférences',
            en: 'Conferences',
        },
        entries: [
            {
                title: {
                    fr: 'Comment faire carrière à l’international ?',
                    en: 'How to build a career internationally?',
                },
                description: {
                    fr: 'Témoignages et conseils pratiques permettront de mieux comprendre les parcours possibles, les compétences recherchées et les clés pour réussir son expérience professionnelle à l’étranger.',
                    en: 'Testimonials and practical advice will help you better understand the possible paths, the skills you want to learn and the keys to succeed in your professional experience abroad.',
                },
                location: 'Amphi Vinci',
                isFullDay: false,
                startTime: { hours: 9, minutes: 0 },
                endTime: { hours: 10, minutes: 30 },
            },
            {
                title: {
                    fr: 'L’intelligence artificielle dans l’entreprise',
                    en: 'Artificial intelligence in business',
                },
                description: {
                    fr: 'Cette conférence offrira aux étudiants un regard concret sur l’intégration de l’intelligence artificielle dans le monde professionnel. Elle mettra en lumière ses applications, ses impacts sur les métiers et les nouvelles compétences attendues dans les entreprises de demain.',
                    en: 'This conference will offer students a concrete look at the integration of artificial intelligence into the professional world. It will highlight its applications, its impacts on professions and the new skills expected in the companies of tomorrow.',
                },
                location: 'Amphi Vinci',
                isFullDay: false,
                startTime: { hours: 10, minutes: 45 },
                endTime: { hours: 12, minutes: 15 },
            },
            {
                title: {
                    fr: 'Comment se différencier face à des candidats au profil similaire ?',
                    en: 'How to differentiate yourself from candidates with similar profiles?',
                },
                description: {
                    fr: 'Cette conférence aidera les étudiants à identifier leurs atouts et à apprendre à les valoriser pour se démarquer lors d’un recrutement. Conseils pratiques et retours d’expérience permettront de mieux comprendre comment faire la différence face à des candidats aux profils comparables.',
                    en: 'This conference will help students identify their strengths and learn how to showcase them to stand out during recruitment. Practical advice and feedback will help you better understand how to make a difference against candidates with comparable profiles.',
                },
                location: 'Amphi Vinci',
                isFullDay: false,
                startTime: { hours: 14, minutes: 0 },
                endTime: { hours: 16, minutes: 0 },
            },
        ],
    },
    {
        name: {
            fr: 'Tables rondes',
            en: 'Round tables',
        },
        entries: [
            {
                title: {
                    fr: 'Ils ont monté leur boîte : témoignage de jeunes entrepreneurs',
                    en: 'They started their own business: testimony of young entrepreneurs',
                },
                description: {
                    fr: 'Cette table ronde réunit de jeunes entrepreneurs venus partager leur parcours, leurs réussites et les défis rencontrés dans la création d’entreprise.',
                    en: 'This round table brings together young entrepreneurs who share their journey, successes and challenges encountered in starting a business.',
                },
                location: 'Amphi Sophie Germain',
                isFullDay: false,
                startTime: { hours: 9, minutes: 0 },
                endTime: { hours: 10, minutes: 30 },
            },
            {
                title: {
                    fr: 'Comment négocier nos premiers contrats ? Stages ?',
                    en: 'How to negotiate our first contracts? Internships?',
                },
                description: {
                    fr: 'Cette table ronde proposera aux étudiants des conseils concrets pour aborder leurs premières négociations, qu’il s’agisse d’un stage ou d’un premier contrat de travail. Avec l’appui de professionnels, ils pourront mieux comprendre les bonnes pratiques et les pièges à éviter pour défendre au mieux leurs intérêts.',
                    en: 'This round table will offer students concrete advice on how to approach their first negotiations, whether it is an internship or a first employment contract. With the support of professionals, they will be able to better understand best practices and pitfalls to avoid in order to best defend their interests.',
                },
                location: 'Amphi Sophie Germain',
                isFullDay: false,
                startTime: { hours: 10, minutes: 45 },
                endTime: { hours: 12, minutes: 15 },
            },
            {
                title: {
                    fr: 'Travailler dans une startup, PME ou grand groupe, quelles différences ?',
                    en: 'Working in a startup, SME or large group, what are the differences?',
                },
                description: {
                    fr: 'Cette table ronde invite des intervenants issus de startups, PME et grands groupes à partager leur expérience. Les étudiants pourront ainsi comparer concrètement ces différents environnements de travail et échanger directement avec des professionnels pour mieux préparer leurs choix de carrière.',
                    en: 'This round table invites speakers from startups, SMEs and large groups to share their experience. Students will thus be able to concretely compare these different work environments and exchange directly with professionals to better prepare their career choices.',
                },
                location: 'Amphi Sophie Germain',
                isFullDay: false,
                startTime: { hours: 14, minutes: 0 },
                endTime: { hours: 16, minutes: 0 },
            },
        ],
    },
    {
        name: {
            fr: 'Ateliers',
            en: 'Workshops',
        },
        entries: [
            {
                title: {
                    fr: 'Mini défis “Dans un monde durable”',
                    en: 'Mini challenges "In a sustainable world"',
                },
                description: {
                    fr: 'Les étudiants viendront se prêter au jeu de plusieurs ateliers avec un thème commun : le développement durable. Tri minute, quizz express ou encore calcul de sa propre empreinte carbone, on vous attend nombreux/se.',
                    en: 'Students will come to take part in several workshops with a common theme: sustainable development. Minute sorting, express quiz or even calculating your own carbon footprint, we are waiting for you in large numbers.',
                },
                location: 'Ateliers divers',
                isFullDay: false,
                startTime: { hours: 9, minutes: 0 },
                endTime: { hours: 12, minutes: 0 },
            },
            {
                title: {
                    fr: 'Aide à la création de profil LinkedIn et relecture de CV',
                    en: 'Help with creating a LinkedIn profile and proofreading a CV',
                },
                description: {
                    fr: 'Toute la journée: Des professionnels seront présents pour t’aider à mettre en forme ta page LinkedIn en mettant en avant ton profil! Tu pourras aussi faire relire ton CV!',
                    en: 'All day long: Professionals will be present to help you format your LinkedIn page by highlighting your profile! You can also have your CV proofread!',
                },
                location: 'STPI',
                isFullDay: true,
                startTime: null,
                endTime: null,
            },
        ],
    },
    {
        name: {
            fr: 'Autres',
            en: 'Others',
        },
        entries: [
            {
                title: {
                    fr: 'Repas',
                    en: 'Lunch',
                },
                description: {
                    fr: "Bénéficie d'un repas gratuit sur place!",
                    en: 'Enjoy a free meal on site!',
                },
                location: 'Instagram, @forumbyinsa',
                isFullDay: false,
                startTime: { hours: 12, minutes: 0 },
                endTime: { hours: 13, minutes: 0 },
            },
        ],
    },
] as const;
