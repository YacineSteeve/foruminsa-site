'use client';

import { Tab, Tabs, type TabsProps } from '@heroui/tabs';
import { Link } from '@lib/i18n/navigation';
import { CompanyService, type ForumRoomFilter, type ForumRoomList } from '@lib/services';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type FunctionComponent, useCallback, useMemo, useState } from 'react';

const TABS = [
    {
        key: 'plan-1',
        image: 'rooms_plan_1.svg',
        label: 'planOneLabel',
        filter: {
            floor: 1,
            buildingNumber: 20,
            roomIds: [5, 6, 7, 8],
        },
    },
    {
        key: 'plan-2',
        image: 'rooms_plan_2.svg',
        label: 'planTwoLabel',
        filter: {
            floor: 1,
            buildingNumber: 20,
            roomIds: [9, 10, 11, 12, 13, 14, 15, 16, 17],
        },
    },
    {
        key: 'plan-3',
        image: 'rooms_plan_3.svg',
        label: 'planThreeLabel',
        filter: {
            floor: 0,
            buildingNumber: 20,
        },
    },
    {
        key: 'plan-4',
        image: 'rooms_plan_4.svg',
        label: 'planFourLabel',
        filter: {
            floor: 3,
            buildingNumber: 11,
        },
    },
] as const satisfies ReadonlyArray<{
    key: string;
    image: string;
    label: string;
    filter: ForumRoomFilter;
}>;

const DEFAULT_TAB = TABS[0];

type TabKey = (typeof TABS)[number]['key'];

export const EventMapsSection: FunctionComponent = () => {
    const t = useTranslations('EventMapsSection');
    const [selectedKey, setSelectedKey] = useState<TabKey>(DEFAULT_TAB.key);

    const handleSelectionChange = useCallback<NonNullable<TabsProps['onSelectionChange']>>(
        (value) => {
            setSelectedKey(value as TabKey);
        },
        [],
    );

    const companiesByRoom = useMemo(() => {
        return CompanyService.getCompaniesGroupedByRoom(
            TABS.find((tab) => tab.key === selectedKey)?.filter ?? DEFAULT_TAB.filter,
        );
    }, [selectedKey]);

    return (
        <section className="w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-8 md:py-16 space-y-4 md:space-y-8">
            {Array.from({ length: 2 }).map((_, index) => (
                <Tabs
                    key={index}
                    size="lg"
                    radius="md"
                    isVertical={index === 0}
                    destroyInactiveTabPanel={false}
                    classNames={{
                        tabWrapper: index === 0 ? 'max-md:hidden' : 'md:hidden',
                        tabList: index === 0 ? '' : 'max-w-full',
                        base: index === 0 ? '' : 'w-full max-w-full',
                    }}
                    aria-label={t('companiesLocationMap')}
                    items={Array.from(TABS)}
                    defaultSelectedKey={DEFAULT_TAB.key}
                    selectedKey={selectedKey}
                    onSelectionChange={handleSelectionChange}
                >
                    {(item) => (
                        <Tab
                            key={item.key}
                            title={t(item.label)}
                        >
                            <div className="border-2 border-default">
                                <Image
                                    src={`/${item.image}`}
                                    alt=""
                                    width={1587}
                                    height={1123}
                                    className=""
                                />
                            </div>
                        </Tab>
                    )}
                </Tabs>
            ))}
            {companiesByRoom.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-8">
                    {companiesByRoom.map((group) => (
                        <RoomGroupItem
                            key={group.room.id}
                            group={group}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">{t('noCompanyAtThisLocation')}</p>
            )}
        </section>
    );
};

interface RoomGroupItemProps {
    group: ForumRoomList[number];
}

const RoomGroupItem: FunctionComponent<RoomGroupItemProps> = ({ group }) => {
    return (
        <div className="flex flex-wrap gap-4">
            <p className="text-2xl text-primary font-semibold">{group.room.name}</p>
            <ul className="list-disc list-inside space-y-1">
                {group.companies.map((company) => (
                    <li key={company.id}>
                        <Link
                            href={`/entreprises/${company.slug}`}
                            className="inline-block hover:font-semibold hover:underline underline-offset-2"
                        >
                            <p className="text-lg">{company.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
