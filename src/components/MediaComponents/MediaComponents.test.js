import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MediaComponents from './MediaComponents';
import MediaComponent from './MediaComponent/MediaComponent';

configure({adapter: new Adapter()});

describe('<MediaComponents />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<MediaComponents urls={[{
				id: "id1",
				url: "https://testdirectory.com/1"
			}]}
		/>);
	})

	it('should render one <MediaComponent /> elements', () =>{
		expect(wrapper.find(MediaComponent)).toHaveLength(1);
	});
	
	it('should render two <MediaComponent /> elements', () =>{
		wrapper.setProps({
			urls:[{
				id: "id1",
				url: "https://testdirectory.com/1"
			},
			{
				id: "id2",
				url: "https://testdirectory.com/2"
			}
			]
		})
		expect(wrapper.find(MediaComponent)).toHaveLength(2);
	});

	it('should render four <MediaComponent /> elements', () =>{
		wrapper.setProps({
			urls:[{
				id: "id1",
				url: "https://testdirectory.com/1"
			},
			{
				id: "id2",
				url: "https://testdirectory.com/2"
			},
			{
				id: "id3",
				url: "https://testdirectory.com/3"
			},
			{
				id: "id4",
				url: "https://testdirectory.com/4"
			}
			]
		})
		expect(wrapper.find(MediaComponent)).toHaveLength(4);
	});
});