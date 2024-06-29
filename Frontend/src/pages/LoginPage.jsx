import { GameFooter } from '../components/GameFooter/GameFooter';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { GeneralHeader } from '../components/GeneralHeader/GeneralHeader';

export function LoginPage() {
    return (
        <>
            <GeneralHeader />
            <LoginForm />
            <GameFooter />
        </>
    );
}
