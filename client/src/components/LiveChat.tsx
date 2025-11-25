import { useEffect } from 'react';

/**
 * Live Chat Widget Integration
 * 
 * This component integrates Tawk.to live chat widget.
 * Tawk.to is free and provides:
 * - Real-time chat support
 * - Mobile apps for agents
 * - Chat history and analytics
 * - Customizable widget appearance
 * - Visitor monitoring
 * 
 * Setup Instructions:
 * 1. Sign up at https://www.tawk.to/
 * 2. Create a property for your website
 * 3. Copy your Property ID and Widget ID from the admin panel
 * 4. Replace TAWK_PROPERTY_ID and TAWK_WIDGET_ID below
 * 
 * Alternative Options:
 * - Intercom (paid, more features): https://www.intercom.com/
 * - Drift (paid, sales-focused): https://www.drift.com/
 * - Crisp (freemium): https://crisp.chat/
 */

export function LiveChat() {
  useEffect(() => {
    // Tawk.to configuration
    const TAWK_PROPERTY_ID = 'YOUR_PROPERTY_ID'; // Replace with your Tawk.to Property ID
    const TAWK_WIDGET_ID = 'YOUR_WIDGET_ID'; // Replace with your Tawk.to Widget ID

    // Only load if IDs are configured
    if (TAWK_PROPERTY_ID === 'YOUR_PROPERTY_ID' || TAWK_WIDGET_ID === 'YOUR_WIDGET_ID') {
      console.warn('Tawk.to chat widget not configured. Please add your Property ID and Widget ID.');
      return;
    }

    // Load Tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove Tawk.to widget on unmount
      const tawkScript = document.querySelector(`script[src*="tawk.to"]`);
      if (tawkScript) {
        tawkScript.remove();
      }
      // Remove Tawk widget iframe if exists
      const tawkWidget = document.getElementById('tawk-bubble-container');
      if (tawkWidget) {
        tawkWidget.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Alternative: Simple Custom Chat Button
 * Use this if you want a simple "Contact Us" button instead of a full widget
 */
export function SimpleChatButton() {
  const handleChatClick = () => {
    // You can customize this to:
    // 1. Open a modal with a contact form
    // 2. Redirect to a contact page
    // 3. Open email client
    // 4. Integrate with your preferred chat service
    
    window.location.href = '/demo'; // Redirect to demo/contact page
  };

  return (
    <button
      onClick={handleChatClick}
      className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-50 flex items-center gap-2"
      aria-label="Chat with us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      <span className="hidden md:inline font-semibold">Chat with us</span>
    </button>
  );
}
