// @ts-nocheck
import React from "react";
import {
  View,
  Panel,
  PanelHeader,
  Group,
  SplitLayout,
  SplitCol,
  ConfigProvider,
  AppRoot,
  Root,
  PopoutWrapper,
  AdaptivityProvider,
  // eslint-disable-next-line
  useScrollLock
} from "@vkontakte/vkui";
// eslint-disable-next-line
import "@vkontakte/vkui/dist/vkui.css";

// Ссылка на issue https://github.com/VKCOM/VKUI/issues/4314
const IssueReproduction = () => {
  const [popout, setPopout] = React.useState<ReactNode | null>(null);

  // Ниже можно расскоментировать временный фикс проблемы
  //
  // const popoutWrapperShown = popout !== null;
  // useFixPopoutWrapperContentScroll(popoutWrapperShown);
  // useScrollLock(popoutWrapperShown); // т.к. используем PopoutWrapper напрямую

  const onClick = () => {
    setPopout(
      <PopoutWrapper
        alignY="bottom"
        style={{
          height: 200,
          background: "lightgreen"
        }}
      >
        <Panel>
          <PanelHeader fixed={false}>
            Список в PopoutWrapper который не скроллится в мобильной версии
            <br />
            <br />К тому же вешает глобально на window и теперь не скроллится и
            верхний список
          </PanelHeader>
          <Group
            style={{
              height: 200,
              overflowY: "auto"
            }}
          >
            {new Array(100).fill("1").map((_, i) => (
              <div key={i}>Элемент списка PopoutWrapper</div>
            ))}
          </Group>
        </Panel>
      </PopoutWrapper>
    );
  };

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <Root activeView="view">
          <View id="view" activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <button onClick={onClick}>Показать PopoutWrapper</button>
              <br />
              <br />
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  background: "lightblue"
                }}
              >
                Обычный список вне PopoutWrapper, который скроллится на мобилке
                <br />
                <br />
                {new Array(100).fill("1").map((item, i) => (
                  <div key={i}>Элемент списка</div>
                ))}
              </div>
              <br />
              <br />
            </Panel>
          </View>
        </Root>
      </SplitCol>
    </SplitLayout>
  );
};