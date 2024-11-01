import React from 'react';
import { useSelector } from 'react-redux';

const HeaderMenu = () => {
    const homePagedata = useSelector((state) => state.homePage);
    const headerMenu = useSelector((state) => state.headerMenu);
    console.log({ headerMenu })
    const renderMenuItems = (items) => {
        return items.map((item) => (
            <li key={item.id} className={`${item.children ? 'dropdown nav-item dropdown' : 'nav-item'}`}>
                <a
                    href={`/${item.url}`}
                    className={`${item.children ? 'nav-link  dropdown-toggle' : 'nav-link'}`}
                    data-bs-toggle={item.children ? 'dropdown' : undefined}
                    aria-expanded="false"
                >
                    {item.text}
                </a>
                {item.children && (
                    <ul className="dropdown-menu">
                        {renderMenuItems(item.children)}
                    </ul>
                )}
            </li>
        ));
    };
    return (
        <>
            {/* <!-- Header Starts --> */}

            {/* <!-- About Company Ends  --> */}
        </>
    )
}

export default HeaderMenu