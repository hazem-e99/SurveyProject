// Section Service - Manages page sections
// Each section has: id, page, title (multilingual), content (multilingual), media, order

let sections = [
  // Talent Development
  {
    id: 1,
    page: 'talent-development',
    title_en: 'Empowering Future Leaders',
    title_ar: 'تمكين قادة المستقبل',
    title_ku: 'بەهێزکردنی سەرکردەکانی داهاتوو',
    content_en: 'Our talent development programs are designed to nurture the next generation of leaders. We provide comprehensive training, mentorship, and hands-on experience to help individuals unlock their full potential.',
    content_ar: 'تم تصميم برامج تطوير المواهب لدينا لرعاية الجيل القادم من القادة. نحن نقدم التدريب الشامل والإرشاد والخبرة العملية لمساعدة الأفراد على إطلاق العنان لإمكاناتهم الكاملة.',
    content_ku: 'بەرنامەکانی گەشەپێدانی بەهرەمان بۆ پەروەردەکردنی نەوەی داهاتووی سەرکردەکان داڕێژراوە. ڕاهێنانی گشتگیر و ڕێنمایی و ئەزموونی عەمەلی پێشکەش دەکەین بۆ یارمەتیدانی تاکەکان بۆ بەرپاکردنی تەواوی تواناکانیان.',
    media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    order: 1,
  },
  {
    id: 2,
    page: 'talent-development',
    title_en: 'Professional Development Workshops',
    title_ar: 'ورش التطوير المهني',
    title_ku: 'وۆرکشۆپی گەشەپێدانی پیشەیی',
    content_en: 'We offer regular workshops covering essential skills including leadership, communication, project management, and technical expertise. Our experienced facilitators ensure practical, applicable learning experiences.',
    content_ar: 'نحن نقدم ورش عمل منتظمة تغطي المهارات الأساسية بما في ذلك القيادة والتواصل وإدارة المشاريع والخبرة الفنية. يضمن ميسرونا ذوو الخبرة تجارب تعليمية عملية وقابلة للتطبيق.',
    content_ku: 'وۆرکشۆپی بەردەوام پێشکەش دەکەین کە شارەزایی گرنگ دەگرێتەوە لەوانە سەرکردایەتی، پەیوەندیکردن، بەڕێوەبردنی پرۆژە، و شارەزایی تەکنیکی. ئاسانکارە شارەزاکانمان دڵنیایی لە ئەزموونی فێربوونی عەمەلی و بەکارهێنراو دەکەن.',
    media: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    order: 2,
  },
  
  // Community Engagement
  {
    id: 3,
    page: 'community-engagement',
    title_en: 'Building Stronger Communities',
    title_ar: 'بناء مجتمعات أقوى',
    title_ku: 'بنیاتنانی کۆمەڵگەی بەهێزتر',
    content_en: 'Community engagement is at the heart of what we do. We believe in creating meaningful connections and fostering collaboration among community members to address local challenges and celebrate achievements.',
    content_ar: 'المشاركة المجتمعية هي في صميم ما نقوم به. نحن نؤمن بإنشاء روابط ذات مغزى وتعزيز التعاون بين أفراد المجتمع لمواجهة التحديات المحلية والاحتفال بالإنجازات.',
    content_ku: 'بەشداریکردنی کۆمەڵگە لە ناوەڕاستی ئەوەدایە کە ئێمە دەیکەین. باوەڕمان بە دروستکردنی پەیوەندییەکی واتاداری و پەرەپێدانی هاوکاری لە نێوان ئەندامانی کۆمەڵگە هەیە بۆ ڕووبەڕووبوونەوەی تەحەدایەکانی ناوخۆیی و ئاهەنگگێڕانی دەسکەوتەکان.',
    media: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    order: 1,
  },
  
  // Scientific Research
  {
    id: 4,
    page: 'scientific-research',
    title_en: 'Advancing Knowledge Through Research',
    title_ar: 'تقدم المعرفة من خلال البحث',
    title_ku: 'پێشخستنی زانیاری لە ڕێگەی لێکۆڵینەوە',
    content_en: 'Our research initiatives focus on innovative solutions to contemporary challenges. We support multidisciplinary research projects that have real-world impact and contribute to scientific advancement.',
    content_ar: 'تركز مبادراتنا البحثية على الحلول المبتكرة للتحديات المعاصرة. نحن ندعم مشاريع البحث متعددة التخصصات التي لها تأثير في العالم الحقيقي وتساهم في التقدم العلمي.',
    content_ku: 'دەستپێشخەریەکانی لێکۆڵینەوەمان سەرنج دەدەنە سەر چارەسەری داهێنەرانە بۆ تەحەدایەکانی سەردەم. پشتگیری لە پرۆژەی لێکۆڵینەوەی فرە بوارەکان دەکەین کە کاریگەرییان لەسەر جیهانی ڕاستەقینە هەیە و بەشداری لە پێشکەوتنی زانستیدا دەکەن.',
    media: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    order: 1,
  },
  
  // Arts and Creativity
  {
    id: 5,
    page: 'arts-creativity',
    title_en: 'Celebrating Creative Expression',
    title_ar: 'احتفال بالتعبير الإبداعي',
    title_ku: 'ئاهەنگگێڕانی دەربڕینی داهێنەرانە',
    content_en: 'Arts and creativity are essential to human expression and cultural identity. We provide platforms for artists to showcase their work, collaborate, and inspire others through various artistic mediums.',
    content_ar: 'الفنون والإبداع ضروريان للتعبير الإنساني والهوية الثقافية. نحن نوفر منصات للفنانين لعرض أعمالهم والتعاون وإلهام الآخرين من خلال وسائط فنية مختلفة.',
    content_ku: 'هونەر و داهێنان بۆ دەربڕینی مرۆیی و ناسنامەی کلتووری پێویستن. سەکۆ بۆ هونەرمەندان دابین دەکەین بۆ پیشاندانی کارەکانیان و هاوکاریکردن و ئیلهامبەخشین بە خەڵکانی دیکە لە ڕێگەی مێدیای هونەری جیاوازەوە.',
    media: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    order: 1,
  },
  
  // Job Opportunities
  {
    id: 6,
    page: 'job-opportunities',
    title_en: 'Career Opportunities',
    title_ar: 'فرص العمل',
    title_ku: 'دەرفەتی کار',
    content_en: 'We are always looking for talented individuals to join our team. Explore current openings and discover how you can contribute to our mission while growing your career.',
    content_ar: 'نحن دائما نبحث عن أفراد موهوبين للانضمام إلى فريقنا. استكشف الفرص الحالية واكتشف كيف يمكنك المساهمة في مهمتنا أثناء تطوير حياتك المهنية.',
    content_ku: 'هەمیشە بەدوای تاکە بەهرەداراندا دەگەڕێین بۆ پێکهاتنی تیمەکەمان. دەرفەتە ئێستاکان بگەڕێ و بزانە چۆن دەتوانیت بەشداری لە ئامانجەکانماندا بکەیت لە هەمان کاتدا کارەکەت پەرەپێ بدەیت.',
    media: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    order: 1,
  },
  
  // Activity Schedule
  {
    id: 7,
    page: 'activity-schedule',
    title_en: 'Leadership Workshop',
    title_ar: 'ورشة عمل القيادة',
    title_ku: 'وۆرکشۆپی سەرکردایەتی',
    content_en: '2024-12-15\n10:00 AM - 2:00 PM\nMain Conference Hall',
    content_ar: '2024-12-15\n10:00 صباحاً - 2:00 مساءً\nقاعة المؤتمرات الرئيسية',
    content_ku: '2024-12-15\n10:00 پێش نیوەڕۆ - 2:00 پاش نیوەڕۆ\nهۆڵی کۆنفرانسی سەرەکی',
    media: null,
    order: 1,
  },
  {
    id: 8,
    page: 'activity-schedule',
    title_en: 'Community Art Exhibition',
    title_ar: 'معرض الفنون المجتمعية',
    title_ku: 'پێشانگەی هونەری کۆمەڵگە',
    content_en: '2024-12-20\n9:00 AM - 5:00 PM\nArt Gallery, Building A',
    content_ar: '2024-12-20\n9:00 صباحاً - 5:00 مساءً\nمعرض الفنون، المبنى أ',
    content_ku: '2024-12-20\n9:00 پێش نیوەڕۆ - 5:00 پاش نیوەڕۆ\nگالێری هونەری، بینای A',
    media: null,
    order: 2,
  },
  
  // About Us
  {
    id: 9,
    page: 'about',
    title_en: 'Our Mission',
    title_ar: 'مهمتنا',
    title_ku: 'ئامانجەکانمان',
    content_en: 'We are dedicated to fostering growth, innovation, and collaboration. Our organization brings together diverse talents and perspectives to create positive change in our communities.',
    content_ar: 'نحن ملتزمون بتعزيز النمو والابتكار والتعاون. تجمع منظمتنا مواهب ووجهات نظر متنوعة لخلق تغيير إيجابي في مجتمعاتنا.',
    content_ku: 'ئێمە خۆمان تەرخان کردووە بۆ پەرەپێدانی گەشە و داهێنان و هاوکاری. ڕێکخراوەکەمان بەهرەی جیاواز و دیدگای جیاواز کۆدەکاتەوە بۆ دروستکردنی گۆڕانکاری ئەرێنی لە کۆمەڵگەکانماندا.',
    media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    order: 1,
  },
  
  // Partners
  {
    id: 10,
    page: 'partners',
    title_en: 'Strategic Partnerships',
    title_ar: 'الشراكات الاستراتيجية',
    title_ku: 'هاوبەشی ستراتیژی',
    content_en: 'We collaborate with leading organizations worldwide to amplify our impact. Our partners share our commitment to excellence and social responsibility.',
    content_ar: 'نتعاون مع المنظمات الرائدة في جميع أنحاء العالم لتضخيم تأثيرنا. يشاركنا شركاؤنا التزامنا بالتميز والمسؤولية الاجتماعية.',
    content_ku: 'هاوکاری لەگەڵ ڕێکخراوە پێشەنگەکانی جیهاندا دەکەین بۆ زیادکردنی کاریگەرییەکەمان. هاوبەشەکانمان پابەندبوونمان بە باشی و بەرپرسیارێتی کۆمەڵایەتی هاوبەش دەکەن.',
    media: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    order: 1,
  },
];

export const sectionService = {
  // Get all sections
  getAllSections: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...sections].sort((a, b) => a.order - b.order));
      }, 300);
    });
  },

  // Get sections by page
  getSectionsByPage: async (page) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = sections
          .filter((s) => s.page === page)
          .sort((a, b) => a.order - b.order);
        resolve(filtered);
      }, 300);
    });
  },

  // Get single section by ID
  getSectionById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const section = sections.find((s) => s.id === id);
        if (section) {
          resolve(section);
        } else {
          reject(new Error('Section not found'));
        }
      }, 300);
    });
  },

  // Create new section
  createSection: async (sectionData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSection = {
          ...sectionData,
          id: Math.max(...sections.map((s) => s.id), 0) + 1,
        };
        sections.push(newSection);
        resolve(newSection);
      }, 300);
    });
  },

  // Update section
  updateSection: async (id, sectionData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = sections.findIndex((s) => s.id === id);
        if (index !== -1) {
          sections[index] = { ...sections[index], ...sectionData };
          resolve(sections[index]);
        } else {
          reject(new Error('Section not found'));
        }
      }, 300);
    });
  },

  // Delete section
  deleteSection: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = sections.findIndex((s) => s.id === id);
        if (index !== -1) {
          sections.splice(index, 1);
          resolve({ message: 'Section deleted successfully' });
        } else {
          reject(new Error('Section not found'));
        }
      }, 300);
    });
  },
};
