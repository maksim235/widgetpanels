import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

import { Icon24Document, Icon28ErrorCircleOutline, Icon28CheckCircleOutline, Icon56UsersOutline, Icon12Poll, Icon56MoneyTransferOutline } from '@vkontakte/icons';
import { AdaptivityProvider,
    PanelHeaderBack,
	ConfigProvider,
	AppRoot,
	SplitLayout,
	SplitCol,
	View,
	Panel,
    ModalCard,
    ModalRoot,
	PanelHeader,
    Placeholder,
    Button,
    Image,
	Header,
	Group,
	Card,
	CardGrid,
    ContentCard,
	SimpleCell,
	Forms, FormItem, FormField } from '@vkontakte/vkui';

const InfoApp = props => {
	return (
        <Panel>
            <PanelHeader before={<PanelHeaderBack onClick={() => props.setActivePanel('home')} />}>
                FAQ
            </PanelHeader>
            <CardGrid size="l">
                <ContentCard
                    subtitle="ИНФОРМАЦИЯ ПРО ИГРЫ"
                    header="Что делать, если в списке нет нужной мне игры?"
                    caption="Если в предложенном списке нет необходимой Вам игры - напишите в лс нашей группы, и мы обязательно её добавим!"
                />
                <ContentCard
                    subtitle="ИНФОРМАЦИЯ ПРО ВИДЖЕТ И ПОДПИСКУ"
                    header="Интервал обновления виджета и подписка"
                    caption="Виджет обновляется каждые 30 секунд. После регистрации даётся пробный период 1 день (24 часа). Стоимость подписки составляет 250 рублей (месяц). 
                    Чтобы оформить подписку, напишите в лс нашей группы."
                />
                <ContentCard
                    subtitle="ИНФОРМАЦИЯ О ПРИЛОЖЕНИЕ"
                    header="Приложение"
                    caption="Текущая версия приложения: 1.0.0. Разработчик: Лазуткин Максим"
                />
            </CardGrid>
        </Panel>
    );
}



InfoApp.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default InfoApp;