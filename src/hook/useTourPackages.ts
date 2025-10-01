// hooks/useTourPackages.ts
"use client";
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase/config';

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  type: 'main' | 'day';
  order: number;
}

const defaultPackages: TourPackage[] = [
  {
    id: 'basic-luang-prabang',
    title: 'BASIC',
    subtitle: 'The Luang Prabang Immersion',
    description: 'Ultimate introduction to Luang Prabang\'s serene beauty and rich heritage',
    features: [
      'Ultimate introduction to Luang Prabang\'s culture and spirituality',
      'Ideal for first-time visitors seeking tranquility without extensive travel',
      'Flagship Luang Prabang experience at a relaxed pace',
      'Includes: All guided activities, private transfers, entrance fees'
    ],
    price: '815',
    type: 'main',
    order: 1
  },
  {
    id: 'standard-northern',
    title: 'STANDARD',
    subtitle: 'Luang Prabang & Northern Whispers',
    description: 'Blend Luang Prabang\'s charm with untouched northern landscapes',
    features: [
      'Luang Prabang + Nong Khiaw\'s dramatic landscapes',
      'Authentic village life along Nam Ou River',
      'Gentle trekking and serene natural beauty',
      'Includes: All guided activities, private transfers, entrance fees'
    ],
    price: '1120',
    type: 'main',
    order: 2
  },
  {
    id: 'premium-heart-soul',
    title: 'PREMIUM',
    subtitle: 'Laos Heart & Soul',
    description: 'Complete journey through Laos\'s three main highlights',
    features: [
      'Three destinations: Luang Prabang + Vang Vieng + Vientiane',
      'Perfect blend of culture, nature, and city life',
      'Comprehensive overview for visitors with more time',
      'Includes: All guided activities, private transfers, entrance fees'
    ],
    price: '1355',
    type: 'main',
    order: 3
  },
  {
    id: 'river-rituals',
    title: 'RIVER & RITUALS',
    subtitle: 'MEKONG CRUISE + PAK OU CAVES + BACI CEREMONY',
    description: 'Discover Luang Prabang\'s sacred heritage with a river cruise to ancient caves and a traditional Baci ceremony.',
    features: [
      'Private boat',
      'Professional English-speaking guide',
      'Baci ceremony',
      'All entrance fees',
      'All on-the-ground transfers'
    ],
    price: '200',
    type: 'day',
    order: 4
  },
  {
    id: 'heritage-cascade',
    title: 'HERITAGE & CASCADE',
    subtitle: 'CITY TOUR + KUANG SI WATERFALL',
    description: 'Experience Luang Prabang\'s royal history before unwinding at the stunning Kuang Si waterfalls.',
    features: [
      'Professional English-speaking guide',
      'Private car',
      'All entrance fees'
    ],
    price: '175',
    type: 'day',
    order: 5
  },
  {
    id: 'complete-experience',
    title: 'COMPLETE EXPERIENCE',
    subtitle: 'SUNRISE TO SUNSET LUANG PRABANG',
    description: 'A full-day journey from spiritual dawn rituals to vibrant evening culture — the essence of Luang Prabang in one day.',
    features: [
      'Professional English-speaking guide',
      'Car for transfers',
      'Offering for the monks',
      'All entrance fees'
    ],
    price: '180',
    type: 'day',
    order: 6
  }
];

export const useTourPackages = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeDefaultPackages = async () => {
    try {
      console.log('Initializing default packages...');
      for (const pkg of defaultPackages) {
        const docRef = doc(db, 'tour_packages', pkg.id);
        await setDoc(docRef, pkg);
      }
      console.log('Default packages initialized successfully');
    } catch (err) {
      console.error('Error initializing default packages:', err);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'tour_packages'));
      
      // If no packages exist, initialize with defaults
      if (querySnapshot.empty) {
        await initializeDefaultPackages();
        // Fetch again after initialization
        const newSnapshot = await getDocs(collection(db, 'tour_packages'));
        const packagesData: TourPackage[] = [];
        newSnapshot.forEach((doc) => {
          packagesData.push({ id: doc.id, ...doc.data() } as TourPackage);
        });
        packagesData.sort((a, b) => a.order - b.order);
        setPackages(packagesData);
      } else {
        const packagesData: TourPackage[] = [];
        querySnapshot.forEach((doc) => {
          packagesData.push({ id: doc.id, ...doc.data() } as TourPackage);
        });
        packagesData.sort((a, b) => a.order - b.order);
        setPackages(packagesData);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching tour packages:', err);
      setError('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const updatePackage = async (packageId: string, updates: Partial<TourPackage>) => {
    try {
      const docRef = doc(db, 'tour_packages', packageId);
      await updateDoc(docRef, updates);
      await fetchPackages();
      return { success: true };
    } catch (err) {
      console.error('Error updating package:', err);
      return { success: false, error: 'Failed to update package' };
    }
  };

  const createPackage = async (packageData: Omit<TourPackage, 'id'>) => {
    try {
      const newDocRef = doc(collection(db, 'tour_packages'));
      await setDoc(newDocRef, packageData);
      await fetchPackages();
      return { success: true, id: newDocRef.id };
    } catch (err) {
      console.error('Error creating package:', err);
      return { success: false, error: 'Failed to create package' };
    }
  };

  return { 
    packages, 
    loading, 
    error, 
    updatePackage, 
    createPackage,
    refreshPackages: fetchPackages 
  };
};