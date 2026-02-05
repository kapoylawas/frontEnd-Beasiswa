// components/PortalModal.jsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function PortalModal({ 
    children, 
    isOpen, 
    onClose, 
    className = "",
    backdropClass = "",
    disableBackdropClick = false 
}) {
    const modalContainerRef = useRef(null);
    const portalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Create portal container if it doesn't exist
            if (!portalRef.current) {
                portalRef.current = document.createElement('div');
                portalRef.current.id = `modal-portal-${Date.now()}`;
                
                // Add backdrop classes
                portalRef.current.className = `modal-backdrop-portal ${backdropClass}`;
                portalRef.current.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fadeIn 0.3s ease-in-out;
                `;
                
                document.body.appendChild(portalRef.current);
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }

            // Add event listeners
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            const handleBackdropClick = (e) => {
                if (!disableBackdropClick && 
                    modalContainerRef.current && 
                    !modalContainerRef.current.contains(e.target)) {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);
            portalRef.current.addEventListener('click', handleBackdropClick);

            return () => {
                document.removeEventListener('keydown', handleEscape);
                if (portalRef.current) {
                    portalRef.current.removeEventListener('click', handleBackdropClick);
                }
            };
        } else {
            // Cleanup when modal closes
            if (portalRef.current && document.body.contains(portalRef.current)) {
                // Add fade out animation
                portalRef.current.style.animation = 'fadeOut 0.3s ease-in-out';
                
                setTimeout(() => {
                    if (portalRef.current && document.body.contains(portalRef.current)) {
                        document.body.removeChild(portalRef.current);
                        portalRef.current = null;
                    }
                    document.body.style.overflow = 'auto'; // Restore scrolling
                }, 300);
            }
        }

        return () => {
            // Cleanup on unmount
            if (portalRef.current && document.body.contains(portalRef.current)) {
                document.body.removeChild(portalRef.current);
                document.body.style.overflow = 'auto';
            }
        };
    }, [isOpen, onClose, disableBackdropClick, backdropClass]);

    if (!isOpen || !portalRef.current) return null;

    return createPortal(
        <div 
            ref={modalContainerRef}
            className={className}
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
        >
            {children}
        </div>,
        portalRef.current
    );
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .modal-backdrop-portal {
        animation: fadeIn 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);