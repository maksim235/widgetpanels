import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ModalRoot, ModalPage, Div, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, PopoutWrapper, ModalDismissButton, Panel, Group, PanelHeader } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

//const onClick = () => setPopout(<CustomPopout onClose={() => setPopout(null)} />);

const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id="modalAddIcon" onClose={() => this.props.setActiveModal(null)}>
        <Panel>
            <Group>
                <PanelHeader>Загрузка иконки</PanelHeader>
            </Group>
            <Group>
                
            </Group>
        </Panel>
      </ModalPage>
    </ModalRoot>
  );

export default modal;