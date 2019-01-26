import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	})

	it('should render two <NavigationItem /> elements', () =>{
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should render three <NavigationItem /> elements', () =>{
		wrapper.setProps({categories:{
			categoriesList:[{
				id: 5,
				name: "boxes"
			}]
		}});
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should render five <NavigationItem /> elements', () =>{
		wrapper.setProps({categories:{
			categoriesList:[{
				id: 5,
				name: "boxes"
			},
			{
				id: 15,
				name: "clothes"
			},
			{
				id: 1,
				name: "hats"
			}]
		}});
		expect(wrapper.find(NavigationItem)).toHaveLength(5);
	});
});