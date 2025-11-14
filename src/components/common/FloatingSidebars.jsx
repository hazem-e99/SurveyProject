import React from 'react'
import { Radio } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const FloatingSidebars = () => {
  const { t, i18n } = useTranslation()

  // determine RTL languages (matches App.jsx logic)
  const rtlLanguages = ['ar', 'ku']
  const isRTL = rtlLanguages.includes(i18n.language)

  const containerPosition = isRTL ? 'right-0' : 'left-0'

  // languages list comes from translations as an array
  const languages = t('floatingSidebars.radio.languages', { returnObjects: true }) || []

  return (
    <div className={`fixed ${containerPosition} top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-3 p-2`}>
      {/* Top Bar - Radio Section */}
      <aside className="w-[140px] bg-[#002b5c] text-white rounded-lg shadow-lg p-3 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Radio className="text-white" size={18} />
          <h3 className="font-bold">{t('floatingSidebars.radio.title')}</h3>
        </div>

        <p className="text-[12px] text-center mt-2">{t('floatingSidebars.radio.subtitle')}</p>

        <ul className="mt-3 flex flex-col items-center gap-1 list-none">
          {languages.map((lang, idx) => (
            <li key={idx} className="text-white text-[12px]">{lang}</li>
          ))}
        </ul>

        <button className="mt-3 bg-[#ff6600] hover:bg-[#e65c00] text-white rounded-md px-3 py-1 text-sm">
          {t('floatingSidebars.radio.cta')}
        </button>
      </aside>

      {/* Bottom Bar - Advertisement Section */}
      <aside className="w-[140px] bg-[#4A90E2] text-black rounded-lg shadow-lg p-3 flex items-center justify-center border border-black/20">
        <span className="text-sm">{t('floatingSidebars.ad.text')}</span>
      </aside>
    </div>
  )
}

export default FloatingSidebars
