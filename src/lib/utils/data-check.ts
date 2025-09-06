import {
    planningDataSchema,
    forumRoomsDataSchema,
    sectorsDataSchema,
    companiesDataSchema,
    type PlanningData,
    type ForumRoomsData,
    type SectorsData,
    type CompaniesData,
} from '@lib/types/data';
import { planningData } from '@data/planning';
import { forumRoomsData } from '@data/forum-rooms';
import { sectorsData } from '@data/sectors';
import { companiesData } from '@data/companies';
import { imageFilenameSchema } from '@lib/types/primitives';
import { z } from 'zod/v4';
import { createErrorMap, fromError } from 'zod-validation-error/v4';
import { get } from 'lodash-es';
import { lookup } from 'mime-types';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

type Name = 'planning' | 'sectors' | 'forum rooms' | 'companies';

type ErrorMessageList = Array<string>;

const COLORS = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
} as const;

const SYMBOLS = {
    check: '\u2714',
    cross: '\u274c',
    arrow: '\u27a4',
    warning: '\u26a0',
} as const;

const withColor = (str: string, color: keyof typeof COLORS) => `${COLORS[color]}${str}\x1b[0m`;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const sameLine = () => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
};

const checkSchemaCompliance = ({
    name,
    schema,
    data,
}: {
    name: Name;
    schema: z.ZodArray<z.ZodTypeAny>;
    data: Array<unknown>;
}) => {
    process.stdout.write(
        `${withColor(SYMBOLS.arrow, 'cyan')} Validating ${name} data against schema...`,
    );

    const dataItemSchema = schema.unwrap();
    const n = data.length;

    if (n === 0) {
        sameLine();
        process.stdout.write(
            `${withColor(SYMBOLS.warning, 'yellow')} Skipping ${name} data (empty)\n`,
        );
        return;
    }

    for (let i = 0; i < n; i++) {
        const item = data[i];

        try {
            dataItemSchema.parse(item);
        } catch (error) {
            const validationError = fromError(error, {
                prefix: undefined,
                issueSeparator: `\n${withColor(SYMBOLS.cross, 'red')} `,
            });

            console.error(
                `\n${withColor(`Invalid ${name} data in item n°${i + 1} of the list:`, 'red')}\n${withColor(SYMBOLS.cross, 'red')} ${validationError}\n`,
            );
            process.exit(1);
        }
    }

    sameLine();
    process.stdout.write(
        `${withColor(SYMBOLS.check, 'green')} ${capitalize(name)} data are conform (${n} items checked)\n`,
    );
};

const checkIntegrity = <D extends PlanningData | ForumRoomsData | SectorsData | CompaniesData>({
    name,
    data,
    processor,
}: {
    name: Name;
    data: D;
    processor: (data: D) => ErrorMessageList;
} & (
    | { name: 'planning'; processor: (data: PlanningData) => ErrorMessageList }
    | { name: 'sectors'; processor: (data: SectorsData) => ErrorMessageList }
    | { name: 'forum rooms'; processor: (data: ForumRoomsData) => ErrorMessageList }
    | { name: 'companies'; processor: (data: CompaniesData) => ErrorMessageList }
)) => {
    process.stdout.write(`${withColor(SYMBOLS.arrow, 'cyan')} Checking ${name} data integrity...`);

    const n = data.length;

    if (n === 0) {
        sameLine();
        process.stdout.write(
            `${withColor(SYMBOLS.warning, 'yellow')} Skipping ${name} data (empty)\n`,
        );
        return;
    }

    const errors = processor(data);

    if (errors.length > 0) {
        console.error(
            `${errors.map((error) => `\n${withColor(SYMBOLS.cross, 'red')} ${error}`).join('')}\n`,
        );
        process.exit(1);
    }

    sameLine();
    process.stdout.write(
        `${withColor(SYMBOLS.check, 'green')} ${capitalize(name)} data are valid (${n} items checked)\n`,
    );
};

const checkDuplicates = (name: string, data: Array<object>, fieldPath: string): Array<string> => {
    const groupedByField = Object.groupBy(
        data.map((item, index) => ({ ...item, index })),
        (item) => get(item, fieldPath, ''),
    );

    const errors: Array<string> = [];

    for (const [fieldValue, items] of Object.entries(groupedByField)) {
        if (!items) {
            continue;
        }

        if (items.length > 1) {
            errors.push(
                `Duplicates found in ${name}: items ${new Intl.ListFormat('en').format(items.map((item) => (item.index + 1).toString()))} have the same ${withColor(fieldPath, 'yellow')} value (${withColor(`"${fieldValue}"`, 'yellow')})`,
            );
        }
    }

    return errors;
};

const planningIntegrityProcessor = (data: PlanningData): ErrorMessageList => {
    const nameDuplicates = [
        ...checkDuplicates('planning groups', data, 'name.fr'),
        ...checkDuplicates('planning groups', data, 'name.en'),
    ];

    if (nameDuplicates.length > 0) {
        return nameDuplicates;
    }

    const companyIds = companiesData.map((item) => item.id);

    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (!item) {
            continue;
        }

        const titleDuplicates = [
            ...checkDuplicates(`entries of planning group n°${i + 1}`, item.entries, 'title.fr'),
            ...checkDuplicates(`entries of planning group n°${i + 1}`, item.entries, 'title.en'),
        ];

        if (titleDuplicates.length > 0) {
            return titleDuplicates;
        }

        const missingCompanyIdsErrors = item.entries
            .map((entry, index) => {
                if (entry.speaker && !companyIds.includes(entry.speaker.companyId)) {
                    return `Non existing id for entry n°${index + 1} of planning group n°${i + 1}: speaker's company with id ${entry.speaker.companyId} does not exist in the companies data`;
                }

                return false;
            })
            .filter((error) => error !== false);

        if (missingCompanyIdsErrors.length > 0) {
            return missingCompanyIdsErrors;
        }
    }

    return [];
};

const sectorsIntegrityProcessor = (data: SectorsData): ErrorMessageList => {
    const idDuplicates = checkDuplicates('sectors', data, 'id');

    if (idDuplicates.length > 0) {
        return idDuplicates;
    }

    const nameDuplicates = [
        ...checkDuplicates('sectors', data, 'name.fr'),
        ...checkDuplicates('sectors', data, 'name.en'),
    ];

    if (nameDuplicates.length > 0) {
        return nameDuplicates;
    }

    return [];
};

const forumRoomsIntegrityProcessor = (data: ForumRoomsData): ErrorMessageList => {
    const idDuplicates = checkDuplicates('forum rooms', data, 'id');

    if (idDuplicates.length > 0) {
        return idDuplicates;
    }

    return [];
};

const companiesIntegrityProcessor = (data: CompaniesData): ErrorMessageList => {
    const idDuplicates = checkDuplicates('companies', data, 'id');

    if (idDuplicates.length > 0) {
        return idDuplicates;
    }

    const nameDuplicates = checkDuplicates('companies', data, 'name');

    if (nameDuplicates.length > 0) {
        return nameDuplicates;
    }

    const sectorIds = sectorsData.map((item) => item.id);
    const forumRoomIds = forumRoomsData.map((item) => item.id);

    const directoryPath = path.join(process.cwd(), 'public/companies-logos');
    let logoFileNames = undefined;

    try {
        const directoryContent = readdirSync(directoryPath);

        logoFileNames = directoryContent.filter((fileName) => {
            const isFile = statSync(path.join(directoryPath, fileName)).isFile();
            const mimeType = lookup(fileName);
            return isFile && mimeType && mimeType.startsWith('image/');
        });
    } catch (error) {
        console.error(withColor(`Error reading directory: ${directoryPath}`, 'red'), error);
        return [];
    }

    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (!item) {
            continue;
        }

        const socialMediaDuplicates = checkDuplicates(
            `social links of company n°${i + 1}`,
            item.socialLinks,
            'type',
        );

        if (socialMediaDuplicates.length > 0) {
            return socialMediaDuplicates;
        }

        if (item.roomId && !forumRoomIds.includes(item.roomId)) {
            return [
                `Non existing id in company n°${i + 1}: forum room with id ${item.roomId} does not exist in the forum rooms data`,
            ];
        }

        if (item.sectorIds.length > 0) {
            const nonExistingSectorIds = item.sectorIds.filter((id) => !sectorIds.includes(id));

            if (nonExistingSectorIds.length > 0) {
                const idsText =
                    nonExistingSectorIds.length === 1
                        ? `sector with id ${nonExistingSectorIds[0]} does not exist`
                        : `sectors with ids ${new Intl.ListFormat('en').format(nonExistingSectorIds.map((id) => id.toString()))} do not exist`;

                return [`Non existing id in company n°${i + 1}: ${idsText} in the sectors data`];
            }
        }

        if (
            imageFilenameSchema.safeParse(item.logoFile).success &&
            logoFileNames &&
            !logoFileNames.includes(item.logoFile)
        ) {
            return [
                `Non existing logo in company n°${i + 1}: file ${withColor(`"${item.logoFile}"`, 'yellow')} does not exist in the ${withColor(`"./${path.relative(process.cwd(), directoryPath)}"`, 'yellow')} directory`,
            ];
        }
    }

    return [];
};

const main = () => {
    process.stdout.write(`\n${withColor('Start checking data compliance...', 'cyan')}\n`);

    z.config({
        customError: createErrorMap({
            displayInvalidFormatDetails: true,
        }),
    });

    process.stdout.write(`${withColor(SYMBOLS.check, 'green')} Schemas initialized\n`);

    for (const [name, schema, data] of [
        ['planning', planningDataSchema, planningData] as const,
        ['sectors', sectorsDataSchema, sectorsData] as const,
        ['forum rooms', forumRoomsDataSchema, forumRoomsData] as const,
        ['companies', companiesDataSchema, companiesData] as const,
    ]) {
        checkSchemaCompliance({ name, schema, data });
    }

    process.stdout.write(`${withColor('All data are conform.', 'green')}\n\n`);

    process.stdout.write(`${withColor('Start checking data integrity...', 'cyan')}\n`);

    checkIntegrity({
        name: 'planning',
        data: planningData,
        processor: planningIntegrityProcessor,
    });

    checkIntegrity({
        name: 'sectors',
        data: sectorsData,
        processor: sectorsIntegrityProcessor,
    });

    checkIntegrity({
        name: 'forum rooms',
        data: forumRoomsData,
        processor: forumRoomsIntegrityProcessor,
    });

    checkIntegrity({
        name: 'companies',
        data: companiesData,
        processor: companiesIntegrityProcessor,
    });

    process.stdout.write(`${withColor('All data contents are valid.', 'green')}\n\n`);
};

main();
