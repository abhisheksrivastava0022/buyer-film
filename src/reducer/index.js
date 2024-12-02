import { combineReducers } from 'redux';

const HomePageReducer = (state = null, action) => {
    switch (action.type) {
        case 'home_page':
            return action.payload;

        default:
            return state;
    }
};
const innerPageReducer = (state = null, action) => {
    switch (action.type) {
        case 'inner_page':
            return action.payload;

        default:
            return state;
    }
};
const headerMenu = (state = null, action) => {
    switch (action.type) {
        case 'header_menu':
            return action.payload;

        default:
            return state;
    }
};
const footerMenu = (state = null, action) => {
    switch (action.type) {
        case 'footer_menu':
            return action.payload;

        default:
            return state;
    }
};
const chatDetails = (state = null, action) => {
    switch (action.type) {
        case 'chat_details':
            return action.payload;

        default:
            return state;
    }
};


const rootReducer = combineReducers({
    homePage: HomePageReducer,
    innerPage: innerPageReducer,
    headerMenu,
    footerMenu,
    chatDetails
});

export default rootReducer;