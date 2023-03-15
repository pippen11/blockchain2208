import { FC, ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            {/* Header */}
            <Header />
            {children}
            {/* Footer */}
        </>
    );
};

export default Layout;
