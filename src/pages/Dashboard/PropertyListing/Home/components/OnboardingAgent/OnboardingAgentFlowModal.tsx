import React, { useEffect, useCallback, useRef, useState } from 'react';
import VerificationPrompt from './components/VerificationPrompt';
import ProfessionalDetailsForm from './components/ProfessionalDetailsForm';
import LegalDocsForm from './components/LegalDocsForm';
import SuccessPrompt from './components/SuccessPrompt';


interface OnboardingAgentFlowModalProps {
    open: boolean;
    step: number; // 0 verification prompt, 1 professional details, 2 legal docs, 3 success
    onClose: () => void;
    goTo: (s: number) => void;
}

const OnboardingAgentFlowModal: React.FC<OnboardingAgentFlowModalProps> = ({ open, step, onClose, goTo }) => {
    const closeAndReset = useCallback(() => {
        onClose();
        setTimeout(() => goTo(0), 300);
    }, [onClose, goTo]);

    useEffect(() => {
        if (!open) return; // only lock when open
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeAndReset();
        };
        window.addEventListener('keydown', handler);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = prev;
        };
    }, [open, closeAndReset]);

    const [renderedStep, setRenderedStep] = useState(step);
    const prevStepRef = useRef(step);
    const direction = step > prevStepRef.current ? 'forward' : 'back';

    useEffect(() => {
        if (step === renderedStep) return;
        const timeout = setTimeout(() => {
            setRenderedStep(step);
            prevStepRef.current = step;
        }, 280);
        return () => clearTimeout(timeout);
    }, [step, renderedStep]);

    const StepNode = () => {
        switch (renderedStep) {
            case 0:
                return <VerificationPrompt proceed={() => goTo(1)} onClose={closeAndReset} />;
            case 1:
                return <ProfessionalDetailsForm onClose={closeAndReset} current={1} next={() => goTo(2)} />;
            case 2:
                return (
                    <LegalDocsForm onClose={closeAndReset} current={2} prev={() => goTo(1)} submit={() => goTo(3)} />
                );
            case 3:
                return <SuccessPrompt done={closeAndReset} />;
            default:
                return null;
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4">
            <style>{`
                @keyframes stepInFwd {0%{opacity:0;transform:translateY(16px) scale(.96);}100%{opacity:1;transform:translateY(0) scale(1);} }
                @keyframes stepOutFwd {0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-12px) scale(.97);} }
                @keyframes stepInBack {0%{opacity:0;transform:translateY(-16px) scale(.96);}100%{opacity:1;transform:translateY(0) scale(1);} }
                @keyframes stepOutBack {0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(12px) scale(.97);} }
            `}</style>
            <div
                key={renderedStep}
                className={`relative w-full max-w-[100vw] flex justify-center will-change-transform animate-[${direction === 'forward' ? 'stepInFwd' : 'stepInBack'}_.28s_cubic-bezier(.4,0,.2,1)]`}
            >
                <StepNode />
            </div>
        </div>
    );
};

export default OnboardingAgentFlowModal;
