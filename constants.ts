
import { AppData, Destination, BlogPost, SiteConfig, Stats } from './types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    slug: 'santorini-greece',
    status: 'published',
    name: 'Santorini, Greece',
    region: 'Europe',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2929&auto=format&fit=crop',
    description: 'Experience the iconic white-washed buildings and stunning sunsets of the Aegean Sea.',
    type: 'Luxury',
    translations: {
      bg: {
        name: 'Санторини, Гърция',
        region: 'Европа',
        description: 'Насладете се на емблематичните бели сгради и зашеметяващите залези на Егейско море.'
      }
    }
  },
  {
    id: '2',
    slug: 'kyoto-japan',
    status: 'published',
    name: 'Kyoto, Japan',
    region: 'Asia',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop',
    description: 'Immerse yourself in ancient traditions, tea ceremonies, and breathtaking cherry blossoms.',
    type: 'Cultural',
    translations: {
      bg: {
        name: 'Киото, Япония',
        region: 'Азия',
        description: 'Потопете се в древните традиции, чайни церемонии и спиращи дъха черешови цветове.'
      }
    }
  },
  {
    id: '3',
    slug: 'patagonia-chile',
    status: 'published',
    name: 'Patagonia, Chile',
    region: 'South America',
    price: 4100,
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=2787&auto=format&fit=crop',
    description: 'Adventure awaits in the rugged landscapes of mountains, glaciers, and fjords.',
    type: 'Adventure',
    translations: {
      bg: {
        name: 'Патагония, Чили',
        region: 'Южна Америка',
        description: 'Приключението ви очаква в суровите пейзажи от планини, ледници и фиорди.'
      }
    }
  },
  {
    id: '4',
    slug: 'maldives',
    status: 'draft',
    name: 'Maldives',
    region: 'Asia',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1514282401047-d77a71838aa1?q=80&w=2940&auto=format&fit=crop',
    description: 'The ultimate relaxation destination with private overwater bungalows and crystal clear waters.',
    type: 'Relaxation',
    translations: {
      bg: {
        name: 'Малдиви',
        region: 'Азия',
        description: 'Крайната дестинация за релакс с частни бунгала над водата и кристално чисти води.'
      }
    }
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'hidden-gems-europe',
    status: 'published',
    title: 'Top 10 Hidden Gems in Europe',
    excerpt: 'Discover the secret spots that tourists often miss when visiting the old continent.',
    date: 'Oct 12, 2023',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop',
    translations: {
      bg: {
        title: 'Топ 10 скрити съкровища в Европа',
        excerpt: 'Открийте тайните места, които туристите често пропускат, когато посещават стария континент.'
      }
    }
  },
  {
    id: '2',
    slug: 'pack-for-safari',
    status: 'published',
    title: 'How to Pack for a Safari',
    excerpt: 'Essential gear and clothing tips for your first African adventure.',
    date: 'Sep 28, 2023',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2948&auto=format&fit=crop',
    translations: {
      bg: {
        title: 'Как да приготвим багажа за сафари',
        excerpt: 'Основни съвети за екипировка и облекло за вашето първо африканско приключение.'
      }
    }
  },
  {
    id: '3',
    slug: 'eco-tourism-rise',
    status: 'published',
    title: 'The Rise of Eco-Tourism',
    excerpt: 'Why sustainable travel is becoming the new standard for luxury explorers.',
    date: 'Nov 05, 2023',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2940&auto=format&fit=crop',
    translations: {
      bg: {
        title: 'Възходът на екотуризма',
        excerpt: 'Защо устойчивото пътуване се превръща в новия стандарт за луксозните изследователи.'
      }
    }
  }
];

export const INITIAL_CONFIG: SiteConfig = {
  primaryColor: '#0f172a',
  secondaryColor: '#d4af37',
  heroTitle: 'Journey Beyond the Ordinary',
  heroSubtitle: 'Curated experiences for the modern explorer.',
  aboutText: 'WorldClass was founded on the belief that travel is the only thing you buy that makes you richer. With over 20 years of experience, we curate bespoke journeys that blend luxury with authenticity.',
  missionText: 'Our mission is to connect people with the world\'s most extraordinary places while promoting sustainable and respectful tourism.',
  supportedLanguages: [
    { code: 'en', label: 'English', flagCode: 'gb' },
    { code: 'bg', label: 'Български', flagCode: 'bg' }
  ],
  defaultLanguage: 'en',
  translations: {
    bg: {
      heroTitle: 'Пътуване отвъд обикновеното',
      heroSubtitle: 'Подбрани преживявания за съвременния изследовател.',
      aboutText: 'WorldClass е основана с вярата, че пътуването е единственото нещо, което купувате и ви прави по-богати. С над 20 години опит, ние създаваме персонализирани пътешествия, които съчетават лукс с автентичност.',
      missionText: 'Нашата мисия е да свързваме хората с най-необикновените места в света, като същевременно насърчаваме устойчив и уважителен туризъм.'
    }
  }
};

export const INITIAL_STATS: Stats = {
  visitors: 12450,
  bookings: 342
};

export const STORAGE_KEY = 'worldclass_data';

export const UI_DICTIONARY: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.destinations': 'Destinations',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.admin': 'Admin Login',
    
    'about.sub': 'A legacy of luxury and exploration.',
    'services.sub': 'Exceptional care for your journey.',
    'blog.sub': 'Inspiring stories from around the globe.',
    'contact.sub': 'Let us craft your perfect itinerary.',

    'footer.about': 'Curating unforgettable journeys for the discerning traveler. Explore the world with elegance and ease.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.newsletter': 'Newsletter',
    'footer.subscribeText': 'Subscribe for exclusive offers and travel inspiration.',
    'footer.subscribeBtn': 'Subscribe',
    'footer.rights': 'All rights reserved.',

    'home.featured': 'Featured Destinations',
    'home.book': 'Book Your Journey',
    'home.testimonial': '"WorldClass didn\'t just book a trip; they curated a life experience. From the private guides to the hidden culinary gems, every detail was perfection."',

    'dest.filters.all': 'All',
    'dest.details': 'View Details',
    'dest.curated': 'Curated Destinations',
    'dest.sub': 'Discover your next escape.',

    'services.title': 'Our Services',
    'services.flight': 'Flight Booking',
    'services.flight.desc': 'First-class and private jet charters arranged with precision.',
    'services.hotel': 'Luxury Accommodation',
    'services.hotel.desc': 'Access to exclusive suites and private villas worldwide.',
    'services.visa': 'Visa Assistance',
    'services.visa.desc': 'Streamlined processing for hassle-free border crossings.',
    'services.insurance': 'Travel Insurance',
    'services.insurance.desc': 'Comprehensive coverage for total peace of mind.',

    'blog.title': 'Travel Journal',
    'blog.read': 'Read Article',

    'contact.title': 'Get In Touch',
    'contact.plan': 'Plan Your Trip',
    'contact.name_f': 'First Name',
    'contact.name_l': 'Last Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Tell us about your dream journey...',
    'contact.terms': 'I agree to the Terms & Conditions',
    'contact.captcha': 'Security Question',
    'contact.captcha_q': 'What is {a} + {b}?',
    'contact.send': 'Send Message',
    'contact.submit_success': 'Message Sent Successfully',
    'contact.submit_error': 'Please fill all required fields marked with *',
  },
  bg: {
    'nav.home': 'Начало',
    'nav.about': 'За нас',
    'nav.destinations': 'Дестинации',
    'nav.services': 'Услуги',
    'nav.blog': 'Блог',
    'nav.contact': 'Контакт',
    'nav.login': 'Вход',
    'nav.admin': 'Админ Вход',
    
    'about.sub': 'Наследство от лукс и изследвания.',
    'services.sub': 'Изключителна грижа за вашето пътуване.',
    'blog.sub': 'Вдъхновяващи истории от целия свят.',
    'contact.sub': 'Нека създадем вашия перфектен маршрут.',

    'footer.about': 'Създаваме незабравими пътешествия за взискателния пътешественик. Изследвайте света с елегантност и лекота.',
    'footer.quickLinks': 'Бързи връзки',
    'footer.contact': 'Контакти',
    'footer.newsletter': 'Бюлетин',
    'footer.subscribeText': 'Абонирайте се за ексклузивни оферти и вдъхновение за пътуване.',
    'footer.subscribeBtn': 'Абонирай се',
    'footer.rights': 'Всички права запазени.',

    'home.featured': 'Препоръчани Дестинации',
    'home.book': 'Резервирайте пътуване',
    'home.testimonial': '"WorldClass не просто резервираха пътуване; те създадоха житейски опит. От частните гидове до скритите кулинарни съкровища, всеки детайл беше съвършенство."',

    'dest.filters.all': 'Всички',
    'dest.details': 'Виж Детайли',
    'dest.curated': 'Специални Дестинации',
    'dest.sub': 'Открийте следващото си бягство.',

    'services.title': 'Нашите Услуги',
    'services.flight': 'Самолетни Билети',
    'services.flight.desc': 'Първа класа и чартъри на частни самолети, организирани с прецизност.',
    'services.hotel': 'Луксозно Настаняване',
    'services.hotel.desc': 'Достъп до ексклузивни апартаменти и частни вили по целия свят.',
    'services.visa': 'Визова Помощ',
    'services.visa.desc': 'Опростена обработка за безпроблемно преминаване на границите.',
    'services.insurance': 'Застраховка',
    'services.insurance.desc': 'Пълно покритие за пълно спокойствие.',

    'blog.title': 'Пътен Дневник',
    'blog.read': 'Прочети статията',

    'contact.title': 'Свържете се с нас',
    'contact.plan': 'Планирайте пътуването си',
    'contact.name_f': 'Име',
    'contact.name_l': 'Фамилия',
    'contact.email': 'Имейл Адрес',
    'contact.phone': 'Телефон',
    'contact.message': 'Разкажете ни за вашето мечтано пътуване...',
    'contact.terms': 'Съгласен съм с Общите условия',
    'contact.captcha': 'Въпрос за сигурност',
    'contact.captcha_q': 'Колко е {a} + {b}?',
    'contact.send': 'Изпрати Съобщение',
    'contact.submit_success': 'Съобщението е изпратено успешно',
    'contact.submit_error': 'Моля попълнете всички полета маркирани със *',
  }
};
