import { View, ModalRoot, ModalPage, Panel, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Group, Cell } from '@vkontakte/vkui';
import { useModalRootContext } from '@vkontakte/vkui';

export const SelectModal = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { updateModalHeight } = useModalRootContext();

  const fetchItems = () => {
    fetch('')
      .then((r) => r.json())
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      });
  };

  React.useEffect(fetchItems, []);

  // После установки стейта и перерисовки компонента SelectModal сообщим ModalRoot об изменениях
  React.useEffect(updateModalHeight, [items.length]);

  return (
    <div className="SelectModal">
      {isLoading && <Spinner />}
      {!isLoading && (
        <Group>
          {items.map((item) => (
            <Cell key={item.id}>{item.title}</Cell>
          ))}
        </Group>
      )}
    </div>
  );
};