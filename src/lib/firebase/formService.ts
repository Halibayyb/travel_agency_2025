// src/lib/firebase/formService.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { sendBookingNotificationEmail, sendContactNotificationEmail } from '../emailService';

// Types
export interface BookingFormData {
    name: string;
    country: string;
    email: string;
    packageInterest: string;
    message: string;
}

export interface ContactFormData {
    name: string;
    country: string;
    email: string;
    message: string;
}

export interface FormValidationError {
    field: string;
    message: string;
}

export interface SubmissionResult {
    success: boolean;
    message: string;
    error?: any;
}

/**
 * Validates booking form data before submission
 */
export const validateBookingForm = (formData: BookingFormData): FormValidationError | null => {
    if (!formData.name.trim()) {
        return { field: 'name', message: 'Name is required.' };
    }

    if (!formData.email.trim()) {
        return { field: 'email', message: 'Email is required.' };
    }

    if (!formData.country.trim()) {
        return { field: 'country', message: 'Please select a country.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return { field: 'email', message: 'Please enter a valid email address.' };
    }

    if (formData.name.trim().length < 2) {
        return { field: 'name', message: 'Name must be at least 2 characters long.' };
    }

    return null;
};

/**
 * Validates contact form data before submission
 */
export const validateContactForm = (formData: ContactFormData): FormValidationError | null => {
    if (!formData.name.trim()) {
        return { field: 'name', message: 'Name is required.' };
    }

    if (!formData.email.trim()) {
        return { field: 'email', message: 'Email is required.' };
    }

    if (!formData.country.trim()) {
        return { field: 'country', message: 'Please select a country.' };
    }

    if (!formData.message.trim()) {
        return { field: 'message', message: 'Message is required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return { field: 'email', message: 'Please enter a valid email address.' };
    }

    if (formData.name.trim().length < 2) {
        return { field: 'name', message: 'Name must be at least 2 characters long.' };
    }

    return null;
};

/**
 * Submit booking inquiry to Firebase AND send email notification
 */
export const submitBookingInquiry = async (
    formData: BookingFormData
): Promise<SubmissionResult> => {
    try {
        // 1. Validate form data first
        const validationError = validateBookingForm(formData);
        if (validationError) {
            return {
                success: false,
                message: validationError.message
            };
        }

        // 2. Submit to Firebase - SAME COLLECTION with type field
        const docRef = await addDoc(collection(db, 'inquiries'), {
            type: 'booking', // Distinguish inquiry type
            name: formData.name.trim(),
            country: formData.country,
            email: formData.email.trim().toLowerCase(),
            packageInterest: formData.packageInterest,
            message: formData.message.trim(),
            timestamp: serverTimestamp(),
            status: 'pending',
            read: false,
            emailSent: false
        });

        console.log('✅ Booking inquiry saved to Firebase with ID:', docRef.id);

        // 3. Send email notification to admin (non-blocking)
        const emailResult = await sendBookingNotificationEmail(formData);
        
        if (emailResult.success) {
            console.log('✅ Email notification sent successfully');
        } else {
            console.warn('⚠️ Email notification failed, but data saved to Firebase');
        }

        return {
            success: true,
            message: 'Thank you! Your inquiry has been submitted successfully. We will contact you soon.'
        };

    } catch (error: any) {
        console.error('❌ Error submitting booking inquiry:', error);
        
        let errorMessage = 'Something went wrong. Please try again or contact us directly.';
        
        if (error.code === 'permission-denied') {
            errorMessage = 'Permission denied. Please contact support.';
        } else if (error.code === 'unavailable') {
            errorMessage = 'Service temporarily unavailable. Please try again later.';
        }

        return {
            success: false,
            message: errorMessage,
            error: error
        };
    }
};

/**
 * Submit contact form inquiry (for "Ask Expert" / "Contact Us" page)
 */
export const submitContactInquiry = async (formData: ContactFormData): Promise<SubmissionResult> => {
    try {
        // 1. Validate form data
        const validationError = validateContactForm(formData);
        if (validationError) {
            return {
                success: false,
                message: validationError.message
            };
        }

        // 2. Submit to Firebase - SAME COLLECTION with type field
        const docRef = await addDoc(collection(db, 'inquiries'), {
            type: 'contact', // Distinguish inquiry type
            name: formData.name.trim(),
            country: formData.country,
            email: formData.email.trim().toLowerCase(),
            packageInterest: null, // No package for contact form
            message: formData.message.trim(),
            timestamp: serverTimestamp(),
            status: 'pending',
            read: false,
            emailSent: false
        });

        console.log('✅ Contact inquiry saved to Firebase with ID:', docRef.id);

        // 3. Send email notification
        const emailResult = await sendContactNotificationEmail({
            name: formData.name,
            email: formData.email,
            message: formData.message
        });

        if (emailResult.success) {
            console.log('✅ Contact email sent successfully');
        } else {
            console.warn('⚠️ Contact email failed, but data saved to Firebase');
        }

        return {
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.'
        };

    } catch (error: any) {
        console.error('❌ Error submitting contact inquiry:', error);
        
        let errorMessage = 'Something went wrong. Please try again or contact us directly.';
        
        if (error.code === 'permission-denied') {
            errorMessage = 'Permission denied. Please contact support.';
        } else if (error.code === 'unavailable') {
            errorMessage = 'Service temporarily unavailable. Please try again later.';
        }

        return {
            success: false,
            message: errorMessage,
            error: error
        };
    }
};