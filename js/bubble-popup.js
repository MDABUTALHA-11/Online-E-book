/**
 * Bubble Popup Utility for Shaifly
 * Replaces standard alert with a stylish floating bubble
 */

function showBubblePopup(message) {
    // Create container if it doesn't exist
    let container = document.getElementById('bubble-popup-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'bubble-popup-container';
        container.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10001;
            display: flex;
            flex-direction: column;
            align-items: center;
            pointer-events: none;
            width: 100%;
            max-width: 500px;
        `;
        document.body.appendChild(container);

        // Add CSS animations and styles
        const style = document.createElement('style');
        style.textContent = `
            .bubble-toast {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                border: 2px solid #198754;
                color: #1e293b;
                padding: 12px 24px;
                border-radius: 100px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                margin-bottom: 10px;
                font-family: 'Mina', sans-serif;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 12px;
                pointer-events: auto;
                animation: bubblePopIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                max-width: 90vw;
                text-align: left;
                border-bottom: 4px solid #198754;
                font-size: 0.95rem;
            }
            @media (max-width: 576px) {
                .bubble-toast {
                    padding: 10px 18px;
                    font-size: 0.85rem;
                    border-radius: 20px;
                    bottom: 20px;
                }
                .bubble-toast i {
                    width: 24px;
                    height: 24px;
                    font-size: 0.8rem;
                }
            }
            .bubble-toast i {
                background: #198754;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9rem;
            }
            @keyframes bubblePopIn {
                0% { opacity: 0; transform: translateY(40px) scale(0.6); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes bubbleFadeOut {
                0% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble-toast';
    bubble.innerHTML = `
        <i class="fas fa-magic"></i>
        <span>${message}</span>
    `;

    container.appendChild(bubble);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        bubble.style.animation = 'bubbleFadeOut 0.5s ease-in forwards';
        setTimeout(() => {
            bubble.remove();
        }, 500);
    }, 4000);
}

// Map the old showComingSoon to this new stylish version
window.showComingSoonPopup = function (itemName) {
    const text = `"${itemName}" শীঘ্রই আসছে! আমরা নতুন নোট আপলোড করার কাজ করছি।`;
    showBubblePopup(text);
};

// Export to window if needed
window.showBubblePopup = showBubblePopup;
