import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@lib/constants';
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const supportedLanguages = Object.values(SUPPORTED_LANGUAGES);

// Get the user's preferred language
const getLanguage = (request: NextRequest) => {
    const negotiator = new Negotiator({
        headers: Object.fromEntries(request.headers.entries()),
    });
    
    const detectedLanguages = negotiator.languages();
    
    // Match the user's preferred language with the supported ones
    return match(detectedLanguages, supportedLanguages, DEFAULT_LANGUAGE);
}

export function middleware(request: NextRequest) {
    // Check if there is any supported language in the pathname
    const { pathname } = request.nextUrl;
    
    const pathnameHasLocale = supportedLanguages.some(
        (language) => pathname.startsWith(`/${language}/`) || pathname === `/${language}`
    );
    
    if (pathnameHasLocale) {
        // If the pathname already has a supported language, do nothing
        return NextResponse.next();
    }
    
    // Redirect to a new path if there is no language
    // e.g. incoming request is /products will be redirected to /en/products
    const language = getLanguage(request);
    
    request.nextUrl.pathname = `/${language}${pathname}`;
    
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) when applying the middleware
        '/((?!_next).*)',
    ],
};
