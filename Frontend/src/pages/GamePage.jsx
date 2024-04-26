import { GameCard } from '../components/GameCard/GameCard';
import { GameHeader } from '../components/GameHeader/GameHeader';
import { GameFooter } from '../components/GameFooter/GameFooter';

export function GamePage() {
    return (
        <>
            <GameHeader />
            <GameCard />
            <GameFooter />
        </>
    );
}
