'use client';

import { Tab, Tabs, type TabsProps } from '@heroui/tabs';
import { DEFAULT_TAB, TABS, URL_PARAMS } from '@lib/constants/core';
import { useSearchParamsChange } from '@lib/hooks';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Fragment, type FunctionComponent, type PropsWithChildren, useCallback } from 'react';

type TabKey = (typeof TABS)[number]['key'];

interface EventRoomsPlanSectionProps extends PropsWithChildren {
    selectedTab?: TabKey;
}

export const EventRoomsPlanSection: FunctionComponent<EventRoomsPlanSectionProps> = ({
    selectedTab,
    children,
}) => {
    const t = useTranslations('EventRoomsPlanSection');
    const { changeSearchParamMulti } = useSearchParamsChange();

    const handleSelectionChange = useCallback<NonNullable<TabsProps['onSelectionChange']>>(
        (value) => {
            changeSearchParamMulti([URL_PARAMS.plan])([value.toString()]);
        },
        [changeSearchParamMulti],
    );

    return (
        <Fragment>
            <div>
                <Tabs
                    size="lg"
                    radius="md"
                    destroyInactiveTabPanel={false}
                    classNames={{
                        tabList: 'max-w-full',
                        base: 'w-full max-w-full',
                    }}
                    aria-label={t('companiesLocationMap')}
                    items={Array.from(TABS)}
                    defaultSelectedKey={DEFAULT_TAB.key}
                    selectedKey={selectedTab}
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
                                    alt={t('planImageAlt', { planLabel: t(item.label) })}
                                    width={5928}
                                    height={1448}
                                    quality={100}
                                />
                            </div>
                        </Tab>
                    )}
                </Tabs>
            </div>
            {children || <p className="text-center">{t('noCompanyAtThisLocation')}</p>}
        </Fragment>
    );
};
