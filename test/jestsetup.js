// Сделаем функции Enzyme доступными во всех файлах
// тестов без необходимости импорта importing
import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Обрушим тест при любой ошибке
console.error = message => {
	throw new Error(message);
};
