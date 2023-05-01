import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Icon24Document, Icon28ErrorCircleOutline, Icon28CheckCircleOutline, Icon56MoneyTransferOutline, Icon56SettingsOutline } from '@vkontakte/icons';
import { ModalPageHeader, usePlatform, Snackbar,CellButton, PlatformProvider, ModalCard, Alert, View, Root, ModalRoot, ModalPage, Div, ScreenSpinner, PanelHeaderBack, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, PopoutWrapper, ModalDismissButton, Panel, Group, PanelHeader, File, Button, FormLayout, FormLayoutGroup, FormItem, FormField, Image, Select } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import AddApp from './panels/AddApp';
import Home from './panels/Home';
import InfoApp from './panels/InfoApp.js';
import { string } from 'prop-types';
import './panels/modal.css';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	//Переменная vk_group_id
	//const [group_id, setGroupId] = useState(0);
	
	const platform = usePlatform();
	const [activeModal, setActiveModal] = React.useState(false);
	const [ModalPanel, setModalPanel] = useState('panel1');
	const [activeView, setActiveView] = useState('main');
	const [IconListModalUpdate, setIconListModalUpdate] = useState([]);


	//переменная group_id из окна регистрации
	const [groupId, setGroupId] = useState(null);

	//Переменная подписка (Subscription)
	const [subscription, setSubscription] = useState([]);

	//Переменные модального окна (иконки)
	const [inputFile, setInputFile] = useState('');
	//иконка кнопки загрузить изображение
	const [icon_fileInputAdd, setIcon_fileInputAdd] = useState('');
	const [IconList, setIconList] = useState([]);
	//Переменная id выбранной иконки
	const [SelectedIcon, SetSelectedIcon] = useState([{id: 'club185516973', url: ''}]);
	//Переменная id выбранной иконки в модальном окне редактирование сервера
	const [SelectedModalUpdateIcon, SetSelectedModalUpdateIcon] = useState([{id: 'club185516973', url: ''}]);
	
	const [isDisabled, setDisabled] = useState(true);

	const [file, setFile] = useState();

	const styleApp = {
		
	}

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

	//Функция проверки есть ли токен в бд
	const CheckTokenToBd = () => {
		let group_id = GetGroupId();
		fetch('https://widgetpanel.site/Pril/React/CheckTokenValidation.php?group_id=' + group_id)
		.then(resp => resp.text())
		.then(data => {
			if(data != 'Response'){
				GetGroupToken();
			}else{
				console.log("YesResponseToken");
			}
		});

		//GetGroupToken();
	}

	const GetSubscription = () => {
		let group_id = GetGroupId();
		setPopout(<ScreenSpinner size='large' />);
		fetch('https://widgetpanel.site/Pril/React/subscription/GetSubscription.php?group_id=' + group_id)
		.then(resp => resp.json())
		.then(data => {
			setSubscription(data);
		});
	}

	//Окно с ошибкой!
	const [snackbar, setSnackbar] = React.useState(null);
	const openNoneSubscription = () => {
		if (snackbar) return;
			setSnackbar(
				<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
				>
				У вас закончилась подписка
				</Snackbar>
			);
	};

	const openError = () => {
		if (snackbar) return;
			setSnackbar(
				<Snackbar
				onClose={() => setSnackbar(null)}
				before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
				>
				Проверьте введенные данные
				</Snackbar>
			);
	};

	const openSuccess = (text) => {
		if (snackbar) return;
		setSnackbar(
		  <Snackbar
			onClose={() => setSnackbar(null)}
			before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
		  >
			{text}
		  </Snackbar>,
		);
	};

	const openDeletion = (id) => {
		setPopout(
		  <Alert
			actions={[
			  {
				title: 'Отмена',
				autoClose: true,
				mode: 'cancel',
			  },
			  {
				title: 'Удалить',
				autoClose: true,
				mode: 'destructive',
				action: () => DeleteServer(id),
			  },
			]}
			actionsLayout="horizontal"
			onClose={() => setPopout(null)}
			header="Удаление сервера"
			text="Вы уверены, что хотите удалить этот сервер?"
		  />,
		);
	  };


	const GetGroupToken = () => {
		const startParams = new URLSearchParams(window.location.search)
		let vk_group_id = startParams.get("vk_group_id");

		let groupIdVk = groupId != null ? parseInt(groupId) : parseInt(vk_group_id);

		bridge.send("VKWebAppGetCommunityToken", {
			app_id: 51582926,
			group_id: groupIdVk,
			scope: 'app_widget'
			})
		   .then((data) => { 
			 if (data.access_token) {
				fetch('https://widgetpanel.site/Pril/React/RegistrationToken.php?token=' + data.access_token + '&group_id=' + groupIdVk)
                .then(resp => resp.text())
                .then(data => {
                    console.log("Токен получен и занесен в бд");
					setActiveModal(null);
                });
			 }
		   })
		   .catch((error) => {
			 // Ошибка
			 console.log(error);
		});
	}

	const buildListToken = (data) => {
		console.log(data, null, '/t');
		setToken(data);
	}

	//Функция получения vk_group_id
	const GetGroupId = () => {
		const startParams = new URLSearchParams(window.location.search)
		const vk_group_id = startParams.get("vk_group_id");
		//setGroupId(vk_group_id);
		return vk_group_id;
	}

	const handleFileChange = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
			setDisabled(false);
		}
	};
	const [listServ, SetListServ] = useState([]);

	const buildList = (data) => {
		//console.log(data, null, '/t');
		SetListServ(data);
		setPopout(null);
	}

	const[iconListJson, SeticonListJson] = useState([]);
	const IconListJson = (data) => {
		setIconList(data);
		setIconListModalUpdate(data);
		//SeticonListJson(data);
	}

	const UpdateWidgetGroup = () => {
		const startParams = new URLSearchParams(window.location.search)
        const vk_group_id = startParams.get("vk_group_id");
		const response = fetch("https://widgetpanel.site/Pril/React/UpdateWidgetGroup.php?group_id=" + vk_group_id)
        .then(res => res.json());
		console.log(response);
	}
	
	const ListServer = () => {
		const startParams = new URLSearchParams(window.location.search)
        const vk_group_id = startParams.get("vk_group_id");
		setPopout(<ScreenSpinner size='large' />);
        fetch("https://widgetpanel.site/Pril/React/SelectListServer.php?group_id=" + vk_group_id)
        .then(res => res.json())
		.then(buildList);
	}
	
	const AjaxDownloadIcon = async () => {
		let group_id = GetGroupId();
		fetch(
			"https://widgetpanel.site/Pril/React/DownloadIcon.php?group_id=" + group_id
		).then((response) => response.json())
		.then(IconListJson);
	};

	const AjaxUploadIcon = async () => {
		var form_data = new FormData();
		form_data.append('file', file);
		if(form_data.get('file') == 'undefined' || file == null) {return console.log("Выберите изображения");}
		console.log(form_data.get('file'));

		let group_id = GetGroupId();
		setPopout(<ScreenSpinner size='large' />);
		fetch('https://widgetpanel.site/Pril/React/UploadIcon.php?group_id=' + group_id, {
			method: 'POST',
			body: form_data
		 }).then(
			response => {
				setFile(null);
				console.log(response);
				AjaxDownloadIcon();
				setPopout(null);
			}
		 ).then(
			text => {
			   
			}
		 );
	};

	

	useEffect(() => {
		console.log(SelectedModalUpdateIcon);
		CheckTokenToBd();
		GetSubscription();
		const startParams = new URLSearchParams(window.location.search)
        const vk_group_id = startParams.get("vk_group_id");
		if(vk_group_id == null) {
			setActivePanel('addAdd');
		}else{
			setPopout(null);
			ListServer();
			AjaxDownloadIcon();
		}
			setPopout(null);
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const CloseModalUpdate = () => {
		setModalPanel('panel1');
		setActiveModal(null);
	}


	const useInput = (initialValue) => {
		const [value, setValue] = useState(initialValue);
	
		const handleChange = (event) => {
			setValue(event.target.value);
		};
	
		return {
			value,
			onChange: handleChange
		};
	};

	const handleChange = (event) => {
		//console.log(event.target.value);

		let copy = Object.assign([], UpdateServerPerem);
		let index = event.target.name;
		copy[index] = event.target.value;
		SetUpdateServerPerem(copy);
	}

 	const clickfile = () => {
		//alert('Получено: ' + inputFile);
		AjaxUploadIcon();
	}

	const clickIcon = (id_icon, images) => {
		//console.log("id выбранной иконки: " + id_icon);
		SetSelectedIcon([{id: id_icon, url: images}]);
		setActiveModal(null);
	}

	const clickIconUpdateModal = (id_icon, images) => {
		console.log(id_icon + " " + images);
		SetSelectedModalUpdateIcon([{id: id_icon, url: images}]);
		setModalPanel('panel1');
	}

	const SaveUpdateServer = () => {
		if(UpdateServerPerem.NameServer_1 == '' ||
			UpdateServerPerem.IpPort == '' ||
			UpdateServerPerem.Id_icon == ''){
				return openError();
		}

		const data = {
			idServerUpdate: UpdateServerPerem.id,
            nameServer: UpdateServerPerem.NameServer_1, 
            ipServer: UpdateServerPerem.IpPort, 
            idGame: UpdateServerPerem.GameId, 
            idIcon: SelectedModalUpdateIcon[0].id
        } 

		const search = new URLSearchParams();
		for(let key in data) {
			search.append(key, data[key]);
		}
		
		setPopout(<ScreenSpinner size='large' />);
		fetch('https://widgetpanel.site/Pril/React/SaveUpdateServer.php?' + search)
		.then(resp => resp.text())
		.then(data => {
		setPopout(null);
		if(data == 'Response'){
			setActiveModal(null);
			ListServer();
			UpdateWidgetGroup();
			openSuccess("Сервер обновлен успешно");
		}
		else{
			openError();
		}
		})
	}


	//Переменные для редактирования сервера в модальном окне.\
	const [UpdateServerPerem, SetUpdateServerPerem] = useState([]);

	const clickUpadateServer = (data) => {
		if(subscription[0] <= 0) { return openNoneSubscription();}

		setPopout(<ScreenSpinner size='large' />);

		let IpPort = data.Ip + ':' + data.Port;

		const peremUpdate = {
			id: data.id,
			NameServer_1: data.NameServer_1,
			Ip: data.Ip,
			Port: data.Port,
			IpPort: IpPort,
			GameId: data.GameId,
			Id_icon: data.id_icon,
			Url_icon: null
		};
		
		
		for(let i = 0; i < IconList.length; i++){
			if(IconList[i].id_icon == data.id_icon){
				peremUpdate.Url_icon = IconList[i].images;
				break;
			}
		}
		

		SetUpdateServerPerem(peremUpdate);
		SetSelectedModalUpdateIcon([{id: peremUpdate.Id_icon, url: peremUpdate.Url_icon}]);
		console.log("Update: " + peremUpdate.id);
		setActiveModal('modalUpdateServer');
		setPopout(null);
	}

	const clickDeleteServer = (id) => {
		if(subscription[0] <= 0) { return openNoneSubscription();}
		openDeletion(id);
	}

	const DeleteServer = (id) => {
		setPopout(<ScreenSpinner size='large' />);
		fetch('https://widgetpanel.site/Pril/React/DeleteServer.php?id_delete=' + id)
		.then(resp => resp.text())
		.then(data => {
		setPopout(null);
		if(data == 'Response'){
			ListServer();
			UpdateWidgetGroup();
			openSuccess("Сервер удален успешно");
		}
		else{
			openError();
		}
		})
	}

	const modal = (
		<ModalRoot activeModal={activeModal}>
			
			<ModalCard
                id='cardModal'
                onClose={() => setActiveModal(null)}
                icon={<Icon56SettingsOutline color='white'/>}
                header="Почти готово... осталось получить токен сообщества!"
                subheader="Для установки виджета нам нужен токен от вашего сообщества."
                actions={
				
                <Button size="l"
				mode="primary"
				stretched onClick={GetGroupToken}>Хорошо, запросите токен</Button>
                }
            ></ModalCard>

		  <ModalPage id="modalAddIcon" onClose={() => setActiveModal(null)}>
			<Panel>
				<Group>
					<ModalPageHeader>Иконки</ModalPageHeader>
					<FormLayout>
						<FormLayoutGroup mode="horizontal">
							<FormItem className='modal_input_1'>
								<File name='file' id='file' before={file == null ? <Icon24Document role="presentation"/> : <Image src={URL.createObjectURL(file)} size={24}/>} onChange={handleFileChange} mode='secondary'/>
							</FormItem>
							<FormItem className='modal_input_2'>
								<Button onClick={clickfile} disabled={isDisabled}>Загрузить</Button>
							</FormItem>
						</FormLayoutGroup>
					</FormLayout>

					<Group>
						<Div className='container_icon'>
						{IconList != null ? IconList.map((iconList, index) => (
							<Div key={index} className='modal_icon'>
								<Image src={iconList.images} size={24} borderRadius='0' onClick={() => clickIcon(iconList.id_icon, iconList.images)}/>
							</Div>
						)) : ''}	
						</Div>
					</Group>
				</Group>
			</Panel>
		  </ModalPage>

		  
		  <ModalPage id="modalUpdateServer" onClose={CloseModalUpdate}>
		  
		  	<Root activeView={activeView}>
      			<View id="main" activePanel={ModalPanel}>
					<Panel id="panel1">
						<Group>
							<ModalPageHeader>Редактирование</ModalPageHeader>
								<FormLayout>
									<Group>
										<FormItem>
											<FormField >
												<input name="NameServer_1" type="text" style={style} placeholder="Введите названия сервера" value={UpdateServerPerem.NameServer_1} onChange={handleChange} autoComplete='off'/>
											</FormField>
										</FormItem>
										<FormItem>
											<FormField >
												<input name="IpPort" type="text" style={style} placeholder="Введите IP:Port сервера" value={UpdateServerPerem.IpPort} onChange={handleChange} autoComplete='off'/>
											</FormField>
										</FormItem>
										<FormItem>
											<FormField >
												<Select name='GameId'
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
													}
												]} value={UpdateServerPerem.GameId} onChange={handleChange}/>
											</FormField>
										</FormItem>
										<FormLayoutGroup mode="horizontal">
											<FormItem className='modal_input_1'>
												<Button name='InputUpdateIcon' onClick={() => setModalPanel('panel2')} before={<Image src={SelectedModalUpdateIcon[0].url} size={24}/>}>Выбрать иконку</Button>
											</FormItem>
											<FormItem className='modal_input_2'>
												<Button onClick={SaveUpdateServer}>Сохранить</Button>
											</FormItem>
										</FormLayoutGroup>
									</Group>
								</FormLayout>
						</Group>
					</Panel>
					<Panel id="panel2">
						<Group>
							<ModalPageHeader
								before={
								<PanelHeaderBack
									onClick={() => setModalPanel('panel1')}
									label='Назад'
								/>
								}>
								Редактирование-иконки
								</ModalPageHeader>
				
								<FormLayoutGroup mode="horizontal">
									<FormItem className='modal_input_1'>
										<File name='file' id='file' before={file == null ? <Icon24Document role="presentation"/> : <Image src={URL.createObjectURL(file)} size={24}/>} onChange={handleFileChange} mode='secondary'/>
									</FormItem>
									<FormItem className='modal_input_2'>
										<Button onClick={clickfile} disabled={isDisabled}>Загрузить</Button>
									</FormItem>
								</FormLayoutGroup>
						

							<Group>
								<Div className='container_icon'>
								{IconListModalUpdate != null ? IconListModalUpdate.map((iconListModalUppdate, index) => (
									<Div key={index} className='modal_icon'>
										<Image src={iconListModalUppdate.images} size={24} borderRadius='0' onClick={() => clickIconUpdateModal(iconListModalUppdate.id_icon, iconListModalUppdate.images)}/>
									</Div>
								)) : ''}	
								</Div>
							</Group>
						</Group>
					</Panel>
				</View>
			</Root>
			
		  </ModalPage>
		  
		</ModalRoot>
	  );

	  

	return (
	
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout modal={modal} popout={popout}>
						<SplitCol>
							<View activePanel={activePanel} >
								<AddApp id="addAdd" go={go} setActiveModal={setActiveModal} setGroupId={setGroupId}/>
								<Home id='home' platform={platform} setPopout={setPopout} setActivePanel={setActivePanel} setActiveModal={setActiveModal} subscription={subscription} clickUpadateServer={clickUpadateServer} clickDeleteServer={clickDeleteServer} go={go} openSuccess={openSuccess} openError={openError} UpdateWidgetGroup={UpdateWidgetGroup} SelectedIcon={SelectedIcon} GetGroupId={GetGroupId} ListServer={ListServer} listServ={listServ} IconList={IconList} AjaxDownloadIcon={AjaxDownloadIcon}/>
								<InfoApp id='infoApp' setActivePanel={setActivePanel} go={go}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
			{snackbar}
		</ConfigProvider>
	);
}
export default App;
