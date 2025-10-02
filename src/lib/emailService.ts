// src/lib/emailService.ts

// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_gmt44uq',
    templateId: 'template_1xrxok6',
    publicKey: '_knaSZgNxnX8mwlRr'
};

/**
 * Send booking inquiry notification email via EmailJS
 * EmailJS will automatically format and send the email based on your template
 */
export const sendBookingNotificationEmail = async (formData: {
    name: string;
    email: string;
    country: string;
    packageInterest: string;
    message: string;
}): Promise<{ success: boolean; message: string; error?: any }> => {
    try {
        // Dynamic import of EmailJS
        const emailjs = await import('@emailjs/browser');

        // Send email - EmailJS handles everything based on your template
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                from_country: formData.country,
                package_interest: formData.packageInterest,
                message: formData.message || 'No additional message provided',
                to_email: 'devware.team@gmail.com'

            },
            EMAILJS_CONFIG.publicKey
        );

        console.log('✅ Email sent successfully via EmailJS:', response.status);

        return {
            success: true,
            message: 'Email notification sent successfully'
        };

    } catch (error: any) {
        console.error('❌ EmailJS error:', error);

        return {
            success: false,
            message: 'Failed to send email notification',
            error: error
        };
    }
};

/**
 * Send general contact inquiry email (for "Ask Expert" feature)
 */
export const sendContactNotificationEmail = async (formData: {
    name: string;
    email: string;
    country: string;  // Add country to the type
    message: string;
}): Promise<{ success: boolean; message: string; error?: any }> => {
    try {
        const emailjs = await import('@emailjs/browser');

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                from_country: formData.country,  // ✅ Add this line
                message: formData.message,
                to_email: 'labdelines.team@gmail.com'
            },
            EMAILJS_CONFIG.publicKey
        );

        console.log('✅ Contact email sent via EmailJS:', response.status);

        return {
            success: true,
            message: 'Email sent successfully'
        };

    } catch (error: any) {
        console.error('❌ EmailJS error:', error);

        return {
            success: false,
            message: 'Failed to send email',
            error: error
        };
    }
};