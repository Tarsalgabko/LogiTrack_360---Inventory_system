import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-300">
            © 2025 LogiTrack 360. {t('footer.createdBy')}
          </div>
          <div className="text-sm text-gray-300 mt-2 sm:mt-0">
            {t('footer.license')}
          </div>
        </div>
      </div>
    </footer>
  );
};