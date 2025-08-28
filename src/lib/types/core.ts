import { MENU_ITEMS, CONTACT_SUBJECTS, SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';

export type MenuItem = (typeof MENU_ITEMS)[number];

export type Speciality = (typeof SPECIALITIES)[number];

export type StudyLevel = (typeof STUDY_LEVELS)[number];

export type CountryCode = (typeof COUNTRY_CODES)[number];

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];
