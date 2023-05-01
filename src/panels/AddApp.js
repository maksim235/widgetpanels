import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import PropTypes from 'prop-types';

import { Icon24Document, Icon28ErrorCircleOutline, Icon28CheckCircleOutline, Icon56UsersOutline, Icon12Poll, Icon56MoneyTransferOutline } from '@vkontakte/icons';
import { AdaptivityProvider,
	ConfigProvider,
	AppRoot,
	SplitLayout,
	SplitCol,
	View,
	Panel,
    CardScroll,
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
	SimpleCell,
	Forms, FormItem, FormField, Div } from '@vkontakte/vkui';
import img1 from '../img/imj1.png';
import img2 from '../img/img2.png';
import img3 from '../img/imj3.png';
import img4 from '../img/img4.png';
const AddApp = props => {


    const clickAddToCommunity = () => {
        bridge.send('VKWebAppAddToCommunity')
        .then((data) => { 
            if(data.group_id) {
                props.setGroupId(data.group_id);
                const dataPerem = {
                    status_AppToGroup: 1,
                    status_getToken: 0, 
                    group_id: data.group_id
                } 
        
                const search = new URLSearchParams();
                for(let key in dataPerem) {
                    search.append(key, dataPerem[key]);
                }

                fetch('https://widgetpanel.site/Pril/React/RegisterGroupId.php?' + search)
                .then(resp => resp.text())
                .then(data => {
                    console.log("Группа добаленна в бд");
                    props.setActiveModal('cardModal');
                })
            }
        })
        .catch((error) => {
            // Ошибка
            console.log(error);
        });
    }

	return (
        <Panel>
            <Placeholder
                icon={<Icon12Poll width={56} height={56} fill='black'/>}
                header="Приложение «Widget Game»"
                action={<Button onClick={clickAddToCommunity} size="m">Установить в моём сообществе!</Button>}
            >
                Виджет в сообществе, будет показывать онлайн игровых серверов
            </Placeholder>
            <Group>
                <CardScroll size="false">
                    <Card>
                        <img src={img1} height={200}></img>
                    </Card>
                    <Card>
                        <img src={img2} height={200}></img>
                    </Card>
                    <Card>
                        <img src={img3} height={200}></img>
                    </Card>
                    <Card>
                        <img src={img4} height={200}></img>
                    </Card>
                </CardScroll>
            </Group>

            {/* <Div>
                <img src={img1} width={500}></img>
                <img src={img2} width={500}></img>
                <img src={img3} width={500}></img>
            </Div> */}
        </Panel>
    );
}



AddApp.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default AddApp;
