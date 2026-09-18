import { choices } from '../utils/gameLogic';

export default function ChoiceButtons({ selected, onSelect, disabled = false }) {
    return (
        <div className="choice-grid">
            {choices.map((choice) => {
                return (
                    <button className={`choice-button ${selected === choice.id ? 'selected' : ''}`} key={choice.id} type="button" onClick={() => onSelect(choice.id)} disabled={disabled} aria-pressed={selected === choice.id}>
                        <span>{choice.label}</span>
                        <small>{choice.description}</small>
                    </button>
                );
            })}
        </div>
    );
}
