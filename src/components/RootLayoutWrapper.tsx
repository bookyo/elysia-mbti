import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

export default function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}