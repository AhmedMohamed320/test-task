import './globals.css';
import NavBar from '../components/NavBar'; 
import I18nProvider from '../components/I18nProvider';
import RootLayoutClient from '../components/RootLayoutClient'; 

export const metadata = {
  title: 'My Jewelry Project',
  description: 'A simple product listing page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body>
        <I18nProvider>
          <RootLayoutClient>
            <NavBar />
            {children}
          </RootLayoutClient>
        </I18nProvider>
      </body>
    </html>
  );
}
