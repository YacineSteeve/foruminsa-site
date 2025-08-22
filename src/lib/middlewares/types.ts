import type { SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import type { COUNTRY_CODES } from '@lib/constants/countries';
import type { NextRequest, NextResponse } from 'next/server';

export type RequestHandlerContextBase =
    | {
          params: Promise<Record<string, string>>;
      }
    | never;

export type RequestHandler<C extends RequestHandlerContextBase = never> = (
    request: NextRequest,
    context: C,
) => NextResponse | Promise<NextResponse>;

export type Speciality = (typeof SPECIALITIES)[number];

export type StudyLevel = (typeof STUDY_LEVELS)[number];

export type CountryCode = (typeof COUNTRY_CODES)[number];
