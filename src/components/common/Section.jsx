import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const Section = ({ section, className }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Get content based on current language
  const title = section[`title_${currentLang}`] || section.title_en || '';
  const content = section[`content_${currentLang}`] || section.content_en || '';
  const media = section.media;

  // Check if media is video
  const isVideo = media && (
    media.includes('youtube.com') || 
    media.includes('youtu.be') || 
    media.includes('vimeo.com') ||
    media.endsWith('.mp4') ||
    media.endsWith('.webm')
  );

  return (
    <section className={clsx('py-12 md:py-16', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-start">
                {title}
              </h2>
            )}
            {content && (
              <div className="text-gray-600 dark:text-gray-400 text-start leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            )}
          </div>

          {/* Media */}
          {media && (
            <div className="w-full">
              {isVideo ? (
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {(media.includes('youtube.com') || media.includes('youtu.be')) ? (
                    <iframe
                      src={media.replace('watch?v=', 'embed/')}
                      title={title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : media.includes('vimeo.com') ? (
                    <iframe
                      src={media}
                      title={title}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={media}
                      controls
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : (
                <img
                  src={media}
                  alt={title}
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section;
