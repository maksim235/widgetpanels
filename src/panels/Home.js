import React, { useState } from 'react';
import { Reorder } from "framer-motion";
import PropTypes from 'prop-types';
import { Icon16WrenchOutline, Icon28ErrorCircleOutline, Icon12Poll, Icon28Notifications, Icon28SettingsOutline, Icon28HelpCircleOutline  } from '@vkontakte/icons';
import { ScreenSpinner, Text, Snackbar, ModalPage, PopoutWrapper, ModalDismissButton, ModalRoot,  ModalPageHeader, PanelHeaderButton,CellButton, Button, Placeholder, FormLayout, Select, FormLayoutGroup, Group, Panel, PanelHeader, CardGrid, Card, View, Header, ContentCard, Div, FormItem, FormField, Image, platform } from '@vkontakte/vkui';
import './Home.css';

const clickAddServer = () => {
  
}

class Home extends React.Component {
  
   constructor(){
    
    super();
    this.state = {
      test: true,
      list: [],
      token: [],
      console: null,
      InputAddNameServer: '',
      InputAddIpServer: '',
      InputAddGame: '',
      InputAddIcon: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

   }

   


   buildList = (data) => {
    //console.log(data, null, '/t');
    this.setState({list: data})
   }

  //  handleInputChange(event) {
  //     const target = event.target;
  //     const value = target.value;
  //     const name = target.name;
  //     this.setState({
  //       [name]: value
  //     });
  //  }
   
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

    }

    handleSubmit(event) {
        if(this.props.subscription[0] > 0) {
            let {setPopout, openSuccess, openError,UpdateWidgetGroup, SelectedIcon, GetGroupId, ListServer} = this.props;
            let Group_id = GetGroupId();
            
            var NameServer = this.state.InputAddNameServer;
            var IpServer = this.state.InputAddIpServer;
            var IdGame = this.state.InputAddGame;
            var IdIcon = SelectedIcon[0].id;
            //alert('Name: ' + this.state.InputAddNameServer + " Ip: " + this.state.InputAddIpServer + " Game: " + this.state.InputAddGame + " Icon: " + idIcon);
            const data = {
              group_id: Group_id, 
              nameServer: NameServer, 
              ipServer: IpServer, 
              idGame: IdGame, 
              idIcon: IdIcon
            } 

            const search = new URLSearchParams();
            for(let key in data) {
                search.append(key, data[key]);
            }
            
            setPopout(<ScreenSpinner size='large' />);
            fetch('https://widgetpanel.site/Pril/React/AddServer.php?' + search)
            .then(resp => resp.text())
            .then(data => {
              setPopout(null);
              if(data == 'Response'){
                ListServer();
                UpdateWidgetGroup();
                openSuccess("Сервер успешно добавлен");
              }
              else{
                openError();
                //alert(data);
              }
            })
            /*fetch('https://widgetpanel.site/Pril/React/AddServer.php?' + search)
            .then(
              response => {
                console.log(response);
                ListServer();
                UpdateWidgetGroup();
              }
            )
            .then(data => alert(data))
            .then(
              text => {
              }
            );*/

        }
        event.preventDefault();
      }
    

    render() {


      let {SelectedIcon, listServ} = this.props;
      let {file} = this.props;
      //Получаем переменные из app(данные из input для добавление нового сервера)
      //let {SetAddNameServer, SetAddIpServer} = this.props;
      
      //SetAddNameServer("test");
 
      const style = {
        position: 'relative',
        display: 'block',
        width: '100%',
        margin: 0,
        paddingRight: 12,
        paddingLeft: 12,
        fontSize: 'var(--vkui--font_subhead--font_size--compact)',
        lineHeight: '20px',
        textOverflow: 'ellipsis',
        color: '#000',
        border: 'none',
        background: 'transparent',
      };

      const InputNameServer = () => {
        return <input name="nameServer" type="text" style={style} placeholder="Введите названия сервера" value={this.state.InputAddNameServer} onChange={this.handleChange}/>;
      };
      const InputIPServer = () => {
        return <input name="IpServer" type="text" style={style} placeholder="Введите IP:Port сервера" />;
      };
      const InputIconServer = () => {
        return <input type="text" style={style} placeholder="Добавить изображение"/>;
      }

      let Platform = this.props.platform;

      return (
    
        <Panel platform="android">
    
          <PanelHeader
            before={
              <PanelHeaderButton onClick={() => this.props.setActivePanel('infoApp')}>
                <Icon28HelpCircleOutline fill="var(--vkui--color_background_accent_themed)"/>
              </PanelHeaderButton>
            }
          > WidgetGame (Подписка: {this.props.subscription[0] + ' ' + this.props.subscription[1]})</PanelHeader>
          
           {/* <PanelHeader>WidgetGame</PanelHeader>*/}
            <Group>
              <FormLayout>
                <FormLayoutGroup mode={Platform == 'vkcom' ? 'horizontal' : 'vertical'}>
                    <FormItem>
                        <FormField >
                          <input name="InputAddNameServer" type="text" style={style} placeholder="Введите названия сервера" value={this.state.InputAddNameServer} onChange={this.handleChange} autoComplete='off'/>
                        </FormField>
                      </FormItem>
                      <FormItem>
                        <FormField >
                          <input name="InputAddIpServer" type="text" style={style} placeholder="Введите IP:Port сервера" value={this.state.InputAddIpServer} onChange={this.handleChange} autoComplete='off'/>
                       
                        </FormField>
                      </FormItem>
                      <FormItem>
                        <FormField >
                        <Select name='InputAddGame'
                          placeholder="Выберите игру"
                          options={[
                            {
                              value: '1',
                              label: 'SAMP/CRMP',
                            },
                            {
                              value: '2',
                              label: 'MTA',
                            },
                            {
                              value: '3',
                              label: 'GTA5',
                            },
                          ]}
                          value={this.state.InputAddGame} onChange={this.handleChange}/>
                        </FormField>
                      </FormItem>
                  </FormLayoutGroup>
                  <FormLayoutGroup mode="horizontal">
                    <FormItem className='inputAddIcon'>
                      <Button name='InputAddIcon' onClick={() => this.props.setActiveModal('modalAddIcon')} before={SelectedIcon.length == 0 ? '' : <Image src={SelectedIcon[0].url} size={24}/>} disabled={this.props.subscription[0] > 0 ? false : true}>Выбрать иконку</Button>
                    </FormItem>
                    <FormItem className='inputAddServer'>
                      <Button onClick={this.handleSubmit} disabled={this.props.subscription[0] > 0 ? false : true}>Добавить сервер</Button>
                    </FormItem>
                  </FormLayoutGroup>
                </FormLayout>
            </Group>

            
         
                <CardGrid size='' className='container_server'>
                {listServ.length != 0 ? listServ.map((lists, index) => (
                
                    <Card key={index} mode="shadow"  className='section_server'>
                        <Div className='sectionServerTitle'>
                          <p className='serv_title'>Название</p>
                          <p className='serv_name'>{lists.NameServer_1}</p>
                        </Div>

                        <Div className="FormUpdate">
                          <a id="update>" name="updates" onClick={() => this.props.clickUpadateServer(lists)} className="editServer" href="#">Редактировать</a>
                          <a id="delete>" name="delete" onClick={() => this.props.clickDeleteServer(lists.id)} className="deleteServer" href="#">Удалить</a>
                        </Div>
                    </Card>
              
                  )) :
                  <Placeholder
                      icon={<Icon12Poll width={56} height={56} fill='black'/>}
                      header="У вас нет пока что серверов"
                  >
                      Добавьте сервер, чтобы ваше виджет заработал
                  </Placeholder>}
                </CardGrid>
          
          </Panel>
      );
  }
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;