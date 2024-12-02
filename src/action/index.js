
export const HomePageData = (data) => {
    return {
        type: 'home_page',
        payload: data,
    };
};
export const InnerPageData = (data) => {
    return {
        type: 'inner_page',
        payload: data,
    };
};
export const headerMenu = (data) => {
    return {
        type: 'header_menu',
        payload: data,
    };
};
export const footerMenu = (data) => {
    return {
        type: 'footer_menu',
        payload: data,
    };
};


export const ChatDetails = (data) => {
    return {
        type: 'chat_details',
        payload: data,
    };
};

