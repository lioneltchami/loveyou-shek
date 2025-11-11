"use client";

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from '@/contexts/LanguageContext';
import Video from "yet-another-react-lightbox/plugins/video";
import photoMemories from '@/data/photo-memories.json';

interface MediaItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description: string;
  category: string;
  type: 'image' | 'video';
  poster?: string; // Thumbnail for videos
  memory?: {
    story: string;
    year?: number | null;
    location?: string | null;
  };
}

export default function PhotoGalleryEnhanced() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedMemory, setExpandedMemory] = useState(false);

  // Helper function to get memory for a photo
  const getMemoryForPhoto = (filename: string) => {
    const photoData = photoMemories.photos[filename as keyof typeof photoMemories.photos];
    if (!photoData) return null;

    return {
      story: language === 'fr' ? photoData.story_fr : photoData.story_en,
      year: photoData.year,
      location: photoData.location
    };
  };

  // All media organized by category
  const allMedia: MediaItem[] = [
    // Wedding & Hubby
    {
      src: '/images/wedding&hubby/IMG-20170819-WA0015.jpg',
      alt: 'Joëlle in her wedding dress',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle en Robe de Mariée' : 'Joëlle in Her Wedding Dress',
      description: language === 'fr'
        ? "Joëlle magnifique dans sa robe de mariée en juin 2017"
        : "Joëlle beautiful in her wedding dress in June 2017",
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/IMG_1751.JPG',
      alt: 'Joëlle court wedding with Olivier',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Mariage Civil avec Olivier' : 'Court Wedding with Olivier',
      description: language === 'fr'
        ? 'Joëlle et Olivier lors de leur mariage civil'
        : 'Joëlle and Olivier at their court wedding',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/IMG_1914.JPG',
      alt: 'Joëlle and Olivier wedding portrait',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Portrait de Mariage' : 'Wedding Portrait',
      description: language === 'fr'
        ? 'Beau portrait de mariage du couple heureux'
        : 'Beautiful wedding portrait of the happy couple',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/IMG_1682.JPG',
      alt: 'Wedding moment',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment de Mariage' : 'Wedding Moment',
      description: language === 'fr' ? 'Moment spécial du mariage' : 'Special wedding moment',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/0af85f88-bdbe-441d-8878-3a561c61460f.jpg',
      alt: 'With Olivier',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec Olivier' : 'With Olivier',
      description: language === 'fr' ? 'Joëlle et Olivier ensemble' : 'Joëlle and Olivier together',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/45ebc884-2343-4fc4-83f9-ee2e547e372a.jpg',
      alt: 'Couple moment',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment en Couple' : 'Couple Moment',
      description: language === 'fr' ? 'Joëlle et Olivier' : 'Joëlle and Olivier',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/3b80e0f7-1c75-4a17-ae24-0c5407898295.jpg',
      alt: 'Joëlle and Olivier wedding celebration',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Célébration de Mariage' : 'Wedding Celebration',
      description: language === 'fr' ? 'Joëlle et Olivier célébrant leur union' : 'Joëlle and Olivier celebrating their union',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/IMG-20170819-WA0005.jpg',
      alt: 'Wedding day joy',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joie du Jour du Mariage' : 'Wedding Day Joy',
      description: language === 'fr' ? 'Un moment de bonheur pur le jour du mariage' : 'A moment of pure happiness on the wedding day',
      category: 'wedding',
      type: 'image'
    },
    {
      src: '/images/wedding&hubby/IMG-20170819-WA0025.jpg',
      alt: 'Wedding ceremony moment',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment de la Cérémonie' : 'Ceremony Moment',
      description: language === 'fr' ? 'Moment précieux durant la cérémonie de mariage' : 'Precious moment during the wedding ceremony',
      category: 'wedding',
      type: 'image'
    },

    // Childhood
    {
      src: '/images/childhood/2.jpg',
      alt: 'Young Joëlle',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Jeunesse' : 'Childhood',
      description: language === 'fr' ? 'Joëlle enfant' : 'Young Joëlle',
      category: 'childhood',
      type: 'image'
    },
    {
      src: '/images/childhood/Image (132).jpg',
      alt: 'Childhood memories',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Souvenirs d\'Enfance' : 'Childhood Memories',
      description: language === 'fr' ? 'Photo d\'enfance de Joëlle' : 'Joëlle as a child',
      category: 'childhood',
      type: 'image'
    },
    {
      src: '/images/childhood/Image (168).jpg',
      alt: 'Young years',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Jeunes Années' : 'Young Years',
      description: language === 'fr' ? 'Joëlle dans sa jeunesse' : 'Joëlle in her youth',
      category: 'childhood',
      type: 'image'
    },
    {
      src: '/images/childhood/Picture 116.jpg',
      alt: 'Early years',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Premières Années' : 'Early Years',
      description: language === 'fr' ? 'Les premières années de Joëlle' : 'Joëlle\'s early years',
      category: 'childhood',
      type: 'image'
    },

    // Education
    {
      src: '/images/education/IMG_0029.jpg',
      alt: 'School days',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Années Scolaires' : 'School Days',
      description: language === 'fr' ? 'Joëlle durant ses études' : 'Joëlle during her studies',
      category: 'education',
      type: 'image'
    },
    {
      src: '/images/education/IMG_0032.jpg',
      alt: 'Joëlle as student at Lycée de Buea',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Étudiante au Lycée de Buea' : 'Student at Lycée de Buea',
      description: language === 'fr' ? 'Joëlle en tant qu\'étudiante au Lycée de Buea' : 'Joëlle as a student at Lycée de Buea',
      category: 'education',
      type: 'image'
    },
    {
      src: '/images/education/IMG_0088.jpg',
      alt: 'Joëlle graduation with parents',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Diplômation avec Papa et Maman' : 'Graduation with Dad and Mom',
      description: language === 'fr' ? 'Photo de diplômation de Joëlle avec son père et sa mère' : 'Joëlle\'s graduation photo with her dad and mom',
      category: 'education',
      type: 'image'
    },
    {
      src: '/images/education/IMG_0093.jpg',
      alt: 'Joëlle graduation with dad',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Diplômation avec Papa' : 'Graduation with Dad',
      description: language === 'fr' ? 'Photo de diplômation de Joëlle avec son père' : 'Joëlle\'s graduation photo with her dad',
      category: 'education',
      type: 'image'
    },
    {
      src: '/images/education/IMG_0095.jpg',
      alt: 'Education memories',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Souvenirs d\'Études' : 'Education Memories',
      description: language === 'fr' ? 'Souvenirs universitaires' : 'University memories',
      category: 'education',
      type: 'image'
    },
    {
      src: '/images/education/Picture 056_New1.jpg',
      alt: 'Graduation',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Diplômation' : 'Graduation',
      description: language === 'fr' ? 'Moment de diplômation' : 'Graduation moment',
      category: 'education',
      type: 'image'
    },

    // Professional
    {
      src: '/images/professional/IMG_0020.jpg',
      alt: 'Joëlle interpreting at Full Gospel Buea',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Interprète à Full Gospel Buea' : 'Interpreting at Full Gospel Buea',
      description: language === 'fr' ? 'Joëlle en train d\'interpréter à Full Gospel Buea' : 'Joëlle interpreting at Full Gospel Buea',
      category: 'professional',
      type: 'image'
    },
    {
      src: '/images/professional/IMG-20160711-WA0014.jpg',
      alt: 'Interpreting',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Interprétation' : 'Interpreting',
      description: language === 'fr' ? 'Joëlle en tant qu\'interprète' : 'Joëlle as interpreter',
      category: 'professional',
      type: 'image'
    },
    {
      src: '/images/professional/IMG-20160711-WA0017.jpg',
      alt: 'Conference work',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Travail en Conférence' : 'Conference Work',
      description: language === 'fr' ? 'Lors d\'une conférence' : 'At a conference',
      category: 'professional',
      type: 'image'
    },
    {
      src: '/images/professional/5c6e00f3-ddc7-445b-bf66-886c61802f0b.jpg',
      alt: 'Professional setting',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Cadre Professionnel' : 'Professional Setting',
      description: language === 'fr' ? 'Dans un cadre professionnel' : 'In professional setting',
      category: 'professional',
      type: 'image'
    },
    {
      src: '/images/professional/d14adad9-6925-4914-a656-3746c2df295c.jpg',
      alt: 'At work',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Au Travail' : 'At Work',
      description: language === 'fr' ? 'Joëlle dans son travail' : 'Joëlle in her work',
      category: 'professional',
      type: 'image'
    },
    {
      src: '/images/professional/ff434f6a-ec31-41a4-aea2-fb36597a7a09.jpg',
      alt: 'Professional life',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Vie Professionnelle' : 'Professional Life',
      description: language === 'fr' ? 'Vie professionnelle de Joëlle' : 'Joëlle\'s professional life',
      category: 'professional',
      type: 'image'
    },
    {
      src: '/images/professional/63253b96-5e5f-46d1-aae2-7acef19f4f55.jpg',
      alt: 'Joëlle at professional event',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Événement Professionnel' : 'Professional Event',
      description: language === 'fr' ? 'Joëlle lors d\'un événement professionnel' : 'Joëlle at a professional event',
      category: 'professional',
      type: 'image'
    },

    // Family
    {
      src: '/images/family/100_7293.JPG',
      alt: 'Joëlle reading her Bible',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle Lisant sa Bible' : 'Joëlle Reading Her Bible',
      description: language === 'fr' ? 'Joëlle en train de lire sa Bible comme toujours' : 'Joëlle reading her Bible as always',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/106be468-4920-4485-8332-c9d7d0815454.jpg',
      alt: 'With loved ones',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec les Proches' : 'With Loved Ones',
      description: language === 'fr' ? 'Entourée de ses proches' : 'Surrounded by loved ones',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/20250509_185812.jpg',
      alt: 'Family gathering',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Rassemblement Familial' : 'Family Gathering',
      description: language === 'fr' ? 'Réunion de famille' : 'Family reunion',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/a64cbb24-5d02-44c0-9cdf-ec740ad85398.jpg',
      alt: 'Joëlle celebrating dad\'s birthday',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Anniversaire de Papa' : 'Celebrating Dad\'s Birthday',
      description: language === 'fr' ? 'Joëlle célébrant l\'anniversaire de son papa' : 'Joëlle celebrating her papa\'s birthday',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/afcfd5d8-80fd-4845-b6b8-4dbfe91a3b31.jpg',
      alt: 'With family',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'En Famille' : 'With Family',
      description: language === 'fr' ? 'Joëlle en famille' : 'Joëlle with family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/DSC03387.JPG',
      alt: 'Family photo',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Photo de Famille' : 'Family Photo',
      description: language === 'fr' ? 'Belle photo de famille' : 'Beautiful family photo',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/Image (165).jpg',
      alt: 'Joëlle with sister Estelle',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle avec sa Sœur Estelle' : 'Joëlle with Sister Estelle',
      description: language === 'fr' ? 'Joëlle prenant une photo avec sa sœur Estelle' : 'Joëlle taking photo with her sister Estelle',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_0064.jpg',
      alt: 'Together',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Ensemble' : 'Together',
      description: language === 'fr' ? 'Tous ensemble' : 'All together',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_0265.JPG',
      alt: 'Family bond',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Liens Familiaux' : 'Family Bond',
      description: language === 'fr' ? 'Liens de famille forts' : 'Strong family bonds',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_0446.JPG',
      alt: 'Family love',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Amour Familial' : 'Family Love',
      description: language === 'fr' ? 'L\'amour de la famille' : 'Family love',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_8217.JPG',
      alt: 'With her father',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec Son Père' : 'With Her Father',
      description: language === 'fr' ? 'Joëlle avec son père' : 'Joëlle with her father',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_8945.webp',
      alt: 'Family celebration',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Célébration Familiale' : 'Family Celebration',
      description: language === 'fr' ? 'Célébration en famille' : 'Celebrating with family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_7587.jpg',
      alt: 'Joëlle with her mother',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle avec sa Maman' : 'Joëlle with Her Mother',
      description: language === 'fr' ? 'Joëlle et sa maman ensemble' : 'Joëlle and her mother together',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_7589.jpg',
      alt: 'Joëlle and her mother',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle et Maman' : 'Joëlle and Her Mother',
      description: language === 'fr' ? 'Moment précieux avec sa mère' : 'Precious moment with her mother',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_7592.jpg',
      alt: 'Mother and daughter',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Mère et Fille' : 'Mother and Daughter',
      description: language === 'fr' ? 'Joëlle avec sa mère bien-aimée' : 'Joëlle with her beloved mother',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/8490df51-3bc1-4e2c-bfbb-70d845e2b5e0.jpg',
      alt: 'Joëlle with her mom and Mama Alliance',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle avec Maman et Mama Alliance' : 'Joëlle with Mom and Mama Alliance',
      description: language === 'fr' ? 'Photo prise à Buea avec sa mère et sa tante Mama Alliance' : 'Photo taken in Buea with her mother and aunt Mama Alliance',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/rFQ2AbDVvEE6gdGC9EkwAx3gf8SYAXnkELSFmZwr.jpg',
      alt: 'Joëlle, her mother, and her aunt',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle, Maman et Tante' : 'Joëlle, Mom and Aunt',
      description: language === 'fr' ? 'Moment spécial à Buea avec sa mère et Mama Alliance' : 'Special moment in Buea with her mother and Mama Alliance',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG-20190804-WA0000.jpg',
      alt: 'Joëlle in prayers',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle en Prière' : 'Joëlle in Prayer',
      description: language === 'fr' ? 'Joëlle sérieuse en prières, comme toujours' : 'Joëlle serious in prayers, as always',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/20171124_101526.jpg',
      alt: 'Family celebration moment',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment de Célébration Familiale' : 'Family Celebration Moment',
      description: language === 'fr' ? 'Joëlle célébrant avec sa famille' : 'Joëlle celebrating with her family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/2ee465f2-91e9-4692-8b21-c75771a28bc2.jpg',
      alt: 'Joëlle with family',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle en Famille' : 'Joëlle with Family',
      description: language === 'fr' ? 'Un moment précieux en famille' : 'A precious moment with family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/3456b51b-024a-477a-b744-9a859ec990c8.jpg',
      alt: 'Family gathering',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Réunion de Famille' : 'Family Gathering',
      description: language === 'fr' ? 'Joëlle entourée de ses proches' : 'Joëlle surrounded by her loved ones',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/40c72bef-b4c6-4d70-ab4b-5b12efb7f4b5.jpg',
      alt: 'Joëlle and family members',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle et sa Famille' : 'Joëlle and Family Members',
      description: language === 'fr' ? 'Moment heureux partagé en famille' : 'Happy moment shared with family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/6c0784e4-0e14-407d-9d26-2a756815d66e.jpg',
      alt: 'Together with loved ones',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec les Êtres Chers' : 'Together with Loved Ones',
      description: language === 'fr' ? 'Joëlle avec ceux qu\'elle aime' : 'Joëlle with those she loves',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/937744b6-8926-494f-8e3e-ed7c8d8addde.jpg',
      alt: 'Family portrait',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Portrait de Famille' : 'Family Portrait',
      description: language === 'fr' ? 'Belle photo de famille avec Joëlle' : 'Beautiful family photo with Joëlle',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/a0ed173a-83c4-4b01-a37e-879059d46e5d.jpg',
      alt: 'Family time',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Temps en Famille' : 'Family Time',
      description: language === 'fr' ? 'Joëlle passant du temps de qualité en famille' : 'Joëlle spending quality time with family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/a3b3efd2-5cac-433b-9d5c-e213ed9709e5.jpg',
      alt: 'With relatives',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec la Famille' : 'With Relatives',
      description: language === 'fr' ? 'Joëlle partageant un moment avec sa famille' : 'Joëlle sharing a moment with her relatives',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/d98cc06a-a8eb-4668-b1c1-d4c9efce2664.jpg',
      alt: 'Family love',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Amour Familial' : 'Family Love',
      description: language === 'fr' ? 'L\'amour familial qui lie Joëlle aux siens' : 'The family love that binds Joëlle to her own',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/ef6d0941-59d4-4d7d-b523-db5d7ea3fd12.jpg',
      alt: 'Family moment',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment Familial' : 'Family Moment',
      description: language === 'fr' ? 'Un instant capturé avec la famille' : 'A captured moment with family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/f12b01c5-0918-41fb-842f-b6ebd4d1d9b7.jpg',
      alt: 'Joëlle with family members',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec les Membres de la Famille' : 'With Family Members',
      description: language === 'fr' ? 'Joëlle entourée des membres de sa famille' : 'Joëlle surrounded by her family members',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_1730.JPG',
      alt: 'Family photo',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Photo Familiale' : 'Family Photo',
      description: language === 'fr' ? 'Photo de famille mémorable' : 'Memorable family photo',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_7240.JPG',
      alt: 'Joëlle and relatives',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle et ses Proches' : 'Joëlle and Relatives',
      description: language === 'fr' ? 'Joëlle avec des proches parents' : 'Joëlle with close relatives',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_7253.JPG',
      alt: 'Family bonding',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Liens Familiaux' : 'Family Bonding',
      description: language === 'fr' ? 'Les liens familiaux précieux' : 'Precious family bonds',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG_7297.JPG',
      alt: 'With extended family',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Avec la Famille Élargie' : 'With Extended Family',
      description: language === 'fr' ? 'Joëlle avec sa famille élargie' : 'Joëlle with her extended family',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG-20220114-WA0082.jpg',
      alt: 'Family gathering 2022',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Réunion Familiale 2022' : 'Family Gathering 2022',
      description: language === 'fr' ? 'Un rassemblement familial en 2022' : 'A family gathering in 2022',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG-20240207-WA0010.jpg',
      alt: 'Family moment 2024',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment Familial 2024' : 'Family Moment 2024',
      description: language === 'fr' ? 'Un moment précieux en famille en 2024' : 'A precious family moment in 2024',
      category: 'family',
      type: 'image'
    },
    {
      src: '/images/family/IMG-20240407-WA0013.jpg',
      alt: 'Joëlle with family 2024',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle en Famille 2024' : 'Joëlle with Family 2024',
      description: language === 'fr' ? 'Joëlle avec sa famille en avril 2024' : 'Joëlle with her family in April 2024',
      category: 'family',
      type: 'image'
    },

    // Celebrations
    {
      src: '/images/celebrations/IMG_8466.JPG',
      alt: 'Joëlle at brother\'s wedding',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Au Mariage de son Frère' : 'At Her Brother\'s Wedding',
      description: language === 'fr' ? 'Joëlle au mariage de son frère à Limbé' : 'Joëlle at her brother\'s wedding in Limbe',
      category: 'celebrations',
      type: 'image'
    },
    {
      src: '/images/celebrations/IMG-20170819-WA0006.jpg',
      alt: 'Special occasion',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Occasion Spéciale' : 'Special Occasion',
      description: language === 'fr' ? 'Une occasion spéciale' : 'A special occasion',
      category: 'celebrations',
      type: 'image'
    },
    {
      src: '/images/celebrations/46206a31-f3ee-4383-8193-9277c49777d1.jpg',
      alt: 'Joëlle at celebration',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle à une Célébration' : 'Joëlle at a Celebration',
      description: language === 'fr' ? 'Joëlle participant à un événement festif' : 'Joëlle attending a festive event',
      category: 'celebrations',
      type: 'image'
    },
    {
      src: '/images/celebrations/8edf4d3e-6ae9-4113-a51f-b62f365315d9.jpg',
      alt: 'Celebrating with friends',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Célébration avec des Amis' : 'Celebrating with Friends',
      description: language === 'fr' ? 'Joëlle célébrant avec ses amis' : 'Joëlle celebrating with her friends',
      category: 'celebrations',
      type: 'image'
    },
    {
      src: '/images/celebrations/dbfed8b0-ac74-450e-ab90-e22137645b71.jpg',
      alt: 'Festive moment',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Moment Festif' : 'Festive Moment',
      description: language === 'fr' ? 'Joëlle lors d\'un moment de fête' : 'Joëlle at a festive moment',
      category: 'celebrations',
      type: 'image'
    },
    {
      src: '/images/celebrations/dc9778cd-f63a-4534-8703-05dafdb1e440.jpg',
      alt: 'Joyful celebration',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Célébration Joyeuse' : 'Joyful Celebration',
      description: language === 'fr' ? 'Joëlle profitant d\'une célébration joyeuse' : 'Joëlle enjoying a joyful celebration',
      category: 'celebrations',
      type: 'image'
    },

    // Video
    {
      src: '/images/video/IMG_8594.MOV',
      alt: 'Joëlle cooking with her mother',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Joëlle Cuisinant avec Maman' : 'Joëlle Cooking with Her Mother',
      description: language === 'fr' ? 'Joëlle cuisinant avec sa mère' : 'Joëlle cooking with her mother',
      category: 'video',
      type: 'video',
      poster: '/images/family/IMG_8217.JPG' // Using a family photo as poster
    },
    {
      src: '/images/video/20171124_101248.mp4',
      alt: 'Joëlle with mother, grandmother, and sister Yolande singing for Kelilah',
      width: 800,
      height: 600,
      title: language === 'fr' ? 'Chant de Célébration pour Kelilah' : 'Celebration Song for Kelilah',
      description: language === 'fr' ? 'Joëlle avec sa mère, sa grand-mère et sa sœur Yolande chantant pour célébrer la naissance de Kelilah' : 'Joëlle with her mother, grandmother, and sister Yolande singing to celebrate Kelilah\'s birth',
      category: 'video',
      type: 'video',
      poster: '/images/family/20171124_101526.jpg' // Using the corresponding photo as poster
    },
  ];

  // Filter media by category
  const filteredMedia = selectedCategory === 'all'
    ? allMedia
    : allMedia.filter(item => item.category === selectedCategory);

  // Categories
  const categories = [
    { id: 'all', labelEn: 'All', labelFr: 'Tout', count: allMedia.length },
    { id: 'wedding', labelEn: 'Wedding', labelFr: 'Mariage', count: allMedia.filter(m => m.category === 'wedding').length },
    { id: 'family', labelEn: 'Family', labelFr: 'Famille', count: allMedia.filter(m => m.category === 'family').length },
    { id: 'childhood', labelEn: 'Childhood', labelFr: 'Enfance', count: allMedia.filter(m => m.category === 'childhood').length },
    { id: 'education', labelEn: 'Education', labelFr: 'Éducation', count: allMedia.filter(m => m.category === 'education').length },
    { id: 'professional', labelEn: 'Professional', labelFr: 'Professionnel', count: allMedia.filter(m => m.category === 'professional').length },
    { id: 'celebrations', labelEn: 'Celebrations', labelFr: 'Célébrations', count: allMedia.filter(m => m.category === 'celebrations').length },
    { id: 'video', labelEn: 'Video', labelFr: 'Vidéo', count: allMedia.filter(m => m.category === 'video').length },
  ];

  // Prepare slides for lightbox
  const slides = filteredMedia.map(item => {
    if (item.type === 'video') {
      // Determine video type based on file extension
      const videoType = item.src.endsWith('.mp4') ? 'video/mp4' : 'video/quicktime';
      return {
        type: 'video' as const,
        sources: [
          {
            src: item.src,
            type: videoType,
          },
        ],
        poster: item.poster,
      };
    }
    return {
      src: item.src,
      alt: item.alt,
    };
  });

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-white to-[#f5f3f0]"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto px-4">
        <h2 id="gallery-heading" className="text-4xl font-bold text-center mb-4 text-[#8b7355]">
          {t('gallery.title')}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('gallery.subtitle')}
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#8b7355] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {language === 'fr' ? category.labelFr : category.labelEn} ({category.count})
            </button>
          ))}
        </div>

        {/* Photo/Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {filteredMedia.map((item, index) => (
            <article
              key={index}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} in fullscreen`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              {/* Image/Video Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.poster || item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Video Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="bg-white/90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-12 h-12 text-[#8b7355]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 8}
                  />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <svg className="w-8 h-8 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Media metadata */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                  {item.type === 'video' && <span className="text-red-500">▶</span>}
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Lightbox with Video Support */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentImageIndex}
          plugins={[Video]}
          on={{
            view: ({ index }) => setCurrentImageIndex(index),
          }}
          carousel={{
            finite: filteredMedia.length <= 1,
          }}
          render={{
            slide: ({ slide }) => {
              const currentItem = filteredMedia[currentImageIndex];
              if (slide.type === 'video') {
                return null; // Let the plugin handle video rendering
              }

              // Get memory for current photo
              const filename = currentItem?.src.split('/').pop() || '';
              const memory = getMemoryForPhoto(filename);

              return (
                <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                  {currentItem && (
                    <div className="mt-4 text-center px-6 max-w-3xl">
                      <h3 className="text-2xl font-semibold text-white mb-2">{currentItem.title}</h3>
                      <p className="text-sm text-white/80 mb-3">{currentItem.description}</p>

                      {/* Memory Section */}
                      {memory && (
                        <div className="mt-4 text-left bg-black/30 rounded-lg p-4 backdrop-blur-sm">
                          <button
                            onClick={() => setExpandedMemory(!expandedMemory)}
                            className="flex items-center justify-between w-full text-white hover:text-[#c4a585] transition-colors"
                          >
                            <span className="flex items-center gap-2 font-medium">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                              </svg>
                              {language === 'fr' ? 'Lire l\'histoire' : 'Read the Story'}
                            </span>
                            <svg
                              className={`w-5 h-5 transition-transform ${expandedMemory ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {expandedMemory && (
                            <div className="mt-3 pt-3 border-t border-white/20 animate-fade-in">
                              <p className="text-white/90 text-sm leading-relaxed mb-3">
                                {memory.story}
                              </p>
                              {(memory.year || memory.location) && (
                                <div className="flex flex-wrap gap-3 text-xs text-white/70">
                                  {memory.year && (
                                    <span className="flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      {memory.year}
                                    </span>
                                  )}
                                  {memory.location && (
                                    <span className="flex items-center gap-1">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      {memory.location}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            },
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          }}
          video={{
            autoPlay: true,
            controls: true,
          }}
        />
      </div>
    </section>
  );
}
